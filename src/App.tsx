/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  Calendar,
  ExternalLink,
  MapPin,
  Menu,
  Navigation,
  Phone,
  Sparkles,
  Star,
  X,
} from 'lucide-react';
import {
  CLINIC_INFO,
  DENTIST_PROFILE,
  PATIENT_CHOICE_THEMES,
  SERVICES_DATA,
} from './data/clinicData';
import { getClinicOpenStatus } from './utils/clinicLogic';
import { ClinicBrandLogo } from './components/ClinicBrandLogo';
import { ResilientClinicImage, GalleryLightbox } from './components/GalleryLightbox';
import { ReviewsSection } from './components/ReviewsSection';
import { ClinicMap } from './components/ClinicMap';
import { AppointmentEnquiryForm } from './components/AppointmentEnquiryForm';
import { FAQAccordion } from './components/FAQAccordion';
import {
  AboutDentistPage,
  ContactLocationPage,
  FAQFullPage,
  GalleryFullPage,
  IndividualServicePage,
  PageRoute,
  PrivacyPolicyPage,
  ReviewsFullPage,
  ServicesOverviewPage,
} from './components/SubPages';

const HERO_BACKDROPS = [
  {
    id: 'operatory',
    label: 'Operatory',
    src: '/assets/clinic/treatment-operatory-wide.jpg',
    alt: 'Main clinical operatory at HR Sukhia Dental Clinic showing dual dental units and framed Royal College fellowship diplomas',
    captionTitle: 'Main Clinical Operatory · 101 Abdullah Haroon Road',
    captionText:
      'Dual orthodontic treatment chairs, patient case archives, and Prof. Dr. H.R. Sukhia’s framed Royal College fellowship diplomas (Glasgow, Ireland & Edinburgh).',
  },
  {
    id: 'lounge',
    label: 'Waiting Lounge',
    src: '/assets/clinic/waiting-lounge-chart.jpg',
    alt: 'Air-conditioned patient waiting lounge and Orthodontic Problem Identification Chart at HR Sukhia Dental Clinic',
    captionTitle: 'Patient Waiting Lounge · Orthodontic Diagnostic Chart',
    captionText:
      'Air-conditioned waiting room featuring the clinic’s in-house Orthodontic Problem Identification Chart for fixed braces consultations.',
  },
  {
    id: 'entrance',
    label: 'Entrance',
    src: '/assets/clinic/entrance-signage.jpg',
    alt: 'Original metallic signboard of Dr. H.R. Sukhia Dental Surgery & Orthodontics at 1st Floor, 101 Abdullah Haroon Road, Saddar',
    captionTitle: '1st Floor Entrance · Near Gulzar Building, Saddar',
    captionText:
      'Original clinic signage reading “Dr. H.R. Sukhia Dental Surgery & Orthodontics” and the verified priority-appointment door notice.',
  },
] as const;

function parseRouteFromUrl(): PageRoute {
  if (typeof window === 'undefined') return { page: 'home' };
  const params = new URLSearchParams(window.location.search);
  const p = params.get('page');
  const slug = params.get('slug');

  if (p === 'about') return { page: 'about' };
  if (p === 'services') return { page: 'services' };
  if (p === 'service' && slug) return { page: 'service', slug };
  if (p === 'reviews') return { page: 'reviews' };
  if (p === 'gallery') return { page: 'gallery' };
  if (p === 'contact') return { page: 'contact' };
  if (p === 'faq') return { page: 'faq' };
  if (p === 'privacy') return { page: 'privacy' };
  return { page: 'home' };
}

export default function App() {
  const [route, setRoute] = useState<PageRoute>(parseRouteFromUrl);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [gmpQuotaExceeded, setGmpQuotaExceeded] = useState(false);
  const [heroBackdropIndex, setHeroBackdropIndex] = useState(0);
  const [liveRating, setLiveRating] = useState({
    score: CLINIC_INFO.googleRating.score,
    count: CLINIC_INFO.googleRating.count,
  });

  const clinicStatus = getClinicOpenStatus();
  const activeBackdrop = HERO_BACKDROPS[heroBackdropIndex] || HERO_BACKDROPS[0];

  useEffect(() => {
    const handleQuota = () => setGmpQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', handleQuota);
    return () => window.removeEventListener('gmp-quota-exceeded', handleQuota);
  }, []);

  // Tier 2: Check server-side Places API proxy for live rating/review count & quota status
  useEffect(() => {
    let active = true;
    fetch('/api/clinic-place')
      .then(async (res) => {
        if (res.status === 429) {
          window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
          return null;
        }
        return res.ok ? res.json() : null;
      })
      .then((data) => {
        if (
          active &&
          data &&
          typeof data.rating === 'number' &&
          typeof data.userRatingCount === 'number'
        ) {
          setLiveRating({
            score: data.rating,
            count: data.userRatingCount,
          });
        }
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setRoute(parseRouteFromUrl());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (nextRoute: PageRoute) => {
    setRoute(nextRoute);
    setMobileMenuOpen(false);

    const url = new URL(window.location.href);
    url.search = '';
    if (nextRoute.page !== 'home') {
      url.searchParams.set('page', nextRoute.page);
      if (nextRoute.page === 'service') {
        url.searchParams.set('slug', nextRoute.slug);
      }
    }
    window.history.pushState({}, '', url.toString());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dynamic Document Title per Page for Local SEO
  useEffect(() => {
    if (route.page === 'home') {
      document.title =
        'HR Sukhia Dental Clinic | Orthodontics & Braces in Saddar, Karachi';
    } else if (route.page === 'about') {
      document.title =
        'Prof. Dr. H.R. Sukhia — Orthodontist Profile | HR Sukhia Dental Clinic';
    } else if (route.page === 'services') {
      document.title =
        'Dental & Orthodontic Services in Saddar, Karachi | HR Sukhia Dental Clinic';
    } else if (route.page === 'service') {
      const found = SERVICES_DATA.find((s) => s.slug === route.slug);
      document.title = found
        ? `${found.title} in Saddar, Karachi | HR Sukhia Dental Clinic`
        : 'Dental Service | HR Sukhia Dental Clinic';
    } else if (route.page === 'reviews') {
      document.title =
        'Verified Patient Reviews (4.8★) | HR Sukhia Dental Clinic Karachi';
    } else if (route.page === 'gallery') {
      document.title =
        'Authentic Clinic Photographs | HR Sukhia Dental Clinic Saddar';
    } else if (route.page === 'contact') {
      document.title =
        'Contact & Location (101 Abdullah Haroon Rd) | HR Sukhia Dental Clinic';
    } else if (route.page === 'faq') {
      document.title =
        'Frequently Asked Questions | HR Sukhia Dental Clinic Karachi';
    } else if (route.page === 'privacy') {
      document.title =
        'Privacy Policy & Verification Inventory | HR Sukhia Dental Clinic';
    }
  }, [route]);

  const activeService =
    route.page === 'service'
      ? SERVICES_DATA.find((s) => s.slug === route.slug) || SERVICES_DATA[0]
      : null;

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#172B3A] pb-14 md:pb-0">
      {/* Google Maps Platform Demo Key Quota Banner (Only shown if quota exceeded) */}
      {gmpQuotaExceeded && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
          <span>
            Google Maps Platform quota reached. If you are the app owner, visit{' '}
            <a
              href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold text-amber-950 hover:text-amber-800"
            >
              maps developer site
            </a>{' '}
            for instructions to update your account.
          </span>
        </div>
      )}

      {/* SECTION 1 — TOP INFORMATION BAR (Desktop & Tablet) */}
      <div className="hidden sm:block bg-[#10253B] text-white/90 border-b border-white/10 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 truncate">
            <span className="font-medium text-white">
              1st Floor, 101 Abdullah Haroon Road, Saddar, Karachi
            </span>
            <span aria-hidden="true" className="text-white/40">
              ·
            </span>
            <span className="text-white/80">{clinicStatus.statusLabel}</span>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <span className="text-white/80 hidden lg:inline">
              Mon–Fri 3:00–7:00 PM · Sat 2:00–7:00 PM
            </span>
            <span aria-hidden="true" className="text-white/40 hidden lg:inline">
              ·
            </span>
            <a
              href={CLINIC_INFO.phoneTelHref}
              className="font-mono-tabular font-semibold text-[#EAF5F4] hover:text-white inline-flex items-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <Phone className="w-3.5 h-3.5 text-[#38BDF8]" />
              {CLINIC_INFO.phoneInternational}
            </a>
          </div>
        </div>
      </div>

      {/* SECTION 2 — PREMIUM NAVIGATION (Strict 3-Zone Top Bar Contract with Custom Brand Logo) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xs border-b border-[#E4EAF0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
          {/* Zone 1: Custom SVG Dental & Orthodontic Crest + Brand Wordmark */}
          <a
            href="/?page=home"
            onClick={(e) => {
              e.preventDefault();
              navigateTo({ page: 'home' });
            }}
            aria-label="HR Sukhia Dental Clinic — Home"
            className="shrink-0"
          >
            <ClinicBrandLogo variant="dark-text" size="md" showSubtitle={false} />
          </a>

          {/* Zone 2: Concise single-line navigation links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-6 text-sm font-medium text-[#667582]"
          >
            <a
              href="/?page=home"
              onClick={(e) => {
                e.preventDefault();
                navigateTo({ page: 'home' });
              }}
              className={`hover:text-[#16324F] transition-colors whitespace-nowrap shrink-0 ${
                route.page === 'home'
                  ? 'text-[#16324F] font-semibold underline underline-offset-8 decoration-[#167D83] decoration-2'
                  : ''
              }`}
            >
              Home
            </a>
            <a
              href="/?page=about"
              onClick={(e) => {
                e.preventDefault();
                navigateTo({ page: 'about' });
              }}
              className={`hover:text-[#16324F] transition-colors whitespace-nowrap shrink-0 ${
                route.page === 'about'
                  ? 'text-[#16324F] font-semibold underline underline-offset-8 decoration-[#167D83] decoration-2'
                  : ''
              }`}
            >
              About Dentist
            </a>
            <a
              href="/?page=services"
              onClick={(e) => {
                e.preventDefault();
                navigateTo({ page: 'services' });
              }}
              className={`hover:text-[#16324F] transition-colors whitespace-nowrap shrink-0 ${
                route.page === 'services' || route.page === 'service'
                  ? 'text-[#16324F] font-semibold underline underline-offset-8 decoration-[#167D83] decoration-2'
                  : ''
              }`}
            >
              Services
            </a>
            <a
              href="/?page=reviews"
              onClick={(e) => {
                e.preventDefault();
                navigateTo({ page: 'reviews' });
              }}
              className={`hover:text-[#16324F] transition-colors whitespace-nowrap shrink-0 ${
                route.page === 'reviews'
                  ? 'text-[#16324F] font-semibold underline underline-offset-8 decoration-[#167D83] decoration-2'
                  : ''
              }`}
            >
              Reviews
            </a>
            <a
              href="/?page=gallery"
              onClick={(e) => {
                e.preventDefault();
                navigateTo({ page: 'gallery' });
              }}
              className={`hover:text-[#16324F] transition-colors whitespace-nowrap shrink-0 ${
                route.page === 'gallery'
                  ? 'text-[#16324F] font-semibold underline underline-offset-8 decoration-[#167D83] decoration-2'
                  : ''
              }`}
            >
              Gallery
            </a>
            <a
              href="/?page=contact"
              onClick={(e) => {
                e.preventDefault();
                navigateTo({ page: 'contact' });
              }}
              className={`hover:text-[#16324F] transition-colors whitespace-nowrap shrink-0 ${
                route.page === 'contact'
                  ? 'text-[#16324F] font-semibold underline underline-offset-8 decoration-[#167D83] decoration-2'
                  : ''
              }`}
            >
              Contact
            </a>
          </nav>

          {/* Zone 3: 1 primary animated action + Mobile Hamburger */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => navigateTo({ page: 'contact' })}
              className="btn-animated-primary hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#16324F] rounded-lg hover:bg-[#167D83] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Book an Appointment</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="md:hidden p-2 rounded-lg text-[#16324F] hover:bg-[#F8FAFC] border border-[#E4EAF0] cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Accessible Collapsible Menu */}
        {mobileMenuOpen && (
          <div
            data-testid="mobile-nav-drawer"
            className="md:hidden bg-white border-b border-[#E4EAF0] px-4 pt-3 pb-5 space-y-3"
          >
            <div className="pb-2 border-b border-[#E4EAF0] text-xs text-[#667582]">
              <ClinicBrandLogo variant="dark-text" size="sm" showSubtitle={true} />
              <p className="mt-1.5">{CLINIC_INFO.address.fullFormatted}</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {(
                [
                  { label: 'Home', target: { page: 'home' } },
                  { label: 'About the Dentist', target: { page: 'about' } },
                  { label: 'Dental Services', target: { page: 'services' } },
                  { label: 'Patient Reviews', target: { page: 'reviews' } },
                  { label: 'Clinic Gallery', target: { page: 'gallery' } },
                  { label: 'FAQ', target: { page: 'faq' } },
                  { label: 'Contact & Map', target: { page: 'contact' } },
                  { label: 'Privacy Policy', target: { page: 'privacy' } },
                ] as const
              ).map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => navigateTo(item.target)}
                  className={`text-left px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    route.page === item.target.page
                      ? 'bg-[#EAF5F4] text-[#16324F]'
                      : 'text-[#172B3A] hover:bg-[#F8FAFC]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="pt-2 flex items-center gap-2">
              <a
                href={CLINIC_INFO.phoneTelHref}
                className="btn-animated-primary flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#16324F] text-white text-xs font-semibold"
              >
                <Phone className="w-3.5 h-3.5" />
                Call {CLINIC_INFO.phoneNational}
              </a>
              <a
                href={CLINIC_INFO.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-lg border border-[#E4EAF0] bg-[#F8FAFC] text-[#16324F] text-xs font-semibold"
              >
                <Navigation className="w-3.5 h-3.5 text-[#167D83]" />
                Directions
              </a>
            </div>
          </div>
        )}
      </header>

      {/* MAIN PAGE CONTENT */}
      <main className="flex-1">
        {route.page === 'about' && <AboutDentistPage onNavigate={navigateTo} />}
        {route.page === 'services' && <ServicesOverviewPage onNavigate={navigateTo} />}
        {route.page === 'service' && activeService && (
          <IndividualServicePage service={activeService} onNavigate={navigateTo} />
        )}
        {route.page === 'reviews' && <ReviewsFullPage onNavigate={navigateTo} />}
        {route.page === 'gallery' && <GalleryFullPage onNavigate={navigateTo} />}
        {route.page === 'contact' && <ContactLocationPage />}
        {route.page === 'faq' && <FAQFullPage />}
        {route.page === 'privacy' && <PrivacyPolicyPage />}

        {route.page === 'home' && (
          <div>
            {/* SECTION 3 — FULL-BLEED BACKGROUND IMAGE HERO WITH ANIMATED TYPOGRAPHY & BUTTONS */}
            <section className="relative overflow-hidden bg-[#0A1E32] text-white border-b border-[#1E3A54]">
              {/* Full-Bleed Edge-to-Edge Main Background Photograph covering the entire Hero */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                  key={activeBackdrop.src}
                  src={activeBackdrop.src}
                  alt={activeBackdrop.alt}
                  loading="eager"
                  className="w-full h-full object-cover object-center animate-hero-backdrop clinic-photo-enhanced opacity-80"
                />
                {/* Multi-layer high-contrast clinical scrims for guaranteed text legibility */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#071524]/92 via-[#0A1F33]/78 to-[#0D2740]/45" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071524]/92 via-transparent to-[#071524]/50" />
              </div>

              <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  {/* Left Column: Staggered Animated Copy & Interactive CTAs */}
                  <div className="lg:col-span-7 flex flex-col justify-between">
                    <div>
                      <div className="animate-fade-up flex flex-wrap items-center gap-2 text-xs text-[#9AD6D3]">
                        <span className="font-signage text-base md:text-lg font-bold text-white tracking-wide">
                          {CLINIC_INFO.signageName}
                        </span>
                        <span aria-hidden="true" className="text-white/40">
                          ·
                        </span>
                        <span className="text-white/85">
                          101 Abdullah Haroon Road, Saddar, Karachi
                        </span>
                      </div>

                      <h1 className="animate-fade-up-d1 text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mt-3.5 leading-[1.12]">
                        Thoughtful Dental Care.{' '}
                        <span className="hero-animated-accent block sm:inline">
                          Confident Smiles.
                        </span>
                      </h1>

                      <p className="animate-fade-up-d2 text-base md:text-lg text-white/85 mt-4 leading-relaxed max-w-2xl">
                        Specialist orthodontic care, fixed braces, and general dentistry in the heart of Saddar, Karachi—led by{' '}
                        <strong className="text-white font-semibold">
                          Prof. Dr. H.R. Sukhia
                        </strong>{' '}
                        (BDS, MS, FDSRCPS Glasgow, FFD Orth RCSI, MOrth RCS Edinburgh).
                      </p>

                      {/* Animated Action Buttons */}
                      <div className="animate-fade-up-d3 mt-8 flex flex-wrap items-center gap-3.5">
                        <button
                          type="button"
                          onClick={() => navigateTo({ page: 'contact' })}
                          className="btn-animated-primary group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg bg-[#167D83] text-white text-sm font-semibold hover:bg-[#199299] transition-all whitespace-nowrap shrink-0 cursor-pointer shadow-lg shadow-black/25"
                        >
                          <Calendar className="w-4 h-4" />
                          <span>Book an Appointment</span>
                          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </button>

                        <button
                          type="button"
                          onClick={() => navigateTo({ page: 'services' })}
                          className="group inline-flex items-center gap-2 px-5 py-3.5 rounded-lg border border-white/25 bg-white/10 backdrop-blur-xs text-white text-sm font-semibold hover:bg-white/20 hover:border-white/40 transition-all whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          <span>Explore Dental Services</span>
                          <ArrowRight className="w-4 h-4 text-[#7CE2DC] transition-transform duration-300 group-hover:translate-x-1" />
                        </button>

                        <a
                          href={CLINIC_INFO.phoneTelHref}
                          className="inline-flex items-center gap-2 px-4 py-3 text-sm font-mono-tabular font-semibold text-[#EAF5F4] hover:text-white transition-colors whitespace-nowrap shrink-0"
                        >
                          <Phone className="w-4 h-4 text-[#38BDF8]" />
                          {CLINIC_INFO.phoneInternational}
                        </a>
                      </div>
                    </div>

                    {/* Verified Rating & Location Bar inside Full-Bleed Hero */}
                    <div className="animate-fade-up-d3 mt-9 pt-6 border-t border-white/15 flex flex-wrap items-center justify-between gap-4 text-xs text-white/80">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center text-amber-400">
                          {Array.from({ length: 5 }).map((_, idx) => (
                            <Star key={idx} className="w-4 h-4 fill-amber-400" />
                          ))}
                        </div>
                        <span className="font-mono-tabular font-bold text-white">
                          {liveRating.score} / 5.0
                        </span>
                        <span aria-hidden="true" className="text-white/40">
                          ·
                        </span>
                        <button
                          type="button"
                          onClick={() => navigateTo({ page: 'reviews' })}
                          className="underline text-[#9AD6D3] hover:text-white cursor-pointer"
                        >
                          {liveRating.count} Verified Google Reviews
                        </button>
                      </div>

                      <div className="flex items-center gap-1.5 text-white/90">
                        <MapPin className="w-3.5 h-3.5 text-[#38BDF8]" />
                        <span>1st Floor, Near Gulzar Building, Saddar</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Custom Brand Crest Card & Interactive Hero Backdrop Switcher */}
                  <div className="animate-fade-up-d2 lg:col-span-5 flex flex-col justify-between rounded-xl overflow-hidden border border-white/20 bg-[#0D2136]/85 backdrop-blur-md shadow-2xl">
                    {/* Brand Emblem Header Strip */}
                    <div className="px-4 py-3.5 border-b border-white/15 bg-[#102942]/90 flex items-center justify-between gap-3">
                      <ClinicBrandLogo
                        variant="light-text"
                        size="sm"
                        showSubtitle={true}
                      />
                      <span className="hidden sm:inline text-[11px] font-mono-tabular text-[#7CE2DC] shrink-0">
                        Saddar, KHI
                      </span>
                    </div>

                    {/* Active Photograph Spotlight */}
                    <div className="relative h-60 sm:h-72 w-full overflow-hidden">
                      <ResilientClinicImage
                        src={activeBackdrop.src}
                        alt={activeBackdrop.alt}
                        loading="eager"
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#081726]/95 via-[#081726]/65 to-transparent p-4 text-white">
                        <p className="text-xs font-semibold text-[#7CE2DC]">
                          {activeBackdrop.captionTitle}
                        </p>
                        <p className="text-xs text-white/90 mt-0.5 leading-snug">
                          {activeBackdrop.captionText}
                        </p>
                      </div>
                    </div>

                    {/* Interactive Full-Hero Background Switcher Controls */}
                    <div className="p-3 bg-[#0A1929]/95 border-t border-white/15 flex flex-wrap items-center justify-between gap-2">
                      <span className="text-[11px] text-white/75 inline-flex items-center gap-1.5 shrink-0">
                        <Sparkles className="w-3.5 h-3.5 text-[#38BDF8]" />
                        <span>Hero Backdrop:</span>
                      </span>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {HERO_BACKDROPS.map((item, idx) => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setHeroBackdropIndex(idx)}
                            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                              heroBackdropIndex === idx
                                ? 'bg-[#167D83] text-white shadow-xs'
                                : 'bg-white/10 text-white/75 hover:bg-white/20 hover:text-white'
                            }`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* SECTION 4 — TRUST INDICATORS (Full-width 4-column row inside Hero) */}
                <div className="animate-fade-up-d3 mt-12 pt-8 border-t border-white/15 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  <div className="p-4 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 hover:bg-white/15 transition-all duration-300 hover:-translate-y-0.5">
                    <p className="text-xs text-white/75">Google Business Profile</p>
                    <p className="text-lg font-bold font-mono-tabular text-white mt-1 inline-flex items-center gap-1.5">
                      <span>{liveRating.score}</span>
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400 shrink-0" />
                      <span>({liveRating.count} Reviews)</span>
                    </p>
                    <p className="text-xs text-[#7CE2DC] mt-1">
                      Verified Place ID: ChIJDyfERnI-sz4RXS_cF1qNraU
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 hover:bg-white/15 transition-all duration-300 hover:-translate-y-0.5">
                    <p className="text-xs text-white/75">Specialist Credentials</p>
                    <p className="text-base font-bold text-white mt-1">
                      FDSRCPS · FFD Orth · MOrth
                    </p>
                    <p className="text-xs text-white/75 mt-1">
                      Royal Colleges of Glasgow, Ireland &amp; Edinburgh
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 hover:bg-white/15 transition-all duration-300 hover:-translate-y-0.5">
                    <p className="text-xs text-white/75">Academic Leadership</p>
                    <p className="text-base font-bold text-white mt-1">
                      Professor of Orthodontics
                    </p>
                    <p className="text-xs text-white/75 mt-1">
                      Principal (Dental Section), SSCMS Karachi
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 hover:bg-white/15 transition-all duration-300 hover:-translate-y-0.5">
                    <p className="text-xs text-white/75">Verified Saddar Location</p>
                    <p className="text-base font-bold text-white mt-1">
                      101 Abdullah Haroon Rd
                    </p>
                    <p className="text-xs text-white/75 mt-1">
                      1st Floor, Near Gulzar Building · 0333 3770353
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 5 — INTRODUCING THE CLINIC */}
            <section className="py-14 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-5">
                  <div className="bg-white rounded-xl border border-[#E4EAF0] overflow-hidden shadow-xs">
                    <div className="h-80 w-full overflow-hidden">
                      <ResilientClinicImage
                        src="/assets/clinic/entrance-signage.jpg"
                        alt="Original entrance door and signboard of Dr. H.R. Sukhia Dental Surgery & Orthodontics at 101 Abdullah Haroon Road"
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                    </div>
                    <div className="p-4 bg-[#F8FAFC] border-t border-[#E4EAF0] text-xs text-[#667582]">
                      <strong className="text-[#16324F]">Original Clinic Signage:</strong>{' '}
                      “Dr. H.R. Sukhia Dental Surgery &amp; Orthodontics” above the 1st-floor entrance door in Saddar.
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-5">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#167D83]">
                    <span>Established Saddar Practice</span>
                    <span aria-hidden="true">·</span>
                    <span>Authentic Clinical Heritage</span>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-bold text-[#16324F]">
                    A Trusted Orthodontic &amp; Dental Practice on Abdullah Haroon Road
                  </h2>

                  <p className="text-sm md:text-base text-[#172B3A] leading-relaxed">
                    Known on its entrance nameplate as{' '}
                    <strong className="font-signage text-lg font-bold text-[#16324F]">
                      Dr. H.R. Sukhia Dental Surgery &amp; Orthodontics
                    </strong>
                    , HR Sukhia Dental Clinic has served families, students, and working professionals in central Karachi for decades.
                  </p>

                  <p className="text-sm md:text-base text-[#667582] leading-relaxed">
                    Unlike impersonal corporate clinics, consultations and orthodontic treatment plans are guided directly by{' '}
                    <strong className="text-[#172B3A]">Prof. Dr. H.R. Sukhia</strong>. Whether a teenager requires multi-arch fixed braces for crowded teeth or an adult needs a routine dental check-up, care is delivered in an air-conditioned clinical setting with straightforward communication and reasonable fees.
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    <button
                      type="button"
                      onClick={() => navigateTo({ page: 'about' })}
                      className="btn-animated-primary group inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#16324F] text-white text-xs font-semibold hover:bg-[#167D83] transition-colors cursor-pointer"
                    >
                      <span>Meet Dr. HR Sukhia</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                    <button
                      type="button"
                      onClick={() => navigateTo({ page: 'gallery' })}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#E4EAF0] bg-white text-[#16324F] text-xs font-semibold hover:border-[#167D83] transition-colors cursor-pointer"
                    >
                      Inspect Clinic Photographs
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 6 — DENTAL SERVICES */}
            <section className="py-14 md:py-20 bg-white border-y border-[#E4EAF0]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div className="max-w-2xl">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#167D83]">
                      <span>Confirmed Clinical Services</span>
                      <span aria-hidden="true">·</span>
                      <span>Orthodontics &amp; General Dentistry</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-[#16324F] mt-2">
                      Dental Services Offered at the Clinic
                    </h2>
                    <p className="text-sm md:text-base text-[#667582] mt-2 leading-relaxed">
                      Fixed orthodontic braces and bite alignment are at the core of our practice, supported by preventive hygiene, general consultations, and restorative dental procedures.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => navigateTo({ page: 'services' })}
                    className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#E4EAF0] bg-[#F8FAFC] text-[#16324F] text-xs font-semibold hover:border-[#167D83] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>View Complete Service Directory</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>

                {/* Asymmetric Bento Grid giving prominence to Orthodontics & Fixed Braces */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {SERVICES_DATA.map((service, index) => (
                    <article
                      key={service.slug}
                      className={`group rounded-xl border border-[#E4EAF0] overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-[#167D83]/60 ${
                        index === 0
                          ? 'md:col-span-2 lg:col-span-2 bg-[#EAF5F4]/40'
                          : 'bg-[#F8FAFC]'
                      }`}
                    >
                      <div
                        className={
                          index === 0
                            ? 'grid grid-cols-1 lg:grid-cols-12 gap-0 h-full'
                            : ''
                        }
                      >
                        <div
                          className={
                            index === 0
                              ? 'lg:col-span-6 h-60 lg:h-full overflow-hidden'
                              : 'h-48 w-full overflow-hidden'
                          }
                        >
                          <ResilientClinicImage
                            src={service.image}
                            alt={service.imageAlt}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>

                        <div
                          className={
                            index === 0
                              ? 'lg:col-span-6 p-6 md:p-7 flex flex-col justify-between'
                              : 'p-6 flex flex-col justify-between'
                          }
                        >
                          <div>
                            <div className="flex items-center gap-2 text-xs text-[#667582]">
                              <span className="font-mono-tabular font-bold text-[#167D83]">
                                {service.number}.
                              </span>
                              <span>{service.category}</span>
                            </div>
                            <h3 className="text-lg md:text-xl font-bold text-[#16324F] mt-1.5">
                              {service.title}
                            </h3>
                            <p className="text-xs md:text-sm text-[#667582] mt-2 leading-relaxed">
                              {service.summary}
                            </p>
                            {index === 0 && (
                              <div className="mt-4 pt-4 border-t border-[#E4EAF0]">
                                <p className="text-xs font-semibold text-[#16324F]">
                                  Conditions on Our In-Clinic Chart:
                                </p>
                                <p className="text-xs text-[#667582] mt-1 leading-relaxed">
                                  Deep Bite · Crowded Teeth · Delayed Eruption · Underbite · Overlapped Teeth · Spacing · Open Bite · Protruded Teeth
                                </p>
                              </div>
                            )}
                          </div>

                          <div className="mt-5 pt-4 border-t border-[#E4EAF0] flex items-center justify-between gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                navigateTo({ page: 'service', slug: service.slug })
                              }
                              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#16324F] hover:text-[#167D83] transition-colors cursor-pointer"
                            >
                              <span>Explore {service.shortTitle}</span>
                              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                            </button>
                            <button
                              type="button"
                              onClick={() => navigateTo({ page: 'contact' })}
                              className="text-xs font-medium text-[#167D83] hover:underline cursor-pointer"
                            >
                              Enquire
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 7 — THE DENTIST */}
            <section className="py-14 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-xl border border-[#E4EAF0] overflow-hidden shadow-xs">
                <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                  <div className="lg:col-span-7 p-7 md:p-10 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#167D83]">
                        <span>Principal Orthodontist &amp; Academician</span>
                        <span aria-hidden="true">·</span>
                        <span>Verified Institutional Credentials</span>
                      </div>

                      <h2 className="text-2xl md:text-3xl font-bold text-[#16324F] mt-2">
                        {DENTIST_PROFILE.fullName} ({DENTIST_PROFILE.fullExpandedName})
                      </h2>
                      <p className="text-xs md:text-sm font-mono-tabular font-semibold text-[#167D83] mt-1">
                        {DENTIST_PROFILE.qualificationsString}
                      </p>

                      <p className="text-sm md:text-base text-[#172B3A] mt-4 leading-relaxed">
                        {DENTIST_PROFILE.shortBio}
                      </p>

                      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {DENTIST_PROFILE.academicAndLeadershipRoles.slice(0, 4).map((role) => (
                          <div
                            key={role.role}
                            className="p-3.5 rounded-lg bg-[#F8FAFC] border border-[#E4EAF0]"
                          >
                            <p className="text-xs font-bold text-[#16324F]">
                              {role.role}
                            </p>
                            <p className="text-xs text-[#667582] mt-1 leading-snug">
                              {role.organization}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-[#E4EAF0] flex flex-wrap items-center justify-between gap-4">
                      <button
                        type="button"
                        onClick={() => navigateTo({ page: 'about' })}
                        className="btn-animated-primary group inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#16324F] text-white text-xs font-semibold hover:bg-[#167D83] transition-colors cursor-pointer"
                      >
                        <span>Learn More About the Dentist</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </button>
                      <span className="text-xs text-[#667582]">
                        Author of <em>“Student Orthodontics”</em> · Founding Member, PAO
                      </span>
                    </div>
                  </div>

                  <div className="lg:col-span-5 bg-[#F8FAFC] border-t lg:border-t-0 lg:border-l border-[#E4EAF0] flex flex-col justify-between">
                    <div className="h-72 lg:h-80 w-full overflow-hidden">
                      <ResilientClinicImage
                        src="/assets/clinic/treatment-operatory-wide.jpg"
                        alt="Clinical operatory of Prof. Dr. H.R. Sukhia showing framed Royal College fellowship diplomas on the wall"
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <p className="text-xs font-semibold text-[#167D83]">
                        Authentic Clinical Environment
                      </p>
                      <p className="text-xs text-[#172B3A] mt-1 leading-relaxed">
                        The clinical operatory at 101 Abdullah Haroon Road displays Prof. Dr. H.R. Sukhia’s framed Royal College diplomas alongside the dual orthodontic chairs and patient case record archive.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 8 — WHY PATIENTS CHOOSE THE CLINIC */}
            <section className="py-14 md:py-20 bg-[#EAF5F4]/50 border-y border-[#E4EAF0]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mb-10">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#167D83]">
                    <span>Evidence-Based Patient Themes</span>
                    <span aria-hidden="true">·</span>
                    <span>Distilled from 127 Google Reviews</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#16324F] mt-2">
                    Why Patients Choose HR Sukhia Dental Clinic—And What to Expect
                  </h2>
                  <p className="text-sm md:text-base text-[#667582] mt-2 leading-relaxed">
                    Rather than making exaggerated marketing promises, we summarize the genuine strengths and practical considerations reported by real patients in Karachi.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {PATIENT_CHOICE_THEMES.map((item) => (
                    <div
                      key={item.number}
                      className="bg-white rounded-xl border border-[#E4EAF0] p-6 flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1 hover:shadow-xs"
                    >
                      <div>
                        <span className="text-xs font-mono-tabular font-bold text-[#167D83]">
                          {item.number}
                        </span>
                        <h3 className="text-base font-bold text-[#16324F] mt-2">
                          {item.title}
                        </h3>
                        <p className="text-xs md:text-sm text-[#667582] mt-2 leading-relaxed">
                          {item.summary}
                        </p>
                      </div>
                      <p className="text-xs text-[#172B3A] mt-4 pt-3 border-t border-[#E4EAF0]">
                        {item.evidenceNote}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 9 — REAL PATIENT REVIEWS */}
            <section className="py-14 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ReviewsSection
                showAllControls={false}
                onNavigateReviewsPage={() => navigateTo({ page: 'reviews' })}
              />
            </section>

            {/* SECTION 10 — REAL CLINIC GALLERY */}
            <section className="py-14 md:py-20 bg-white border-y border-[#E4EAF0]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <GalleryLightbox showHeader={true} />
              </div>
            </section>

            {/* SECTION 11 — HOW TO GET STARTED */}
            <section className="py-14 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-2xl mb-10">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#167D83]">
                  <span>General Visit Flow</span>
                  <span aria-hidden="true">·</span>
                  <span>Simple &amp; Straightforward</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#16324F] mt-2">
                  How to Arrange Your Visit at HR Sukhia Dental Clinic
                </h2>
                <p className="text-sm md:text-base text-[#667582] mt-2 leading-relaxed">
                  Whether you are visiting for an initial fixed braces assessment or a general dental check-up, here is what a typical visit entails.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    step: '01. Contact the Clinic',
                    title: 'Call 0333 3770353 or Submit an Enquiry',
                    desc: 'Reach out during afternoon hours or log your preferred date below. Calling ahead confirms the dentist’s daily schedule.',
                  },
                  {
                    step: '02. Priority Slot',
                    title: 'Arrive at 101 Abdullah Haroon Road',
                    desc: 'Visit the 1st Floor clinic near Gulzar Building in Saddar. Per our door notice, patients with prior appointments are taken first.',
                  },
                  {
                    step: '03. Clinical Evaluation',
                    title: 'Discuss Your Concerns with Dr. Sukhia',
                    desc: 'Undergo a careful examination of tooth alignment, bite relationship, or dental symptoms in an air-conditioned operatory.',
                  },
                  {
                    step: '04. Treatment & Hygiene Plan',
                    title: 'Receive Clear Recommendations',
                    desc: 'Review the proposed orthodontic or dental plan, expected timeline, pre-braces scaling needs, and fee estimate.',
                  },
                ].map((item) => (
                  <div
                    key={item.step}
                    className="bg-white rounded-xl border border-[#E4EAF0] p-6 transition-transform duration-300 hover:-translate-y-1 hover:shadow-xs"
                  >
                    <span className="text-xs font-mono-tabular font-bold text-[#167D83]">
                      {item.step}
                    </span>
                    <h3 className="text-base font-bold text-[#16324F] mt-2">
                      {item.title}
                    </h3>
                    <p className="text-xs md:text-sm text-[#667582] mt-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 12 — LOCATION, DIRECTIONS & APPOINTMENT ENQUIRY */}
            <section
              id="location-and-appointment"
              className="py-14 md:py-20 bg-white border-y border-[#E4EAF0]"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-5 space-y-6">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-semibold text-[#167D83]">
                        <span>Verified Clinic Location</span>
                        <span aria-hidden="true">·</span>
                        <span>Saddar, Karachi</span>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-[#16324F] mt-2">
                        Visit Us on Abdullah Haroon Road
                      </h2>
                      <p className="text-sm text-[#667582] mt-2 leading-relaxed">
                        Conveniently situated on the 1st Floor at 101 Abdullah Haroon Road (near Gulzar Building) in Saddar, Karachi.
                      </p>
                    </div>

                    <div className="p-5 rounded-xl bg-[#F8FAFC] border border-[#E4EAF0] space-y-4">
                      <div>
                        <p className="text-xs font-semibold text-[#167D83]">Address</p>
                        <p className="text-sm font-bold text-[#16324F] mt-0.5">
                          {CLINIC_INFO.address.fullFormatted}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-[#167D83]">
                          Telephone
                        </p>
                        <a
                          href={CLINIC_INFO.phoneTelHref}
                          className="text-lg font-bold font-mono-tabular text-[#16324F] hover:text-[#167D83] block mt-0.5"
                        >
                          {CLINIC_INFO.phoneInternational}
                        </a>
                      </div>

                      <div className="pt-2 border-t border-[#E4EAF0]">
                        <p className="text-xs font-semibold text-[#16324F] mb-2">
                          Verified Opening Hours
                        </p>
                        <div className="space-y-1.5 text-xs">
                          <div className="flex justify-between">
                            <span className="text-[#667582]">Monday – Wednesday, Friday</span>
                            <span className="font-mono-tabular font-medium text-[#172B3A]">
                              3:00 PM – 7:00 PM
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#667582]">Thursday (Confirm by Phone)</span>
                            <span className="font-mono-tabular font-medium text-[#167D83]">
                              Call 0333 3770353
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#667582]">Saturday</span>
                            <span className="font-mono-tabular font-medium text-[#172B3A]">
                              2:00 PM – 7:00 PM
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#667582]">Sunday</span>
                            <span className="font-mono-tabular font-medium text-red-700">
                              Closed
                            </span>
                          </div>
                        </div>
                        <p className="text-[11px] text-[#667582] mt-2.5 leading-relaxed">
                          Note: The physical plaque on the clinic door lists 2:00 PM – 7:00 PM and notes Thursday &amp; Sunday closed. Always call 0333 3770353 before visiting.
                        </p>
                      </div>

                      <div className="pt-2 flex flex-wrap gap-3">
                        <a
                          href={CLINIC_INFO.directionsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-animated-primary inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#16324F] text-white text-xs font-semibold hover:bg-[#167D83] transition-colors whitespace-nowrap shrink-0"
                        >
                          <Navigation className="w-3.5 h-3.5" />
                          Get Directions
                        </a>
                        <a
                          href={CLINIC_INFO.phoneTelHref}
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#E4EAF0] bg-white text-[#16324F] text-xs font-semibold hover:border-[#167D83] transition-colors whitespace-nowrap shrink-0"
                        >
                          <Phone className="w-3.5 h-3.5 text-[#167D83]" />
                          Call {CLINIC_INFO.phoneNational}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-7">
                    <ClinicMap heightClass="h-[440px]" />
                  </div>
                </div>

                {/* Shared Appointment Enquiry Form */}
                <AppointmentEnquiryForm />
              </div>
            </section>

            {/* SECTION 13 — FREQUENTLY ASKED QUESTIONS */}
            <section className="py-14 md:py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#167D83]">
                    <span>Patient Questions Answered</span>
                    <span aria-hidden="true">·</span>
                    <span>Verified Clinic Policies</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#16324F] mt-2">
                    Frequently Asked Questions
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => navigateTo({ page: 'faq' })}
                  className="group text-xs font-semibold text-[#167D83] hover:text-[#16324F] inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Open Full FAQ Page</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>

              <FAQAccordion />
            </section>

            {/* SECTION 14 — FINAL APPOINTMENT CTA */}
            <section className="bg-[#16324F] text-white py-14 md:py-16 border-t border-white/10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                <div className="max-w-2xl">
                  <p className="text-xs font-semibold text-[#EAF5F4]">
                    Dr. H.R. Sukhia Dental Surgery &amp; Orthodontics · Saddar, Karachi
                  </p>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mt-2">
                    Ready to Take the Next Step for Your Dental Health?
                  </h2>
                  <p className="text-sm md:text-base text-white/80 mt-2.5 leading-relaxed">
                    Call the clinic directly during afternoon hours to arrange your orthodontic braces consultation or general dental check-up at 101 Abdullah Haroon Road.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3.5 shrink-0">
                  <a
                    href={CLINIC_INFO.phoneTelHref}
                    className="btn-animated-primary inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#167D83] text-white text-sm font-semibold hover:bg-[#136B70] transition-colors whitespace-nowrap shrink-0"
                  >
                    <Phone className="w-4 h-4" />
                    Call the Clinic ({CLINIC_INFO.phoneNational})
                  </a>
                  <a
                    href={CLINIC_INFO.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-white/25 bg-white/10 text-white text-sm font-semibold hover:bg-white/20 transition-colors whitespace-nowrap shrink-0"
                  >
                    <Navigation className="w-4 h-4" />
                    Get Directions
                  </a>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>

      {/* SECTION 15 — FOOTER */}
      <footer className="bg-[#0F2338] text-white/80 border-t border-white/10 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-white/10">
            {/* Brand & Verified Description */}
            <div className="lg:col-span-4 space-y-3">
              <ClinicBrandLogo variant="light-text" size="md" showSubtitle={true} />
              <p className="text-white/70 leading-relaxed pt-1">
                Specialist orthodontic and dental clinic in Saddar, Karachi, led by Prof. Dr. Hoshang Rumi Sukhia (BDS, BSc, DOrth, MS, FDSRCPS, FFD Orth RCSI, MOrth RCS Ed).
              </p>
              <div className="pt-1 flex items-center gap-1.5 text-white/90 font-mono-tabular">
                <span>{liveRating.score}</span>
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>({liveRating.count} Google Reviews)</span>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="lg:col-span-2 space-y-2.5">
              <h3 className="text-xs font-bold text-white">Clinic Pages</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    type="button"
                    onClick={() => navigateTo({ page: 'home' })}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigateTo({ page: 'about' })}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    About Prof. Dr. Sukhia
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigateTo({ page: 'reviews' })}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Verified Patient Reviews
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigateTo({ page: 'gallery' })}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Authentic Clinic Gallery
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigateTo({ page: 'faq' })}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Frequently Asked Questions
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigateTo({ page: 'contact' })}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Contact &amp; Directions
                  </button>
                </li>
              </ul>
            </div>

            {/* Confirmed Services */}
            <div className="lg:col-span-3 space-y-2.5">
              <h3 className="text-xs font-bold text-white">Confirmed Services</h3>
              <ul className="space-y-2">
                {SERVICES_DATA.map((service) => (
                  <li key={service.slug}>
                    <button
                      type="button"
                      onClick={() =>
                        navigateTo({ page: 'service', slug: service.slug })
                      }
                      className="hover:text-white transition-colors text-left cursor-pointer"
                    >
                      {service.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Hours */}
            <div className="lg:col-span-3 space-y-2.5">
              <h3 className="text-xs font-bold text-white">
                Location &amp; Verified Contact
              </h3>
              <p className="text-white/75 leading-relaxed">
                {CLINIC_INFO.address.fullFormatted}
              </p>
              <p className="font-mono-tabular text-white font-semibold">
                <a href={CLINIC_INFO.phoneTelHref} className="hover:underline">
                  {CLINIC_INFO.phoneInternational}
                </a>
              </p>
              <p className="text-white/70">
                Mon–Fri: 3:00 PM – 7:00 PM · Sat: 2:00 PM – 7:00 PM (Confirm Thursday by phone)
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={CLINIC_INFO.cidUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#EAF5F4] hover:underline inline-flex items-center gap-1"
                >
                  Google Maps Profile
                  <ExternalLink className="w-3 h-3" />
                </a>
                <span aria-hidden="true">·</span>
                <a
                  href={CLINIC_INFO.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#EAF5F4] hover:underline inline-flex items-center gap-1"
                >
                  Official Facebook
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-white/60">
            <p>
              © {new Date().getFullYear()} {CLINIC_INFO.name} ({CLINIC_INFO.signageName}). All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => navigateTo({ page: 'privacy' })}
                className="hover:text-white underline cursor-pointer"
              >
                Privacy Policy &amp; Verification Inventory
              </button>
              <span aria-hidden="true">·</span>
              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                XML Sitemap
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Discreet Mobile Bottom Action Bar (<= 52px height, well within 15% mobile sticky cap) */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-[#E4EAF0] px-3 py-2 flex items-center gap-2 shadow-sm">
        <a
          href={CLINIC_INFO.phoneTelHref}
          className="btn-animated-primary flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#16324F] text-white text-xs font-semibold whitespace-nowrap shrink-0"
        >
          <Phone className="w-3.5 h-3.5" />
          Call {CLINIC_INFO.phoneNational}
        </a>
        <a
          href={CLINIC_INFO.directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-[#E4EAF0] bg-[#F8FAFC] text-[#16324F] text-xs font-semibold whitespace-nowrap shrink-0"
        >
          <Navigation className="w-3.5 h-3.5 text-[#167D83]" />
          Directions
        </a>
        <button
          type="button"
          onClick={() => navigateTo({ page: 'contact' })}
          className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#EAF5F4] text-[#16324F] text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer"
        >
          <Calendar className="w-3.5 h-3.5 text-[#167D83]" />
          Enquire
        </button>
      </div>
    </div>
  );
}
