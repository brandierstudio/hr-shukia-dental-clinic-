import { OPENING_HOURS, VerifiedReview } from '../data/clinicData';

export interface EnquiryFormInput {
  patientName: string;
  phone: string;
  preferredDate: string;
  preferredTimeSlot: string;
  serviceInterest: string;
  contactMethod: 'Phone Call' | 'SMS';
  message: string;
  honeypot?: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof EnquiryFormInput, string>>;
}

/**
 * Validates Pakistani mobile or landline phone numbers.
 * Accepts formats such as:
 * - 0333 3770353 / 0333-3770353 / 03333770353
 * - +92 333 3770353 / +923333770353 / 00923333770353
 * - 021 35218975 / 021-35218975
 */
export function validatePakistaniPhone(raw: string): boolean {
  if (!raw || typeof raw !== 'string') return false;
  const cleaned = raw.replace(/[\s\-().]/g, '');
  // Mobile: +923xxxxxxxxx, 00923xxxxxxxxx, 03xxxxxxxxx
  const mobileRegex = /^(?:(?:\+92|0092|92)3\d{9}|03\d{9})$/;
  // Karachi landline: +9221xxxxxxx(x), 021xxxxxxx(x)
  const landlineRegex = /^(?:(?:\+92|0092|92)21\d{7,8}|021\d{7,8})$/;
  return mobileRegex.test(cleaned) || landlineRegex.test(cleaned);
}

/**
 * Formats a valid Pakistani mobile number into clean readable format:
 * e.g. "+92 333 3770353" or "0333 3770353"
 */
export function formatPakistaniPhone(raw: string): string {
  const cleaned = raw.replace(/[\s\-().]/g, '');
  const matchMobile = cleaned.match(/^(?:\+92|0092|92)?0?(3\d{2})(\d{7})$/);
  if (matchMobile) {
    return `0${matchMobile[1]} ${matchMobile[2]}`;
  }
  return raw.trim();
}

/**
 * Validates the appointment enquiry form inputs without substituting silent fallbacks.
 */
export function validateEnquiryInput(input: EnquiryFormInput): ValidationResult {
  const errors: Partial<Record<keyof EnquiryFormInput, string>> = {};

  if (input.honeypot && input.honeypot.trim().length > 0) {
    errors.honeypot = 'Automated spam submission detected.';
  }

  const trimmedName = (input.patientName || '').trim();
  if (!trimmedName) {
    errors.patientName = 'Please enter the patient or caller name.';
  } else if (trimmedName.length < 2) {
    errors.patientName = 'Name must be at least 2 characters long.';
  }

  const trimmedPhone = (input.phone || '').trim();
  if (!trimmedPhone) {
    errors.phone = 'Please enter a valid Pakistani phone number (e.g. 0333 3770353).';
  } else if (!validatePakistaniPhone(trimmedPhone)) {
    errors.phone = 'Enter a valid Pakistani mobile or Karachi number (e.g. 0300 1234567 or +92 333 3770353).';
  }

  if (!input.preferredDate || !input.preferredDate.trim()) {
    errors.preferredDate = 'Please select a preferred visit date.';
  } else {
    const parsed = new Date(input.preferredDate + 'T00:00:00');
    if (Number.isNaN(parsed.getTime())) {
      errors.preferredDate = 'Please provide a valid calendar date.';
    } else if (parsed.getDay() === 0) {
      errors.preferredDate = 'The clinic is closed on Sundays. Please select Monday through Saturday.';
    }
  }

  if (!input.serviceInterest || !input.serviceInterest.trim()) {
    errors.serviceInterest = 'Please select the primary reason for your visit.';
  }

  if (input.message && input.message.length > 600) {
    errors.message = 'Please keep your note under 600 characters.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export interface ClinicOpenStatus {
  isOpenNow: boolean;
  karachiDayName: string;
  karachiTimeFormatted: string;
  statusLabel: string;
  subNote: string;
}

/**
 * Computes the clinic's live status in Karachi time (PKT, UTC+5).
 */
export function getClinicOpenStatus(now: Date = new Date()): ClinicOpenStatus {
  // Convert to Karachi UTC+5
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
  const pktDate = new Date(utcMs + 5 * 3600000);

  const dayIndex = pktDate.getDay();
  const hours = pktDate.getHours();
  const minutes = pktDate.getMinutes();
  const decimalHour = hours + minutes / 60;

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const karachiDayName = dayNames[dayIndex];

  const hour12 = hours % 12 === 0 ? 12 : hours % 12;
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const minStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const karachiTimeFormatted = `${hour12}:${minStr} ${ampm} PKT`;

  const entry = OPENING_HOURS.find((h) => h.dayIndex === dayIndex);

  if (!entry || entry.openHour24 === null || entry.closeHour24 === null) {
    return {
      isOpenNow: false,
      karachiDayName,
      karachiTimeFormatted,
      statusLabel: 'Closed Today (Sunday)',
      subNote: 'Reopens Monday · Afternoon & evening clinic hours (Call 0333 3770353 to confirm)',
    };
  }

  const isWithinWindow = decimalHour >= entry.openHour24 && decimalHour < entry.closeHour24;

  if (dayIndex === 4) {
    // Thursday special note due to door notice vs Google Business Profile discrepancy
    return {
      isOpenNow: false,
      karachiDayName,
      karachiTimeFormatted,
      statusLabel: 'Confirm Thursday Hours by Phone',
      subNote: 'Google lists 3–7 PM; clinic door plaque notes Thursday closed. Call 0333 3770353 before visiting.',
    };
  }

  if (isWithinWindow) {
    return {
      isOpenNow: true,
      karachiDayName,
      karachiTimeFormatted,
      statusLabel: `Open Now in Karachi (${entry.googleHours})`,
      subNote: 'Patients with appointments are prioritized · Call 0333 3770353 before visiting',
    };
  }

  return {
    isOpenNow: false,
    karachiDayName,
    karachiTimeFormatted,
    statusLabel: `Currently Outside Clinic Hours (${karachiDayName}: ${entry.googleHours})`,
    subNote: 'Call 0333 3770353 or submit an enquiry below for afternoon/evening visits',
  };
}

/**
 * Filters verified Google reviews by theme, minimum rating, and search query.
 */
export function filterReviews(
  reviews: VerifiedReview[],
  theme: string = 'All',
  ratingFilter: 'all' | '5' | 'critical' = 'all',
  searchQuery: string = ''
): VerifiedReview[] {
  return reviews.filter((rev) => {
    if (theme !== 'All' && !rev.themes.includes(theme as VerifiedReview['themes'][number])) {
      return false;
    }
    if (ratingFilter === '5' && rev.rating !== 5) {
      return false;
    }
    if (ratingFilter === 'critical' && rev.rating >= 4) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchName = rev.reviewerName.toLowerCase().includes(q);
      const matchText = rev.text.toLowerCase().includes(q);
      return matchName || matchText;
    }
    return true;
  });
}

/**
 * Generates a deterministic, human-readable enquiry reference code.
 */
export function generateEnquiryReference(timestampMs: number, phone: string): string {
  const digits = phone.replace(/\D/g, '').slice(-4) || '0000';
  const shortTime = Math.abs(Math.floor(timestampMs / 1000) % 100000)
    .toString()
    .padStart(5, '0');
  return `HRS-${shortTime}-${digits}`;
}
