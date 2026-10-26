import React from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  Clock,
  ExternalLink,
  GraduationCap,
  MapPin,
  Navigation,
  Phone,
  ShieldCheck,
  Star,
} from 'lucide-react';
import {
  CLINIC_INFO,
  DENTIST_PROFILE,
  OPENING_HOURS,
  ORTHODONTIC_DIAGNOSTIC_CHART,
  PATIENT_CHOICE_THEMES,
  SERVICES_DATA,
  ServiceItem,
  TRANSPARENCY_DOCUMENTATION,
} from '../data/clinicData';
import { ResilientClinicImage, GalleryLightbox } from './GalleryLightbox';
import { AppointmentEnquiryForm } from './AppointmentEnquiryForm';
import { ReviewsSection } from './ReviewsSection';
import { ClinicMap } from './ClinicMap';
import { FAQAccordion } from './FAQAccordion';

export type PageRoute =
  | { page: 'home' }
  | { page: 'about' }
  | { page: 'services' }
  | { page: 'service'; slug: string }
  | { page: 'reviews' }
  | { page: 'gallery' }
  | { page: 'contact' }
  | { page: 'faq' }
  | { page: 'privacy' };

interface NavigationProps {
  onNavigate: (route: PageRoute) => void;
}

export const AboutDentistPage: React.FC<NavigationProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-16">
      {/* Hero Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        <div className="lg:col-span-7 flex flex-col justify-between bg-white rounded-xl border border-[#E4EAF0] p-7 md:p-10">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#167D83] font-semibold">
              <span>Verified Academic &amp; Clinical Profile</span>
              <span aria-hidden="true">·</span>
              <span>Saddar, Karachi</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#16324F] mt-3">
              {DENTIST_PROFILE.fullName}
            </h1>
            <p className="text-sm font-medium text-[#667582] mt-1">
              {DENTIST_PROFILE.fullExpandedName} — {DENTIST_PROFILE.primaryTitle}
            </p>
            <p className="text-xs font-mono-tabular text-[#167D83] mt-2">
              {DENTIST_PROFILE.qualificationsString}
            </p>
            <p className="text-base text-[#172B3A] mt-5 leading-relaxed">
              {DENTIST_PROFILE.shortBio}
            </p>

            <div className="mt-6 pt-6 border-t border-[#E4EAF0] grid grid-cols-1 sm:grid-cols-2 gap-4">
              {DENTIST_PROFILE.credentialsList.map((cred) => (
                <div key={cred.code} className="p-3.5 rounded-lg bg-[#F8FAFC] border border-[#E4EAF0]">
                  <p className="text-xs font-mono-tabular font-bold text-[#16324F]">
                    {cred.code}
                  </p>
                  <p className="text-xs text-[#172B3A] mt-1 leading-snug">
                    {cred.institution}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[#E4EAF0] flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate({ page: 'contact' })}
              className="px-5 py-2.5 rounded-lg bg-[#16324F] text-white text-xs font-semibold hover:bg-[#167D83] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Book Consultation with Dr. Sukhia
            </button>
            <a
              href={CLINIC_INFO.phoneTelHref}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#E4EAF0] bg-white text-[#16324F] text-xs font-semibold hover:border-[#167D83] transition-colors whitespace-nowrap shrink-0"
            >
              <Phone className="w-4 h-4 text-[#167D83]" />
              Call {CLINIC_INFO.phoneNational}
            </a>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col justify-between bg-white rounded-xl border border-[#E4EAF0] overflow-hidden">
          <div className="h-72 lg:h-80 w-full relative overflow-hidden">
            <ResilientClinicImage
              src="/assets/clinic/treatment-operatory-wide.jpg"
              alt="Clinical operatory of Prof. Dr. H.R. Sukhia showing framed Royal College diplomas and dental units"
              loading="eager"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6 bg-[#F8FAFC] border-t border-[#E4EAF0] flex-1 flex flex-col justify-between">
            <div>
              <p className="text-xs font-semibold text-[#167D83]">
                Authentic Clinic Operatory &amp; Royal College Diplomas
              </p>
              <h2 className="text-base font-bold text-[#16324F] mt-1">
                Dr. H.R. Sukhia Dental Surgery &amp; Orthodontics
              </h2>
              <p className="text-xs text-[#667582] mt-2 leading-relaxed">
                Pictured above is the actual clinical operatory at 101 Abdullah Haroon Road, Saddar, displaying framed Royal College fellowship diplomas on the left wall alongside the dual orthodontic treatment chairs.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#E4EAF0] text-xs text-[#667582]">
              <span>Portrait Integrity Note: We never substitute stock model photos or AI portraits for Prof. Dr. H.R. Sukhia.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Academic & Institutional Appointments */}
      <section className="bg-white rounded-xl border border-[#E4EAF0] p-7 md:p-10">
        <div className="max-w-2xl mb-8">
          <p className="text-xs font-semibold text-[#167D83]">
            Verified Institutional &amp; Academic Record
          </p>
          <h2 className="text-2xl font-bold text-[#16324F] mt-1.5">
            Academic Leadership, Fellowships &amp; Publications
          </h2>
          <p className="text-sm text-[#667582] mt-2 leading-relaxed">
            Every qualification and appointment listed below has been cross-verified against official institutional directories in Karachi, including Sir Syed College of Medical Sciences (SSCMS) and Pakistan dental academic records.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DENTIST_PROFILE.academicAndLeadershipRoles.map((item) => (
            <div
              key={item.role}
              className="p-5 rounded-xl bg-[#F8FAFC] border border-[#E4EAF0] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 text-xs text-[#167D83] font-medium">
                  <GraduationCap className="w-4 h-4 shrink-0" />
                  <span>{item.source}</span>
                </div>
                <h3 className="text-base font-bold text-[#16324F] mt-2">
                  {item.role}
                </h3>
                <p className="text-xs text-[#172B3A] mt-2 leading-relaxed">
                  {item.organization}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-5 rounded-xl bg-[#EAF5F4] border border-[#167D83]/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-[#16324F] flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#167D83]" />
              Academic Orthodontics Lineage in Karachi
            </h3>
            <p className="text-xs text-[#172B3A] leading-relaxed max-w-3xl">
              {DENTIST_PROFILE.associatedSpecialistNote}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate({ page: 'service', slug: 'orthodontics-fixed-braces' })}
            className="px-4 py-2 rounded-lg bg-[#16324F] text-white text-xs font-semibold hover:bg-[#167D83] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Explore Orthodontics &amp; Braces
          </button>
        </div>
      </section>

      {/* Treatment Philosophy */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {DENTIST_PROFILE.philosophyPoints.map((pt, i) => (
          <div
            key={pt.title}
            className="bg-white rounded-xl border border-[#E4EAF0] p-6"
          >
            <span className="text-xs font-mono-tabular font-semibold text-[#167D83]">
              0{i + 1}. Clinical Principle
            </span>
            <h3 className="text-lg font-bold text-[#16324F] mt-2">
              {pt.title}
            </h3>
            <p className="text-sm text-[#667582] mt-2 leading-relaxed">
              {pt.description}
            </p>
          </div>
        ))}
      </section>

      <AppointmentEnquiryForm defaultService="Orthodontics & Fixed Braces" />
    </div>
  );
};

export const ServicesOverviewPage: React.FC<NavigationProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-16">
      <div className="max-w-3xl">
        <div className="flex items-center gap-2 text-xs text-[#167D83] font-semibold">
          <span>Verified Clinical Scope</span>
          <span aria-hidden="true">·</span>
          <span>Dr. H.R. Sukhia Dental Surgery &amp; Orthodontics</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-[#16324F] mt-2">
          Orthodontic &amp; Dental Services in Saddar, Karachi
        </h1>
        <p className="text-base text-[#667582] mt-3 leading-relaxed">
          Centered around specialist fixed orthodontic braces and retention, HR Sukhia Dental Clinic also provides diagnostic dental consultations, pre-braces scaling and polishing, restorative dentistry, and endodontic care. Select any service below for detailed clinical information.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICES_DATA.map((service) => (
          <article
            key={service.slug}
            className="bg-white rounded-xl border border-[#E4EAF0] overflow-hidden flex flex-col justify-between hover:border-[#167D83]/60 transition-colors"
          >
            <div>
              <div className="h-52 w-full overflow-hidden bg-[#16324F]/5">
                <ResilientClinicImage
                  src={service.image}
                  alt={service.imageAlt}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-xs text-[#667582]">
                  <span className="font-mono-tabular font-semibold text-[#167D83]">
                    {service.number}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{service.category}</span>
                </div>
                <h2 className="text-lg font-bold text-[#16324F] mt-2">
                  {service.title}
                </h2>
                <p className="text-sm text-[#667582] mt-2 leading-relaxed">
                  {service.summary}
                </p>
              </div>
            </div>

            <div className="px-6 py-4 bg-[#F8FAFC] border-t border-[#E4EAF0] flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => onNavigate({ page: 'service', slug: service.slug })}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#16324F] hover:text-[#167D83] transition-colors cursor-pointer"
              >
                Read Clinical Guide
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate({ page: 'contact' })}
                className="text-xs font-medium text-[#167D83] hover:underline cursor-pointer"
              >
                Enquire
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Authentic In-Clinic Orthodontic Problem Identification Chart */}
      <section className="bg-white rounded-xl border border-[#E4EAF0] p-7 md:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold text-[#167D83]">
              From Our Waiting Room Wall Chart
            </p>
            <h2 className="text-2xl font-bold text-[#16324F] mt-1.5">
              {ORTHODONTIC_DIAGNOSTIC_CHART.chartTitle}
            </h2>
            <p className="text-sm text-[#667582] mt-2 leading-relaxed">
              {ORTHODONTIC_DIAGNOSTIC_CHART.chartSubtitle}
            </p>
            <div className="mt-5 rounded-xl overflow-hidden border border-[#E4EAF0]">
              <ResilientClinicImage
                src="/assets/clinic/waiting-lounge-chart.jpg"
                alt="Waiting room Problem Identification Chart at Sukhia Dental Surgery & Orthodontics"
                className="w-full h-56 object-cover"
              />
              <p className="p-3 bg-[#F8FAFC] text-xs text-[#667582]">
                Authentic photograph of the "Problem Identification Chart" displayed inside HR Sukhia Dental Clinic.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ORTHODONTIC_DIAGNOSTIC_CHART.conditions.map((cond) => (
              <div
                key={cond.index}
                className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E4EAF0]"
              >
                <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#167D83] font-semibold">
                  <span>Condition {cond.index}</span>
                </div>
                <h3 className="text-sm font-bold text-[#16324F] mt-1">
                  {cond.name}
                </h3>
                <p className="text-xs text-[#667582] mt-1.5 leading-relaxed">
                  {cond.clinicalSummary}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AppointmentEnquiryForm />
    </div>
  );
};

export const IndividualServicePage: React.FC<{
  service: ServiceItem;
  onNavigate: (route: PageRoute) => void;
}> = ({ service, onNavigate }) => {
  const relatedServices = SERVICES_DATA.filter((s) =>
    service.relatedSlugs.includes(s.slug)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-14">
      <div>
        <button
          type="button"
          onClick={() => onNavigate({ page: 'services' })}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#167D83] hover:text-[#16324F] mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to All Dental Services
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7 bg-white rounded-xl border border-[#E4EAF0] p-7 md:p-10 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#667582]">
                <span className="font-mono-tabular font-semibold text-[#167D83]">
                  Service {service.number}
                </span>
                <span aria-hidden="true">·</span>
                <span>{service.category}</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#16324F] font-medium">
                  {service.verificationStatus}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#16324F] mt-3">
                {service.title}
              </h1>
              <p className="text-base text-[#172B3A] mt-4 leading-relaxed">
                {service.heroIntro}
              </p>
              <p className="text-xs text-[#667582] mt-4 p-3.5 rounded-lg bg-[#F8FAFC] border border-[#E4EAF0] leading-relaxed">
                <strong className="text-[#16324F]">Clinical Oversight:</strong>{' '}
                {DENTIST_PROFILE.fullName} ({DENTIST_PROFILE.qualificationsString}) · 101 Abdullah Haroon Road, Saddar, Karachi.
              </p>
            </div>

            <div className="mt-6 pt-5 border-t border-[#E4EAF0] flex flex-wrap items-center gap-3">
              <a
                href="#service-enquiry-section"
                className="px-5 py-2.5 rounded-lg bg-[#16324F] text-white text-xs font-semibold hover:bg-[#167D83] transition-colors whitespace-nowrap shrink-0"
              >
                Enquire About {service.shortTitle}
              </a>
              <a
                href={CLINIC_INFO.phoneTelHref}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#E4EAF0] bg-white text-[#16324F] text-xs font-semibold hover:border-[#167D83] transition-colors whitespace-nowrap shrink-0"
              >
                <Phone className="w-4 h-4 text-[#167D83]" />
                Call {CLINIC_INFO.phoneNational}
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white rounded-xl border border-[#E4EAF0] overflow-hidden flex flex-col justify-between">
            <div className="h-64 lg:h-72 w-full overflow-hidden">
              <ResilientClinicImage
                src={service.image}
                alt={service.imageAlt}
                loading="eager"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5 bg-[#F8FAFC] border-t border-[#E4EAF0]">
              <p className="text-xs font-semibold text-[#16324F]">
                Authentic Clinic Asset Verification
              </p>
              <p className="text-xs text-[#667582] mt-1 leading-relaxed">
                {service.imageSourceNote}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* What It Involves & Who Should Enquire */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="bg-white rounded-xl border border-[#E4EAF0] p-7">
          <h2 className="text-xl font-bold text-[#16324F]">
            What This Service Generally Involves
          </h2>
          <ul className="mt-4 space-y-3">
            {service.whatItInvolves.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-[#172B3A] leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-[#167D83] shrink-0 mt-1" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-white rounded-xl border border-[#E4EAF0] p-7 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#16324F]">
              Who May Wish to Enquire
            </h2>
            <ul className="mt-4 space-y-3">
              {service.whoShouldEnquire.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-[#172B3A] leading-relaxed">
                  <ShieldCheck className="w-4 h-4 text-[#16324F] shrink-0 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 p-4 rounded-lg bg-[#EAF5F4] border border-[#167D83]/20 text-xs text-[#172B3A] leading-relaxed">
            <strong className="text-[#16324F]">Realistic Clinical Guidance:</strong>{' '}
            {service.clinicalNotes}
          </div>
        </section>
      </div>

      {/* Assessment & Treatment Planning Process */}
      <section className="bg-white rounded-xl border border-[#E4EAF0] p-7 md:p-10">
        <h2 className="text-2xl font-bold text-[#16324F]">
          Assessment &amp; Treatment Planning Flow
        </h2>
        <p className="text-sm text-[#667582] mt-1">
          Every patient undergoes an individual chairside evaluation before any clinical procedure is recommended.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
          {service.assessmentProcess.map((step) => (
            <div
              key={step.step}
              className="p-5 rounded-xl bg-[#F8FAFC] border border-[#E4EAF0]"
            >
              <span className="text-xs font-mono-tabular font-bold text-[#167D83]">
                {step.step}
              </span>
              <h3 className="text-base font-bold text-[#16324F] mt-1.5">
                {step.title}
              </h3>
              <p className="text-xs text-[#667582] mt-2 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Service-specific FAQs */}
      <section className="bg-white rounded-xl border border-[#E4EAF0] p-7 md:p-10">
        <h2 className="text-2xl font-bold text-[#16324F] mb-6">
          Common Questions About {service.shortTitle}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {service.faqs.map((faq) => (
            <div key={faq.question} className="p-5 rounded-xl bg-[#F8FAFC] border border-[#E4EAF0]">
              <h3 className="text-sm font-bold text-[#16324F]">
                {faq.question}
              </h3>
              <p className="text-xs text-[#667582] mt-2 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-[#16324F] mb-4">
            Related Services at HR Sukhia Dental Clinic
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {relatedServices.map((rel) => (
              <div
                key={rel.slug}
                className="bg-white rounded-xl border border-[#E4EAF0] p-5 flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-mono-tabular text-[#167D83] font-semibold">
                    {rel.number} · {rel.category}
                  </span>
                  <h3 className="text-base font-bold text-[#16324F] mt-1">
                    {rel.title}
                  </h3>
                  <p className="text-xs text-[#667582] mt-1.5 leading-relaxed">
                    {rel.summary}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate({ page: 'service', slug: rel.slug })}
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#167D83] hover:text-[#16324F] cursor-pointer"
                >
                  View {rel.shortTitle}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      <div id="service-enquiry-section">
        <AppointmentEnquiryForm defaultService={service.title} />
      </div>
    </div>
  );
};

export const ReviewsFullPage: React.FC<NavigationProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-14">
      <div className="bg-white rounded-xl border border-[#E4EAF0] p-7 md:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-2 text-xs text-[#167D83] font-semibold">
              <span>Authentic Patient Reputation</span>
              <span aria-hidden="true">·</span>
              <span>Google Place ID: {CLINIC_INFO.placeId}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#16324F] mt-2">
              Real Patient Reviews &amp; Honest Clinic Insights
            </h1>
            <p className="text-sm md:text-base text-[#667582] mt-3 leading-relaxed">
              We believe healthcare websites should represent patient feedback truthfully. HR Sukhia Dental Clinic holds a verified <strong>4.8 out of 5 star rating across 127 Google reviews</strong>. Below you can inspect verbatim reviews—both praising Dr. Sukhia’s orthodontic results and candidly discussing waiting times during peak hours.
            </p>
          </div>

          <div className="lg:col-span-4 bg-[#F8FAFC] rounded-xl border border-[#E4EAF0] p-6 text-center">
            <div className="inline-flex items-center justify-center gap-2 text-4xl font-bold font-mono-tabular text-[#16324F]">
              <span>{CLINIC_INFO.googleRating.score}</span>
              <Star className="w-8 h-8 fill-amber-400 text-amber-400" />
            </div>
            <p className="text-xs font-semibold text-[#172B3A] mt-1">
              Based on {CLINIC_INFO.googleRating.count} Verified Google Reviews
            </p>
            <p className="text-xs text-[#667582] mt-1">
              101 Abdullah Haroon Road, Saddar, Karachi
            </p>
            <a
              href={CLINIC_INFO.cidUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#16324F] text-white text-xs font-semibold hover:bg-[#167D83] transition-colors"
            >
              Open Live Google Maps Profile
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Recurring Themes */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {PATIENT_CHOICE_THEMES.map((theme) => (
          <div
            key={theme.number}
            className="bg-white rounded-xl border border-[#E4EAF0] p-5 flex flex-col justify-between"
          >
            <div>
              <span className="text-xs font-mono-tabular font-semibold text-[#167D83]">
                Theme {theme.number}
              </span>
              <h2 className="text-base font-bold text-[#16324F] mt-1.5">
                {theme.title}
              </h2>
              <p className="text-xs text-[#667582] mt-2 leading-relaxed">
                {theme.summary}
              </p>
            </div>
            <p className="text-xs text-[#172B3A] mt-4 pt-3 border-t border-[#E4EAF0]">
              {theme.evidenceNote}
            </p>
          </div>
        ))}
      </section>

      <ReviewsSection showAllControls={true} />

      <div className="bg-[#EAF5F4] rounded-xl border border-[#167D83]/20 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h2 className="text-lg font-bold text-[#16324F]">
            Planning a Visit? Tips from Past Patient Reviews
          </h2>
          <p className="text-xs md:text-sm text-[#172B3A] mt-1 leading-relaxed max-w-2xl">
            1. Call <strong>0333 3770353</strong> beforehand to reduce waiting time. 2. If starting fixed braces, ask for a pre-bonding scaling and polishing session. 3. Bring your orthodontic file or retainer to every follow-up appointment.
          </p>
        </div>
        <button
          type="button"
          onClick={() => onNavigate({ page: 'contact' })}
          className="px-5 py-2.5 rounded-lg bg-[#16324F] text-white text-xs font-semibold hover:bg-[#167D83] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          Request an Appointment
        </button>
      </div>
    </div>
  );
};

export const GalleryFullPage: React.FC<NavigationProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-14">
      <div>
        <div className="flex items-center gap-2 text-xs text-[#167D83] font-semibold">
          <span>100% Authentic Visual Inventory</span>
          <span aria-hidden="true">·</span>
          <span>No Generic Stock Substitutes</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-[#16324F] mt-2">
          Clinic Photographs &amp; Clinical Environment
        </h1>
        <p className="text-sm md:text-base text-[#667582] mt-3 max-w-3xl leading-relaxed">
          Explore verified photographs of HR Sukhia Dental Clinic at 101 Abdullah Haroon Road, Saddar—including our entrance door signage, waiting room diagnostic chart, sterilization trays, and dual-chair operatory. Click any photograph to open the full-resolution lightbox.
        </p>
      </div>

      <GalleryLightbox showHeader={false} />

      {/* Ethical Clinical Case Policy */}
      <section className="bg-white rounded-xl border border-[#E4EAF0] p-7 md:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <p className="text-xs font-semibold text-[#167D83]">
              Patient Privacy &amp; Image Integrity Standard
            </p>
            <h2 className="text-xl md:text-2xl font-bold text-[#16324F] mt-1.5">
              Why We Do Not Display Stock “Before &amp; After” Teeth Photos
            </h2>
            <p className="text-sm text-[#667582] mt-2 leading-relaxed">
              In compliance with medical ethics and strict image integrity standards, HR Sukhia Dental Clinic never uses stock models or altered photographs to simulate orthodontic results. Identifiable patient intraoral and facial orthodontic case photographs are reviewed in person during your consultation at the clinic or shared on our official Facebook page (
              <a
                href={CLINIC_INFO.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#167D83] font-semibold underline"
              >
                facebook.com/sukhia.dental
              </a>
              ) with patient authorization.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col gap-3">
            <a
              href={CLINIC_INFO.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#16324F] text-white text-xs font-semibold hover:bg-[#167D83] transition-colors"
            >
              Visit Official Facebook Page
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              type="button"
              onClick={() => onNavigate({ page: 'contact' })}
              className="w-full px-4 py-2.5 rounded-lg border border-[#E4EAF0] bg-[#F8FAFC] text-[#16324F] text-xs font-semibold hover:border-[#167D83] transition-colors cursor-pointer"
            >
              Book In-Person Case Review
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export const ContactLocationPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-14">
      <div className="max-w-3xl">
        <div className="flex items-center gap-2 text-xs text-[#167D83] font-semibold">
          <span>Verified Address &amp; Direct Telephone</span>
          <span aria-hidden="true">·</span>
          <span>Saddar, Karachi</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-[#16324F] mt-2">
          Contact &amp; Clinic Location
        </h1>
        <p className="text-sm md:text-base text-[#667582] mt-3 leading-relaxed">
          HR Sukhia Dental Clinic is located on the 1st Floor at 101 Abdullah Haroon Road (near Gulzar Building), Saddar, Karachi. Call ahead during afternoon hours or submit an appointment enquiry below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-xl border border-[#E4EAF0] p-6 space-y-5">
            <div>
              <p className="text-xs font-semibold text-[#167D83]">
                Verified Clinic Address
              </p>
              <h2 className="text-lg font-bold text-[#16324F] mt-1">
                {CLINIC_INFO.signageName}
              </h2>
              <p className="text-sm text-[#172B3A] mt-1.5 leading-relaxed">
                {CLINIC_INFO.address.fullFormatted}
              </p>
              <p className="text-xs text-[#667582] mt-1 font-mono-tabular">
                GPS: 24.858541° N, 67.0267195° E
              </p>
            </div>

            <div className="pt-4 border-t border-[#E4EAF0]">
              <p className="text-xs font-semibold text-[#167D83]">
                Verified Telephone Contact
              </p>
              <a
                href={CLINIC_INFO.phoneTelHref}
                className="text-xl font-bold font-mono-tabular text-[#16324F] hover:text-[#167D83] block mt-1"
              >
                {CLINIC_INFO.phoneInternational}
              </a>
              <p className="text-xs text-[#667582] mt-1">
                Local Dialing: <span className="font-mono-tabular font-medium text-[#172B3A]">{CLINIC_INFO.phoneNational}</span>
              </p>
            </div>

            <div className="pt-4 border-t border-[#E4EAF0] flex flex-wrap gap-3">
              <a
                href={CLINIC_INFO.phoneTelHref}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#16324F] text-white text-xs font-semibold hover:bg-[#167D83] transition-colors whitespace-nowrap shrink-0"
              >
                <Phone className="w-4 h-4" />
                Call Clinic Now
              </a>
              <a
                href={CLINIC_INFO.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#E4EAF0] bg-[#F8FAFC] text-[#16324F] text-xs font-semibold hover:border-[#167D83] transition-colors whitespace-nowrap shrink-0"
              >
                <Navigation className="w-4 h-4 text-[#167D83]" />
                Get Directions
              </a>
            </div>
          </div>

          {/* Verified Opening Hours Table */}
          <div className="bg-white rounded-xl border border-[#E4EAF0] p-6">
            <div className="flex items-center justify-between gap-2 mb-3">
              <h2 className="text-base font-bold text-[#16324F] flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#167D83]" />
                Clinic Opening Hours (Karachi PKT)
              </h2>
            </div>
            <p className="text-xs text-[#667582] mb-4 leading-relaxed">
              Both the Google Business Profile schedule and the physical notice on the clinic entrance door are shown below. Please call <strong>0333 3770353</strong> to confirm daily timings before travelling.
            </p>
            <div className="divide-y divide-[#E4EAF0] text-xs">
              {OPENING_HOURS.map((h) => (
                <div key={h.day} className="py-2.5 flex items-center justify-between gap-4">
                  <span className="font-semibold text-[#172B3A]">{h.day}</span>
                  <div className="text-right">
                    <span className="font-mono-tabular font-medium text-[#16324F] block">
                      {h.googleHours}
                    </span>
                    <span className="text-[11px] text-[#667582] block">
                      {h.doorNoticeNote}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <ClinicMap heightClass="h-[460px]" />

          <div className="bg-white rounded-xl border border-[#E4EAF0] p-6">
            <h3 className="text-sm font-bold text-[#16324F]">
              Arrival &amp; Building Access Instructions
            </h3>
            <ul className="mt-3 space-y-2 text-xs text-[#667582] leading-relaxed">
              {CLINIC_INFO.visitorPolicyNotes.map((note) => (
                <li key={note} className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#167D83] shrink-0 mt-0.5" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <AppointmentEnquiryForm />
    </div>
  );
};

export const FAQFullPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12">
      <div>
        <div className="flex items-center gap-2 text-xs text-[#167D83] font-semibold">
          <span>Verified Patient Guidance</span>
          <span aria-hidden="true">·</span>
          <span>HR Sukhia Dental Clinic</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-[#16324F] mt-2">
          Frequently Asked Questions
        </h1>
        <p className="text-sm md:text-base text-[#667582] mt-3 leading-relaxed">
          Answers to common questions about orthodontic consultations, fixed braces, clinic timings, location in Saddar, and how to minimize waiting times.
        </p>
      </div>

      <FAQAccordion showCategoryFilter={true} />

      <AppointmentEnquiryForm compact={true} />
    </div>
  );
};

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-10">
      <div className="bg-white rounded-xl border border-[#E4EAF0] p-7 md:p-10 space-y-6">
        <div>
          <p className="text-xs font-semibold text-[#167D83]">
            Healthcare Privacy, Data Handling &amp; Source Transparency
          </p>
          <h1 className="text-3xl font-bold text-[#16324F] mt-2">
            Privacy Policy &amp; Verification Inventory
          </h1>
          <p className="text-xs text-[#667582] mt-1">
            Effective Date: October 2026 · HR Sukhia Dental Clinic, 101 Abdullah Haroon Road, Saddar, Karachi
          </p>
        </div>

        <section className="space-y-2 text-sm text-[#172B3A] leading-relaxed">
          <h2 className="text-lg font-bold text-[#16324F]">
            1. Minimal Data Collection in Appointment Enquiries
          </h2>
          <p className="text-[#667582]">
            When you submit an Appointment Enquiry on this website, we collect only the contact details necessary to coordinate your visit: your name, Pakistani telephone number, preferred visit date/time window, general service category, and an optional brief note. We do not request sensitive medical history, national identity numbers, or financial payment details online.
          </p>
        </section>

        <section className="space-y-2 text-sm text-[#172B3A] leading-relaxed">
          <h2 className="text-lg font-bold text-[#16324F]">
            2. Patient Photography &amp; Clinical Case Ethics
          </h2>
          <p className="text-[#667582]">
            HR Sukhia Dental Clinic respects patient confidentiality. We do not publish identifiable patient faces or private intraoral dental records on this website without explicit consent, nor do we copy reviewer profile avatars from Google Maps.
          </p>
        </section>

        <section className="space-y-2 text-sm text-[#172B3A] leading-relaxed">
          <h2 className="text-lg font-bold text-[#16324F]">
            3. Google Maps Platform &amp; Third-Party Services Disclosure
          </h2>
          <p className="text-[#667582]">
            This website integrates Google Maps Platform features to display the clinic’s verified geographic coordinates in Saddar, Karachi and provide turn-by-turn directions. Use of Google Maps features on this website is subject to the{' '}
            <a
              href="https://maps.google.com/help/terms_maps/?utm_campaign=gmp_mcp_codeassist_v1_aistudio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#167D83] underline"
            >
              Google Maps End User Additional Terms of Service
            </a>{' '}
            and the{' '}
            <a
              href="https://policies.google.com/privacy?utm_campaign=gmp_mcp_codeassist_v1_aistudio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#167D83] underline"
            >
              Google Privacy Policy
            </a>
            .
          </p>
        </section>

        <div className="pt-6 border-t border-[#E4EAF0] grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-xl bg-[#F8FAFC] border border-[#E4EAF0]">
            <h3 className="text-sm font-bold text-[#16324F] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#167D83]" />
              Verified Public Facts Used on This Site
            </h3>
            <ul className="mt-3 space-y-2 text-xs text-[#667582] leading-relaxed">
              {TRANSPARENCY_DOCUMENTATION.verifiedFacts.map((fact) => (
                <li key={fact}>• {fact}</li>
              ))}
            </ul>
          </div>

          <div className="p-5 rounded-xl bg-[#EAF5F4]/60 border border-[#167D83]/20">
            <h3 className="text-sm font-bold text-[#16324F] flex items-center gap-2">
              <Award className="w-4 h-4 text-[#167D83]" />
              Items Flagged for Clinic Owner Confirmation
            </h3>
            <ul className="mt-3 space-y-2 text-xs text-[#172B3A] leading-relaxed">
              {TRANSPARENCY_DOCUMENTATION.ownerConfirmationNeeded.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
