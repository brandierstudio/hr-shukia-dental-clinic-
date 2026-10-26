import React, { useEffect, useState } from 'react';
import {
  Calendar,
  CheckCircle2,
  Clock,
  Copy,
  AlertCircle,
  Phone,
  Send,
} from 'lucide-react';
import { CLINIC_INFO, SERVICES_DATA } from '../data/clinicData';
import {
  EnquiryFormInput,
  validateEnquiryInput,
} from '../utils/clinicLogic';

export interface SubmittedEnquiryRecord {
  id: string;
  referenceCode: string;
  patientName: string;
  phone: string;
  formattedPhone: string;
  preferredDate: string;
  preferredTimeSlot: string;
  serviceInterest: string;
  contactMethod: 'Phone Call' | 'SMS';
  message: string;
  createdAt: string;
  status: string;
}

interface AppointmentEnquiryFormProps {
  defaultService?: string;
  compact?: boolean;
}

export const AppointmentEnquiryForm: React.FC<AppointmentEnquiryFormProps> = ({
  defaultService = 'Orthodontics & Fixed Braces',
  compact = false,
}) => {
  const [formData, setFormData] = useState<EnquiryFormInput>({
    patientName: '',
    phone: '',
    preferredDate: '',
    preferredTimeSlot: '3:00 PM – 4:30 PM',
    serviceInterest: defaultService,
    contactMethod: 'Phone Call',
    message: '',
    honeypot: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof EnquiryFormInput, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [latestEnquiry, setLatestEnquiry] = useState<SubmittedEnquiryRecord | null>(null);
  const [recentEnquiries, setRecentEnquiries] = useState<SubmittedEnquiryRecord[]>([]);
  const [copiedRef, setCopiedRef] = useState(false);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, serviceInterest: defaultService }));
  }, [defaultService]);

  useEffect(() => {
    let active = true;
    fetch('/api/enquiries')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (active && data && Array.isArray(data.enquiries)) {
          setRecentEnquiries(data.enquiries);
        }
      })
      .catch(() => {
        // Ignore initial fetch failure silently
      });
    return () => {
      active = false;
    };
  }, []);

  const handleChange = (
    field: keyof EnquiryFormInput,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
    if (submitError) {
      setSubmitError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    const validation = validateEnquiryInput(formData);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const payload = await response.json();
      if (!response.ok || !payload.ok) {
        if (payload.errors) {
          setErrors(payload.errors);
        }
        setSubmitError(
          payload.message || 'Could not record your enquiry. Please check your inputs.'
        );
        setSubmitting(false);
        return;
      }

      setLatestEnquiry(payload.enquiry);
      if (Array.isArray(payload.enquiries)) {
        setRecentEnquiries(payload.enquiries);
      } else {
        setRecentEnquiries((prev) => [payload.enquiry, ...prev]);
      }

      setFormData({
        patientName: '',
        phone: '',
        preferredDate: '',
        preferredTimeSlot: '3:00 PM – 4:30 PM',
        serviceInterest: defaultService,
        contactMethod: 'Phone Call',
        message: '',
        honeypot: '',
      });
      setErrors({});
    } catch {
      setSubmitError(
        'Network error while recording your enquiry. Please call the clinic directly at +92 333 3770353.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleCopyReference = (refCode: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(refCode).catch(() => {});
    }
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  return (
    <div className="liquid-glass-panel rounded-3xl p-6 md:p-9">
      <div className="border-b border-teal-900/10 pb-5 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#0D9488] font-bold">
          <span>Appointment Enquiry Request</span>
          <span aria-hidden="true">·</span>
          <span className="font-mono-tabular text-[#0F293A]">
            Direct Desk: {CLINIC_INFO.phoneNational}
          </span>
        </div>
        <h3 className="text-xl md:text-2xl font-extrabold text-[#0F293A] mt-1.5">
          Request an Appointment or Orthodontic Assessment
        </h3>
        <p className="text-sm text-[#335268] mt-1.5 leading-relaxed">
          Complete this enquiry form to log your preferred visit window, or call{' '}
          <a
            href={CLINIC_INFO.phoneTelHref}
            className="text-[#0D9488] font-bold hover:underline"
          >
            {CLINIC_INFO.phoneInternational}
          </a>{' '}
          directly.
        </p>
      </div>

      {latestEnquiry && (
        <div
          role="status"
          aria-live="polite"
          data-testid="enquiry-confirmation-banner"
          className="mb-6 rounded-lg border border-[#167D83]/30 bg-[#EAF5F4] p-5 text-[#172B3A]"
        >
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#167D83] shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h4 className="font-bold text-sm text-[#16324F]">
                  Appointment Enquiry Logged — Reference{' '}
                  <span className="font-mono-tabular text-[#167D83]">
                    {latestEnquiry.referenceCode}
                  </span>
                </h4>
                <button
                  type="button"
                  onClick={() => handleCopyReference(latestEnquiry.referenceCode)}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-[#16324F] hover:text-[#167D83] transition-colors whitespace-nowrap shrink-0"
                >
                  <Copy className="w-3.5 h-3.5" />
                  {copiedRef ? 'Copied Reference' : 'Copy Reference'}
                </button>
              </div>
              <p className="text-xs text-[#172B3A] mt-1.5 leading-relaxed">
                Recorded for <strong>{latestEnquiry.patientName}</strong> (
                <span className="font-mono-tabular">{latestEnquiry.formattedPhone}</span>) regarding{' '}
                <strong>{latestEnquiry.serviceInterest}</strong> on{' '}
                <span className="font-mono-tabular">{latestEnquiry.preferredDate}</span> (
                {latestEnquiry.preferredTimeSlot}).
              </p>
              <p className="text-xs text-[#667582] mt-2 leading-relaxed">
                <strong>Important Next Step:</strong> Because HR Sukhia Dental Clinic confirms daily chair slots by telephone during afternoon clinic hours, please call{' '}
                <a
                  href={CLINIC_INFO.phoneTelHref}
                  className="font-semibold text-[#16324F] underline"
                >
                  0333 3770353
                </a>{' '}
                and mention reference <strong>{latestEnquiry.referenceCode}</strong> to finalize your exact arrival time.
              </p>
            </div>
          </div>
        </div>
      )}

      {submitError && (
        <div
          role="alert"
          className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-xs text-red-900 flex items-start gap-2.5"
        >
          <AlertCircle className="w-4 h-4 text-red-700 shrink-0 mt-0.5" />
          <span>{submitError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* Honeypot field for spam protection */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="clinic-website-hp">Leave this field blank</label>
          <input
            id="clinic-website-hp"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={formData.honeypot || ''}
            onChange={(e) => handleChange('honeypot', e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label
              htmlFor="enquiry-patient-name"
              className="block text-xs font-semibold text-[#172B3A] mb-1.5"
            >
              Patient or Contact Full Name <span className="text-red-600">*</span>
            </label>
            <input
              id="enquiry-patient-name"
              name="patientName"
              type="text"
              required
              placeholder="e.g. Syed Shahiq Ibrahim"
              value={formData.patientName}
              onChange={(e) => handleChange('patientName', e.target.value)}
              aria-invalid={Boolean(errors.patientName)}
              aria-describedby={errors.patientName ? 'err-patient-name' : undefined}
              className={`w-full rounded-lg border px-3.5 py-2.5 text-sm text-[#172B3A] bg-[#F8FAFC] focus:bg-white focus:outline-none focus:ring-2 transition-colors ${
                errors.patientName
                  ? 'border-red-500 focus:ring-red-200'
                  : 'border-[#E4EAF0] focus:border-[#167D83] focus:ring-[#167D83]/20'
              }`}
            />
            {errors.patientName && (
              <p id="err-patient-name" className="mt-1.5 text-xs text-red-700 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.patientName}</span>
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="enquiry-phone"
              className="block text-xs font-semibold text-[#172B3A] mb-1.5"
            >
              Pakistani Mobile or Telephone Number <span className="text-red-600">*</span>
            </label>
            <input
              id="enquiry-phone"
              name="phone"
              type="tel"
              required
              placeholder="e.g. 0333 3770353 or +92 300 1234567"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? 'err-phone' : undefined}
              className={`w-full rounded-lg border px-3.5 py-2.5 text-sm font-mono-tabular text-[#172B3A] bg-[#F8FAFC] focus:bg-white focus:outline-none focus:ring-2 transition-colors ${
                errors.phone
                  ? 'border-red-500 focus:ring-red-200'
                  : 'border-[#E4EAF0] focus:border-[#167D83] focus:ring-[#167D83]/20'
              }`}
            />
            {errors.phone && (
              <p id="err-phone" className="mt-1.5 text-xs text-red-700 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.phone}</span>
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label
              htmlFor="enquiry-date"
              className="block text-xs font-semibold text-[#172B3A] mb-1.5"
            >
              Preferred Visit Date (Mon–Sat) <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <input
                id="enquiry-date"
                name="preferredDate"
                type="date"
                required
                value={formData.preferredDate}
                onChange={(e) => handleChange('preferredDate', e.target.value)}
                aria-invalid={Boolean(errors.preferredDate)}
                aria-describedby={errors.preferredDate ? 'err-date' : undefined}
                className={`w-full rounded-lg border px-3.5 py-2.5 text-sm font-mono-tabular text-[#172B3A] bg-[#F8FAFC] focus:bg-white focus:outline-none focus:ring-2 transition-colors ${
                  errors.preferredDate
                    ? 'border-red-500 focus:ring-red-200'
                    : 'border-[#E4EAF0] focus:border-[#167D83] focus:ring-[#167D83]/20'
                }`}
              />
            </div>
            {errors.preferredDate && (
              <p id="err-date" className="mt-1.5 text-xs text-red-700 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.preferredDate}</span>
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="enquiry-time-slot"
              className="block text-xs font-semibold text-[#172B3A] mb-1.5"
            >
              Preferred Afternoon / Evening Window
            </label>
            <select
              id="enquiry-time-slot"
              name="preferredTimeSlot"
              value={formData.preferredTimeSlot}
              onChange={(e) => handleChange('preferredTimeSlot', e.target.value)}
              className="w-full rounded-lg border border-[#E4EAF0] px-3.5 py-2.5 text-sm text-[#172B3A] bg-[#F8FAFC] focus:bg-white focus:border-[#167D83] focus:outline-none focus:ring-2 focus:ring-[#167D83]/20 transition-colors"
            >
              <option value="2:00 PM – 3:00 PM (Saturday / Early Slot)">
                2:00 PM – 3:00 PM (Saturday / Early Slot)
              </option>
              <option value="3:00 PM – 4:30 PM">3:00 PM – 4:30 PM (Early Afternoon)</option>
              <option value="4:30 PM – 6:00 PM">4:30 PM – 6:00 PM (Mid Session)</option>
              <option value="6:00 PM – 7:00 PM">6:00 PM – 7:00 PM (Evening Session)</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="enquiry-service"
              className="block text-xs font-semibold text-[#172B3A] mb-1.5"
            >
              Primary Dental Service <span className="text-red-600">*</span>
            </label>
            <select
              id="enquiry-service"
              name="serviceInterest"
              value={formData.serviceInterest}
              onChange={(e) => handleChange('serviceInterest', e.target.value)}
              className="w-full rounded-lg border border-[#E4EAF0] px-3.5 py-2.5 text-sm text-[#172B3A] bg-[#F8FAFC] focus:bg-white focus:border-[#167D83] focus:outline-none focus:ring-2 focus:ring-[#167D83]/20 transition-colors"
            >
              {SERVICES_DATA.map((s) => (
                <option key={s.slug} value={s.title}>
                  {s.title}
                </option>
              ))}
              <option value="Pre-Braces Scaling & Orthodontic Consultation">
                Pre-Braces Scaling &amp; Orthodontic Consultation
              </option>
            </select>
            {errors.serviceInterest && (
              <p className="mt-1.5 text-xs text-red-700 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.serviceInterest}</span>
              </p>
            )}
          </div>
        </div>

        {!compact && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <span className="block text-xs font-semibold text-[#172B3A] mb-1.5">
                Preferred Contact Method
              </span>
              <div className="flex items-center gap-2 p-1 bg-white/80 rounded-full border border-white">
                {(['Phone Call', 'SMS'] as const).map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => handleChange('contactMethod', method)}
                    className={`flex-1 py-1.5 px-3 text-xs font-bold rounded-full transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      formData.contactMethod === method
                        ? 'btn-animated-primary text-white'
                        : 'text-[#47657A] hover:text-[#0F293A]'
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="enquiry-message"
                className="block text-xs font-semibold text-[#172B3A] mb-1.5"
              >
                Brief Note on Dental Concern (Optional)
              </label>
              <input
                id="enquiry-message"
                name="message"
                type="text"
                maxLength={600}
                placeholder="e.g. Enquiring about fixed braces for crowded teeth"
                value={formData.message}
                onChange={(e) => handleChange('message', e.target.value)}
                className="w-full rounded-lg border border-[#E4EAF0] px-3.5 py-2.5 text-sm text-[#172B3A] bg-[#F8FAFC] focus:bg-white focus:border-[#0D9488] focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 transition-colors"
              />
            </div>
          </div>
        )}

        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-teal-900/10">
          <p className="text-xs text-[#47657A] leading-relaxed max-w-xl">
            <strong className="text-[#0F293A]">Note:</strong> Submitting this form logs an appointment enquiry; please call to finalize your exact arrival slot.
          </p>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={CLINIC_INFO.phoneTelHref}
              className="btn-liquid-secondary inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[#0F293A] text-xs font-bold whitespace-nowrap shrink-0"
            >
              <Phone className="w-4 h-4 text-[#0D9488]" />
              Call {CLINIC_INFO.phoneNational}
            </a>

            <button
              type="submit"
              disabled={submitting}
              className="btn-animated-primary inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-white text-xs font-bold disabled:opacity-60 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              {submitting ? 'Logging Enquiry...' : 'Submit Appointment Enquiry'}
            </button>
          </div>
        </div>
      </form>

      {recentEnquiries.length > 0 && (
        <div
          className="mt-6 pt-5 border-t border-[#E4EAF0]"
          data-testid="recent-enquiries-log"
        >
          <div className="flex items-center justify-between gap-2 mb-3">
            <h4 className="text-xs font-semibold text-[#16324F]">
              Logged Appointment Enquiries ({recentEnquiries.length})
            </h4>
            <span className="text-xs text-[#667582]">
              Quote your reference code when calling {CLINIC_INFO.phoneNational}
            </span>
          </div>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {recentEnquiries.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="flex flex-wrap items-center justify-between gap-2 px-3.5 py-2.5 rounded-lg bg-[#F8FAFC] border border-[#E4EAF0] text-xs"
              >
                <div className="flex flex-wrap items-center gap-2 text-[#172B3A]">
                  <span className="font-mono-tabular font-semibold text-[#167D83]">
                    {item.referenceCode}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="font-medium">{item.patientName}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#667582]">{item.serviceInterest}</span>
                </div>
                <div className="flex items-center gap-3 text-[#667582] font-mono-tabular">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#16324F]" />
                    {item.preferredDate}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#167D83]" />
                    {item.preferredTimeSlot}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
