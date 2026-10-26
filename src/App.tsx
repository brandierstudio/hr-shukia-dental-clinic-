/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  Award,
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
import {
  ClinicBrandLogo,
  BrandierWebFooterBadge,
} from './components/ClinicBrandLogo';
import { ScrollReveal3D } from './components/ScrollReveal3D';
import {
  ResilientClinicImage,
  DrSukhiaPortrait,
  GalleryLightbox,
} from './components/GalleryLightbox';
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
    label: 'Operatory View',
    src: '/assets/clinic/treatment-operatory-wide.jpg',
    alt: 'Main clinical operatory at HR Sukhia Dental Clinic in Saddar, Karachi',
  },
  {
    id: 'lounge',
    label: 'Waiting Lounge',
    src: '/assets/clinic/waiting-lounge-chart.jpg',
    alt: 'Patient waiting lounge at HR Sukhia Dental Clinic',
  },
  {
    id: 'bay',
    label: 'Treatment Bay',
    src: '/assets/clinic/treatment-bay-window.jpg',
    alt: 'Bright dental treatment bay at HR Sukhia Dental Clinic',
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
    <div className="min-h-screen flex flex-col liquid-glass-canvas text-[#0F293A] pb-14 md:pb-0">
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

      {/* SECTION 1 — LUMINOUS LIQUID GLASS TOP BAR (No Dark Colors) */}
      <div className="hidden sm:block bg-white/75 backdrop-blur-md border-b border-white/90 text-xs text-[#335268]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 truncate">
            <MapPin className="w-3.5 h-3.5 text-[#0D9488] shrink-0" />
            <span className="font-semibold text-[#0F293A]">
              1st Floor, 101 Abdullah Haroon Road, Saddar, Karachi
            </span>
            <span aria-hidden="true" className="text-[#94A3B8]">
              ·
            </span>
            <span className="text-[#0D9488] font-medium">
              {clinicStatus.statusLabel}
            </span>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <span className="text-[#47657A] hidden lg:inline">
              Mon–Fri 3:00–7:00 PM · Sat 2:00–7:00 PM
            </span>
            <a
              href={CLINIC_INFO.phoneTelHref}
              className="font-mono-tabular font-bold text-[#0D9488] hover:text-[#0284C7] inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              {CLINIC_INFO.phoneInternational}
            </a>
          </div>
        </div>
      </div>

      {/* SECTION 2 — LIQUID GLASS NAVIGATION BAR WITH TRANSPARENT-BG LOGO */}
      <header className="sticky top-0 z-40 liquid-glass-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-17 flex items-center justify-between gap-6">
          {/* Zone 1: Redesigned Transparent-Background 3D Dental Logo */}
          <a
            href="/?page=home"
            onClick={(e) => {
              e.preventDefault();
              navigateTo({ page: 'home' });
            }}
            aria-label="HR Sukhia Dental Clinic — Home"
            className="shrink-0 bg-transparent"
          >
            <ClinicBrandLogo size="md" showSubtitle={false} />
          </a>

          {/* Zone 2: Clean Single-Line Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-6 text-sm font-semibold text-[#335268]"
          >
            {(
              [
                { label: 'Home', page: 'home' },
                { label: 'About Dentist', page: 'about' },
                { label: 'Services', page: 'services' },
                { label: 'Reviews', page: 'reviews' },
                { label: 'Gallery', page: 'gallery' },
                { label: 'Contact', page: 'contact' },
              ] as const
            ).map((item) => {
              const isActive =
                route.page === item.page ||
                (item.page === 'services' && route.page === 'service');
              return (
                <a
                  key={item.page}
                  href={`/?page=${item.page}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo({ page: item.page });
                  }}
                  className={`transition-all whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'text-[#0D9488] font-bold underline underline-offset-8 decoration-[#0D9488] decoration-2'
                      : 'hover:text-[#0D9488]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Animated Liquid Primary Button + Mobile Menu Button */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => navigateTo({ page: 'contact' })}
              className="btn-animated-primary group hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white rounded-full whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Book Appointment</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="md:hidden p-2 rounded-xl text-[#0F293A] liquid-glass-pill cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Accessible Collapsible Liquid Glass Drawer */}
        {mobileMenuOpen && (
          <div
            data-testid="mobile-nav-drawer"
            className="md:hidden liquid-glass-panel mx-3 my-2 rounded-2xl px-4 pt-3 pb-5 space-y-3"
          >
            <div className="pb-2 border-b border-teal-900/10 text-xs text-[#335268]">
              <ClinicBrandLogo size="sm" showSubtitle={true} />
            </div>
            <div className="grid grid-cols-2 gap-2">
              {(
                [
                  { label: 'Home', target: { page: 'home' } },
                  { label: 'About Dentist', target: { page: 'about' } },
                  { label: 'Services', target: { page: 'services' } },
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
                  className={`text-left px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                    route.page === item.target.page
                      ? 'bg-[#CCFBF1]/80 text-[#0F293A]'
                      : 'text-[#335268] hover:bg-white/70'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="pt-2 flex items-center gap-2">
              <a
                href={CLINIC_INFO.phoneTelHref}
                className="btn-animated-primary flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full text-white text-xs font-bold"
              >
                <Phone className="w-3.5 h-3.5" />
                Call {CLINIC_INFO.phoneNational}
              </a>
              <a
                href={CLINIC_INFO.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-liquid-secondary flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-full text-[#0F293A] text-xs font-bold"
              >
                <Navigation className="w-3.5 h-3.5 text-[#0D9488]" />
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
            {/* SECTION 3 — BRIGHT FULL-VISIBILITY HERO + LIQUID GLASS FLOATING ARCHITECTURE */}
            <section className="relative min-h-[620px] lg:min-h-[680px] flex items-center overflow-hidden border-b border-white/80">
              {/* 100% Bright, Full-Opacity, Unobstructed Main Background Photograph (ZERO dark/black overlay) */}
              <div className="absolute inset-0 z-0 overflow-hidden bg-[#E6F4F7]">
                <img
                  key={activeBackdrop.src}
                  src={activeBackdrop.src}
                  alt={activeBackdrop.alt}
                  loading="eager"
                  className="w-full h-full object-cover object-center animate-hero-backdrop hero-photo-vivid"
                />
                {/* Soft sunlit pearl mist ONLY at the very bottom edge to blend smoothly into the page */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#F2F9FB] to-transparent pointer-events-none" />
              </div>

              <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-18">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
                  {/* Left Floating Liquid Glass Hero Card (Concise, zero clutter) */}
                  <div className="lg:col-span-7">
                    <div className="liquid-glass-panel rounded-3xl p-7 sm:p-10 animate-fade-up">
                      <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wide uppercase text-[#0D9488]">
                        <Sparkles className="w-4 h-4" />
                        <span>Specialist Orthodontics · Saddar, Karachi</span>
                      </div>

                      <h1 className="animate-fade-up-d1 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F293A] tracking-tight mt-3 leading-[1.1]">
                        Thoughtful Dental Care.{' '}
                        <span className="hero-animated-accent block sm:inline">
                          Confident Smiles.
                        </span>
                      </h1>

                      <p className="animate-fade-up-d2 text-base md:text-lg text-[#2C4A5E] mt-4 leading-relaxed">
                        Precision fixed braces, bite alignment, and modern family dentistry led by{' '}
                        <strong className="text-[#0F293A] font-bold">
                          Prof. Dr. H.R. Sukhia
                        </strong>{' '}
                        (FDSRCPS Glasgow, FFD Orth RCSI, MOrth RCS Edinburgh).
                      </p>

                      {/* Animated Liquid Buttons */}
                      <div className="animate-fade-up-d3 mt-7 flex flex-wrap items-center gap-3.5">
                        <button
                          type="button"
                          onClick={() => navigateTo({ page: 'contact' })}
                          className="btn-animated-primary group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-white text-sm font-bold whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          <Calendar className="w-4 h-4" />
                          <span>Book Appointment</span>
                          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => navigateTo({ page: 'services' })}
                          className="btn-liquid-secondary group inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-[#0F293A] text-sm font-bold whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          <span>Explore Services</span>
                          <ArrowRight className="w-4 h-4 text-[#0D9488] transition-transform duration-300 group-hover:translate-x-1" />
                        </button>

                        <a
                          href={CLINIC_INFO.phoneTelHref}
                          className="btn-liquid-secondary inline-flex items-center gap-2 px-5 py-3.5 rounded-full text-sm font-mono-tabular font-bold text-[#0D9488] hover:text-[#0284C7] whitespace-nowrap shrink-0"
                        >
                          <Phone className="w-4 h-4" />
                          {CLINIC_INFO.phoneNational}
                        </a>
                      </div>

                      {/* Clean Rating & Address Strip */}
                      <div className="mt-7 pt-5 border-t border-teal-900/10 flex flex-wrap items-center justify-between gap-4 text-xs text-[#335268]">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center text-amber-500">
                            {Array.from({ length: 5 }).map((_, idx) => (
                              <Star key={idx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                            ))}
                          </div>
                          <span className="font-mono-tabular font-bold text-[#0F293A]">
                            {liveRating.score} / 5.0
                          </span>
                          <button
                            type="button"
                            onClick={() => navigateTo({ page: 'reviews' })}
                            className="font-semibold text-[#0D9488] underline hover:text-[#0284C7] cursor-pointer"
                          >
                            ({liveRating.count} Google Reviews)
                          </button>
                        </div>

                        <div className="flex items-center gap-1.5 font-semibold text-[#0F293A]">
                          <MapPin className="w-3.5 h-3.5 text-[#0D9488]" />
                          <span>101 Abdullah Haroon Rd, Saddar</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Side: Open & Unobstructed View of the Full-Bleed Photo + Floating Liquid Glass Scene Switcher */}
                  <div className="lg:col-span-5 flex flex-col items-start lg:items-end justify-end gap-4">
                    <div className="liquid-glass-pill rounded-2xl p-2 flex flex-wrap items-center gap-1.5">
                      <span className="px-2.5 py-1 text-[11px] font-bold text-[#0F293A] inline-flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-[#0D9488]" />
                        <span>Clinic View:</span>
                      </span>
                      {HERO_BACKDROPS.map((item, idx) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setHeroBackdropIndex(idx)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                            heroBackdropIndex === idx
                              ? 'btn-animated-primary text-white shadow-xs'
                              : 'text-[#335268] hover:bg-white/80 hover:text-[#0F293A]'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 4 — 3D LIQUID GLASS TRUST HIGHLIGHTS */}
            <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 perspective-stage">
              <ScrollReveal3D>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  <div className="liquid-glass-card card-3d-hover rounded-2xl p-5">
                    <p className="text-xs font-semibold text-[#0D9488]">
                      Verified Patient Rating
                    </p>
                    <p className="text-2xl font-extrabold font-mono-tabular text-[#0F293A] mt-1 inline-flex items-center gap-1.5">
                      <span>{liveRating.score}</span>
                      <Star className="w-5 h-5 fill-amber-400 text-amber-400 shrink-0" />
                      <span className="text-sm font-semibold text-[#47657A]">
                        ({liveRating.count} Reviews)
                      </span>
                    </p>
                  </div>

                  <div className="liquid-glass-card card-3d-hover rounded-2xl p-5">
                    <p className="text-xs font-semibold text-[#0D9488]">
                      Royal College Fellowships
                    </p>
                    <p className="text-lg font-extrabold text-[#0F293A] mt-1">
                      FDSRCPS · FFD Orth · MOrth
                    </p>
                  </div>

                  <div className="liquid-glass-card card-3d-hover rounded-2xl p-5">
                    <p className="text-xs font-semibold text-[#0D9488]">
                      Academic Leadership
                    </p>
                    <p className="text-lg font-extrabold text-[#0F293A] mt-1">
                      Professor of Orthodontics
                    </p>
                  </div>

                  <div className="liquid-glass-card card-3d-hover rounded-2xl p-5">
                    <p className="text-xs font-semibold text-[#0D9488]">
                      Central Karachi Clinic
                    </p>
                    <p className="text-lg font-extrabold text-[#0F293A] mt-1">
                      101 Abdullah Haroon Rd
                    </p>
                  </div>
                </div>
              </ScrollReveal3D>
            </section>

            {/* SECTION 5 — INTRODUCING THE CLINIC (3D Scroll Animation + Clean Copy) */}
            <section className="py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 perspective-stage">
              <ScrollReveal3D tiltDirection="left">
                <div className="liquid-glass-panel rounded-3xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-5">
                    <div className="rounded-2xl overflow-hidden border border-white shadow-md h-72 sm:h-80">
                      <ResilientClinicImage
                        src="/assets/clinic/entrance-signage.jpg"
                        alt="Dr. H.R. Sukhia Dental Surgery & Orthodontics entrance at 101 Abdullah Haroon Road"
                        className="w-full h-full object-cover hero-photo-vivid transition-transform duration-700 hover:scale-105"
                      />
                    </div>
                  </div>

                  <div className="lg:col-span-7 space-y-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#0D9488]">
                      Established Saddar Practice
                    </span>

                    <h2 className="text-2xl md:text-3xl font-extrabold text-[#0F293A]">
                      Specialist Orthodontic &amp; Dental Care in Central Karachi
                    </h2>

                    <p className="text-sm md:text-base text-[#2C4A5E] leading-relaxed">
                      Every consultation and braces treatment plan at{' '}
                      <strong className="text-[#0F293A]">
                        Dr. H.R. Sukhia Dental Surgery &amp; Orthodontics
                      </strong>{' '}
                      is personally supervised by Prof. Dr. H.R. Sukhia in an air-conditioned clinical setting with transparent, reasonable fees.
                    </p>

                    <div className="pt-3 flex flex-wrap items-center gap-3.5">
                      <button
                        type="button"
                        onClick={() => navigateTo({ page: 'about' })}
                        className="btn-animated-primary group inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-xs font-bold cursor-pointer"
                      >
                        <span>Meet Prof. Dr. Sukhia</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </button>
                      <button
                        type="button"
                        onClick={() => navigateTo({ page: 'gallery' })}
                        className="btn-liquid-secondary inline-flex items-center gap-2 px-5 py-3 rounded-full text-[#0F293A] text-xs font-bold cursor-pointer"
                      >
                        View Clinic Photos
                      </button>
                    </div>
                  </div>
                </div>
              </ScrollReveal3D>
            </section>

            {/* SECTION 6 — DENTAL SERVICES (3D Tilt Liquid Glass Bento Cards) */}
            <section className="py-12 md:py-18 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 perspective-stage">
              <ScrollReveal3D>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#0D9488]">
                      Clinical Specialties
                    </span>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-[#0F293A] mt-1">
                      Orthodontics &amp; General Dentistry
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={() => navigateTo({ page: 'services' })}
                    className="btn-liquid-secondary group inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[#0F293A] text-xs font-bold whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>All Dental Services</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#0D9488] transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </ScrollReveal3D>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {SERVICES_DATA.map((service, index) => (
                  <ScrollReveal3D
                    key={service.slug}
                    delayMs={index * 60}
                    tiltDirection={index % 2 === 0 ? 'up' : 'right'}
                    className={index === 0 ? 'md:col-span-2 lg:col-span-2' : ''}
                  >
                    <article className="liquid-glass-card card-3d-hover h-full rounded-3xl overflow-hidden flex flex-col justify-between group">
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
                            className="w-full h-full object-cover hero-photo-vivid transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>

                        <div
                          className={
                            index === 0
                              ? 'lg:col-span-6 p-6 md:p-8 flex flex-col justify-between'
                              : 'p-6 flex flex-col justify-between'
                          }
                        >
                          <div>
                            <span className="text-xs font-mono-tabular font-bold text-[#0D9488]">
                              {service.number} · {service.category}
                            </span>
                            <h3 className="text-lg md:text-xl font-extrabold text-[#0F293A] mt-1.5">
                              {service.title}
                            </h3>
                            <p className="text-xs md:text-sm text-[#335268] mt-2 leading-relaxed line-clamp-3">
                              {service.summary}
                            </p>
                          </div>

                          <div className="mt-5 pt-4 border-t border-teal-900/10 flex items-center justify-between gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                navigateTo({ page: 'service', slug: service.slug })
                              }
                              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0D9488] hover:text-[#0284C7] transition-colors cursor-pointer"
                            >
                              <span>Explore {service.shortTitle}</span>
                              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                            </button>
                            <button
                              type="button"
                              onClick={() => navigateTo({ page: 'contact' })}
                              className="text-xs font-bold text-[#0F293A] hover:text-[#0D9488] cursor-pointer"
                            >
                              Book →
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  </ScrollReveal3D>
                ))}
              </div>
            </section>

            {/* SECTION 7 — THE DENTIST (3D Scroll Reveal + Full Portrait Without Bottom Black Area) */}
            <section className="py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 perspective-stage">
              <ScrollReveal3D tiltDirection="right">
                <div className="liquid-glass-panel rounded-3xl p-6 sm:p-10">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                    {/* Left Column: Full Vertical Portrait of Dr. Sahib (0% bottom black bar) */}
                    <div className="lg:col-span-5 flex flex-col items-center">
                      <DrSukhiaPortrait className="max-w-[330px] sm:max-w-[360px]" />
                    </div>

                    {/* Right Column: About Dr. Sahib & Academic Credentials */}
                    <div className="lg:col-span-7 flex flex-col justify-between">
                      <div>
                        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0D9488]">
                          <Award className="w-4 h-4" />
                          <span>Principal Orthodontist &amp; Dean</span>
                        </div>

                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F293A] mt-2">
                          {DENTIST_PROFILE.fullName}
                        </h2>
                        <p className="text-xs md:text-sm font-mono-tabular font-bold text-[#0D9488] mt-1.5">
                          {DENTIST_PROFILE.qualificationsString}
                        </p>

                        <p className="text-sm md:text-base text-[#2C4A5E] mt-4 leading-relaxed">
                          {DENTIST_PROFILE.shortBio}
                        </p>

                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          {DENTIST_PROFILE.academicAndLeadershipRoles
                            .slice(0, 4)
                            .map((role) => (
                              <div
                                key={role.role}
                                className="p-4 rounded-2xl liquid-glass-card card-3d-hover"
                              >
                                <p className="text-xs font-extrabold text-[#0F293A]">
                                  {role.role}
                                </p>
                                <p className="text-xs text-[#47657A] mt-1 leading-snug">
                                  {role.organization}
                                </p>
                              </div>
                            ))}
                        </div>
                      </div>

                      <div className="mt-7 pt-5 border-t border-teal-900/10 flex flex-wrap items-center gap-3.5">
                        <button
                          type="button"
                          onClick={() => navigateTo({ page: 'about' })}
                          className="btn-animated-primary group inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-xs font-bold cursor-pointer"
                        >
                          <span>Full Academic Profile</span>
                          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </button>
                        <button
                          type="button"
                          onClick={() => navigateTo({ page: 'contact' })}
                          className="btn-liquid-secondary inline-flex items-center gap-2 px-6 py-3 rounded-full text-[#0F293A] text-xs font-bold cursor-pointer"
                        >
                          Book Consultation
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal3D>
            </section>

            {/* SECTION 8 — WHY PATIENTS CHOOSE THE CLINIC */}
            <section className="py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 perspective-stage">
              <ScrollReveal3D>
                <div className="max-w-2xl mb-8">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0D9488]">
                    Patient Experience
                  </span>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-[#0F293A] mt-1">
                    Why Patients Choose HR Sukhia Dental Clinic
                  </h2>
                </div>
              </ScrollReveal3D>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {PATIENT_CHOICE_THEMES.map((item, idx) => (
                  <ScrollReveal3D key={item.number} delayMs={idx * 70}>
                    <div className="liquid-glass-card card-3d-hover h-full rounded-2xl p-6 flex flex-col justify-between">
                      <div>
                        <span className="text-xs font-mono-tabular font-bold text-[#0D9488]">
                          {item.number}
                        </span>
                        <h3 className="text-base font-extrabold text-[#0F293A] mt-2">
                          {item.title}
                        </h3>
                        <p className="text-xs md:text-sm text-[#335268] mt-2 leading-relaxed">
                          {item.summary}
                        </p>
                      </div>
                    </div>
                  </ScrollReveal3D>
                ))}
              </div>
            </section>

            {/* SECTION 9 — REAL PATIENT REVIEWS */}
            <section className="py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 perspective-stage">
              <ScrollReveal3D>
                <ReviewsSection
                  showAllControls={false}
                  onNavigateReviewsPage={() => navigateTo({ page: 'reviews' })}
                />
              </ScrollReveal3D>
            </section>

            {/* SECTION 10 — REAL CLINIC GALLERY */}
            <section className="py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 perspective-stage">
              <ScrollReveal3D>
                <div className="liquid-glass-panel rounded-3xl p-6 sm:p-10">
                  <GalleryLightbox showHeader={true} />
                </div>
              </ScrollReveal3D>
            </section>

            {/* SECTION 12 — LOCATION, DIRECTIONS & APPOINTMENT ENQUIRY */}
            <section
              id="location-and-appointment"
              className="py-12 md:py-18 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 perspective-stage"
            >
              <ScrollReveal3D>
                <div className="liquid-glass-panel rounded-3xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-5 space-y-5">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#0D9488]">
                        Saddar, Karachi
                      </span>
                      <h2 className="text-2xl md:text-3xl font-extrabold text-[#0F293A] mt-1">
                        Visit Us on Abdullah Haroon Road
                      </h2>
                    </div>

                    <div className="p-5 rounded-2xl liquid-glass-card space-y-4">
                      <div>
                        <p className="text-xs font-bold text-[#0D9488]">Address</p>
                        <p className="text-sm font-bold text-[#0F293A] mt-0.5">
                          {CLINIC_INFO.address.fullFormatted}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-bold text-[#0D9488]">
                          Telephone
                        </p>
                        <a
                          href={CLINIC_INFO.phoneTelHref}
                          className="text-lg font-extrabold font-mono-tabular text-[#0F293A] hover:text-[#0D9488] block mt-0.5"
                        >
                          {CLINIC_INFO.phoneInternational}
                        </a>
                      </div>

                      <div className="pt-2 border-t border-teal-900/10">
                        <p className="text-xs font-bold text-[#0F293A] mb-2">
                          Clinic Hours
                        </p>
                        <div className="space-y-1.5 text-xs">
                          <div className="flex justify-between">
                            <span className="text-[#335268]">Mon – Wed, Fri</span>
                            <span className="font-mono-tabular font-semibold text-[#0F293A]">
                              3:00 PM – 7:00 PM
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#335268]">Saturday</span>
                            <span className="font-mono-tabular font-semibold text-[#0F293A]">
                              2:00 PM – 7:00 PM
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#335268]">Thursday</span>
                            <span className="font-mono-tabular font-semibold text-[#0D9488]">
                              Call 0333 3770353
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-2 flex flex-wrap gap-3">
                        <a
                          href={CLINIC_INFO.directionsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-animated-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-xs font-bold whitespace-nowrap shrink-0"
                        >
                          <Navigation className="w-3.5 h-3.5" />
                          Get Directions
                        </a>
                        <a
                          href={CLINIC_INFO.phoneTelHref}
                          className="btn-liquid-secondary inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[#0F293A] text-xs font-bold whitespace-nowrap shrink-0"
                        >
                          <Phone className="w-3.5 h-3.5 text-[#0D9488]" />
                          Call {CLINIC_INFO.phoneNational}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-7">
                    <ClinicMap heightClass="h-[420px]" />
                  </div>
                </div>
              </ScrollReveal3D>

              <ScrollReveal3D>
                <AppointmentEnquiryForm />
              </ScrollReveal3D>
            </section>

            {/* SECTION 13 — FREQUENTLY ASKED QUESTIONS */}
            <section className="py-12 md:py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 perspective-stage">
              <ScrollReveal3D>
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#0D9488]">
                      Common Questions
                    </span>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-[#0F293A] mt-1">
                      Frequently Asked Questions
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigateTo({ page: 'faq' })}
                    className="group text-xs font-bold text-[#0D9488] hover:text-[#0284C7] inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Open Full FAQ Page</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>

                <FAQAccordion />
              </ScrollReveal3D>
            </section>

            {/* SECTION 14 — LUMINOUS LIQUID GLASS APPOINTMENT CTA (No Dark Colors) */}
            <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 perspective-stage">
              <ScrollReveal3D>
                <div className="liquid-glass-panel rounded-3xl p-8 md:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                  <div className="max-w-2xl">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#0D9488]">
                      Dr. H.R. Sukhia Dental Surgery &amp; Orthodontics
                    </span>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-[#0F293A] mt-2">
                      Ready to Arrange Your Orthodontic or Dental Visit?
                    </h2>
                    <p className="text-sm md:text-base text-[#335268] mt-2 leading-relaxed">
                      Call the clinic directly during afternoon hours or book your appointment enquiry at 101 Abdullah Haroon Road, Saddar.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3.5 shrink-0">
                    <a
                      href={CLINIC_INFO.phoneTelHref}
                      className="btn-animated-primary inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-white text-sm font-bold whitespace-nowrap shrink-0"
                    >
                      <Phone className="w-4 h-4" />
                      Call {CLINIC_INFO.phoneNational}
                    </a>
                    <a
                      href={CLINIC_INFO.directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-liquid-secondary inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-[#0F293A] text-sm font-bold whitespace-nowrap shrink-0"
                    >
                      <Navigation className="w-4 h-4 text-[#0D9488]" />
                      Get Directions
                    </a>
                  </div>
                </div>
              </ScrollReveal3D>
            </section>
          </div>
        )}
      </main>

      {/* SECTION 15 — BRIGHT LIQUID GLASS FOOTER WITH BRANDIER WEB ATTRIBUTION */}
      <footer className="mt-10 liquid-glass-nav border-t border-white text-[#335268] text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-8 border-b border-teal-900/10">
            {/* Brand & Verified Description */}
            <div className="lg:col-span-4 space-y-3">
              <ClinicBrandLogo size="md" showSubtitle={true} />
              <p className="text-[#47657A] leading-relaxed pt-1">
                Specialist orthodontic and dental clinic in Saddar, Karachi, led by Prof. Dr. Hoshang Rumi Sukhia (BDS, MS, FDSRCPS, FFD Orth RCSI, MOrth RCS Ed).
              </p>
              <div className="pt-1 flex items-center gap-1.5 text-[#0F293A] font-mono-tabular font-bold">
                <span>{liveRating.score}</span>
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>({liveRating.count} Google Reviews)</span>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="lg:col-span-2 space-y-2.5">
              <h3 className="text-xs font-extrabold text-[#0F293A]">Clinic Pages</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    type="button"
                    onClick={() => navigateTo({ page: 'home' })}
                    className="hover:text-[#0D9488] transition-colors cursor-pointer"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigateTo({ page: 'about' })}
                    className="hover:text-[#0D9488] transition-colors cursor-pointer"
                  >
                    About Prof. Dr. Sukhia
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigateTo({ page: 'reviews' })}
                    className="hover:text-[#0D9488] transition-colors cursor-pointer"
                  >
                    Verified Patient Reviews
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigateTo({ page: 'gallery' })}
                    className="hover:text-[#0D9488] transition-colors cursor-pointer"
                  >
                    Clinic Gallery
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigateTo({ page: 'faq' })}
                    className="hover:text-[#0D9488] transition-colors cursor-pointer"
                  >
                    FAQ
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigateTo({ page: 'contact' })}
                    className="hover:text-[#0D9488] transition-colors cursor-pointer"
                  >
                    Contact &amp; Directions
                  </button>
                </li>
              </ul>
            </div>

            {/* Confirmed Services */}
            <div className="lg:col-span-3 space-y-2.5">
              <h3 className="text-xs font-extrabold text-[#0F293A]">Dental Services</h3>
              <ul className="space-y-2">
                {SERVICES_DATA.map((service) => (
                  <li key={service.slug}>
                    <button
                      type="button"
                      onClick={() =>
                        navigateTo({ page: 'service', slug: service.slug })
                      }
                      className="hover:text-[#0D9488] transition-colors text-left cursor-pointer"
                    >
                      {service.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Hours */}
            <div className="lg:col-span-3 space-y-2.5">
              <h3 className="text-xs font-extrabold text-[#0F293A]">
                Location &amp; Contact
              </h3>
              <p className="text-[#335268] leading-relaxed">
                {CLINIC_INFO.address.fullFormatted}
              </p>
              <p className="font-mono-tabular text-[#0D9488] font-bold">
                <a href={CLINIC_INFO.phoneTelHref} className="hover:underline">
                  {CLINIC_INFO.phoneInternational}
                </a>
              </p>
              <p className="text-[#47657A]">
                Mon–Fri: 3:00 PM – 7:00 PM · Sat: 2:00 PM – 7:00 PM
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={CLINIC_INFO.cidUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0D9488] font-semibold hover:underline inline-flex items-center gap-1"
                >
                  Google Maps
                  <ExternalLink className="w-3 h-3" />
                </a>
                <span aria-hidden="true">·</span>
                <a
                  href={CLINIC_INFO.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0D9488] font-semibold hover:underline inline-flex items-center gap-1"
                >
                  Facebook
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Attribution Row with Brandier Web Logo & Link */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[#47657A]">
            <div className="flex flex-wrap items-center gap-3">
              <p>
                © {new Date().getFullYear()} {CLINIC_INFO.name}. All rights reserved.
              </p>
              <span aria-hidden="true">·</span>
              <button
                type="button"
                onClick={() => navigateTo({ page: 'privacy' })}
                className="hover:text-[#0D9488] underline cursor-pointer"
              >
                Privacy Policy
              </button>
            </div>

            {/* Powered by Brandier Web (links to https://web.brandierstudio.online) */}
            <BrandierWebFooterBadge />
          </div>
        </div>
      </footer>

      {/* Discreet Mobile Liquid Glass Bottom Action Bar */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 liquid-glass-nav px-3 py-2 flex items-center gap-2">
        <a
          href={CLINIC_INFO.phoneTelHref}
          className="btn-animated-primary flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-full text-white text-xs font-bold whitespace-nowrap shrink-0"
        >
          <Phone className="w-3.5 h-3.5" />
          Call {CLINIC_INFO.phoneNational}
        </a>
        <a
          href={CLINIC_INFO.directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-liquid-secondary inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-full text-[#0F293A] text-xs font-bold whitespace-nowrap shrink-0"
        >
          <Navigation className="w-3.5 h-3.5 text-[#0D9488]" />
          Directions
        </a>
        <button
          type="button"
          onClick={() => navigateTo({ page: 'contact' })}
          className="btn-liquid-secondary inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-full text-[#0F293A] text-xs font-bold whitespace-nowrap shrink-0 cursor-pointer"
        >
          <Calendar className="w-3.5 h-3.5 text-[#0D9488]" />
          Book
        </button>
      </div>
    </div>
  );
}
