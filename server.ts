import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import {
  validateEnquiryInput,
  formatPakistaniPhone,
  generateEnquiryReference,
  EnquiryFormInput,
} from './src/utils/clinicLogic';
import { CLINIC_INFO } from './src/data/clinicData';

dotenv.config();

export interface StoredEnquiry extends EnquiryFormInput {
  id: string;
  referenceCode: string;
  formattedPhone: string;
  createdAt: string;
  status: 'Logged — Pending Clinic Phone Confirmation';
}

const DATA_DIR = path.resolve(process.cwd(), '.data');
const ENQUIRIES_FILE = path.join(DATA_DIR, 'enquiries.json');

function loadEnquiries(): StoredEnquiry[] {
  try {
    if (!fs.existsSync(ENQUIRIES_FILE)) {
      return [];
    }
    const raw = fs.readFileSync(ENQUIRIES_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveEnquiries(list: StoredEnquiry[]): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify(list, null, 2), 'utf-8');
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '100kb' }));

  // GET /api/enquiries — Returns stored appointment enquiries
  app.get('/api/enquiries', (_req, res) => {
    const items = loadEnquiries();
    res.json({
      enquiries: items,
      count: items.length,
      deliveryNote:
        'Appointment enquiries are logged on this server and prepared for direct telephone confirmation with HR Sukhia Dental Clinic (+92 333 3770353).',
    });
  });

  // POST /api/enquiries — Validates and stores a new appointment enquiry
  app.post('/api/enquiries', (req, res) => {
    const body = req.body as EnquiryFormInput;
    const validation = validateEnquiryInput(body);

    if (!validation.valid) {
      res.status(400).json({
        ok: false,
        errors: validation.errors,
        message: 'Please correct the highlighted form fields before submitting.',
      });
      return;
    }

    const nowMs = Date.now();
    const referenceCode = generateEnquiryReference(nowMs, body.phone);
    const formattedPhone = formatPakistaniPhone(body.phone);

    const newEnquiry: StoredEnquiry = {
      id: `enq-${nowMs}`,
      referenceCode,
      patientName: body.patientName.trim(),
      phone: body.phone.trim(),
      formattedPhone,
      preferredDate: body.preferredDate.trim(),
      preferredTimeSlot: (body.preferredTimeSlot || '3:00 PM – 5:00 PM').trim(),
      serviceInterest: body.serviceInterest.trim(),
      contactMethod: body.contactMethod === 'SMS' ? 'SMS' : 'Phone Call',
      message: (body.message || '').trim(),
      createdAt: new Date(nowMs).toISOString(),
      status: 'Logged — Pending Clinic Phone Confirmation',
    };

    const existing = loadEnquiries();
    const updated = [newEnquiry, ...existing].slice(0, 50);
    saveEnquiries(updated);

    res.status(201).json({
      ok: true,
      enquiry: newEnquiry,
      enquiries: updated,
      clinicPhone: CLINIC_INFO.phoneInternational,
      disclosure:
        'Your appointment enquiry has been recorded with reference ' +
        referenceCode +
        '. Because HR Sukhia Dental Clinic confirms daily chair availability by telephone, please also call 0333 3770353 during clinic hours (2:00 PM – 7:00 PM) and quote your reference code.',
    });
  });

  // GET /api/clinic-place — Server-side proxy for Google Places API (New) to avoid CORS (CF1)
  app.get('/api/clinic-place', async (_req, res) => {
    const apiKey = process.env.VITE_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      res.json({
        liveSynced: false,
        placeId: CLINIC_INFO.placeId,
        rating: CLINIC_INFO.googleRating.score,
        userRatingCount: CLINIC_INFO.googleRating.count,
      });
      return;
    }

    try {
      const response = await fetch(
        `https://places.googleapis.com/v1/places/${CLINIC_INFO.placeId}`,
        {
          headers: {
            'X-Goog-Api-Key': apiKey,
            'X-Goog-FieldMask':
              'id,displayName,formattedAddress,nationalPhoneNumber,internationalPhoneNumber,location,rating,userRatingCount,regularOpeningHours,googleMapsUri,websiteUri',
          },
        }
      );

      if (response.status === 429) {
        res.status(429).json({
          error: { status: 'RESOURCE_EXHAUSTED', message: 'Quota exceeded' },
        });
        return;
      }

      if (!response.ok) {
        res.json({
          liveSynced: false,
          placeId: CLINIC_INFO.placeId,
          rating: CLINIC_INFO.googleRating.score,
          userRatingCount: CLINIC_INFO.googleRating.count,
        });
        return;
      }

      const data = (await response.json()) as {
        id?: string;
        rating?: number;
        userRatingCount?: number;
        regularOpeningHours?: { openNow?: boolean; weekdayDescriptions?: string[] };
      };

      res.json({
        liveSynced: true,
        placeId: data.id || CLINIC_INFO.placeId,
        rating: data.rating ?? CLINIC_INFO.googleRating.score,
        userRatingCount: data.userRatingCount ?? CLINIC_INFO.googleRating.count,
        openNow: data.regularOpeningHours?.openNow,
        weekdayDescriptions: data.regularOpeningHours?.weekdayDescriptions,
      });
    } catch {
      res.json({
        liveSynced: false,
        placeId: CLINIC_INFO.placeId,
        rating: CLINIC_INFO.googleRating.score,
        userRatingCount: CLINIC_INFO.googleRating.count,
      });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`HR Sukhia Dental Clinic server running on http://localhost:${PORT}`);
  });
}

startServer();
