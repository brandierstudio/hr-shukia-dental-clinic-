import React, { useEffect, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Expand,
  ExternalLink,
  X,
  Camera,
} from 'lucide-react';
import { AUTHENTIC_GALLERY_ITEMS, GalleryItem } from '../data/clinicData';

const CATEGORIES = [
  'All',
  'Entrance & Signage',
  'Waiting Area & Reception',
  'Clinical Operatory',
  'Instruments & Sterilization',
] as const;

export const ResilientClinicImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
}> = ({ src, alt, className = '', loading = 'lazy' }) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`bg-gradient-to-br from-[#CCFBF1] to-[#E0F2FE] text-[#0F293A] flex flex-col items-center justify-center p-6 text-center ${className}`}
      >
        <Camera className="w-8 h-8 text-[#0D9488] mb-2" />
        <p className="text-xs font-medium max-w-xs leading-relaxed">{alt}</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={`clinic-photo-enhanced ${className}`}
    />
  );
};

/**
 * Dedicated full-portrait renderer for Prof. Dr. H.R. Sukhia's portrait
 * (/assets/clinic/dr-sukhia-portrait.jpg, 1376x3058).
 * Displays 100% of the vertical portrait (top to bottom of white lab coat, 0..2630px)
 * while clipping off the bottom black area (2630..3058px) with zero distortion.
 */
export const DrSukhiaPortrait: React.FC<{
  className?: string;
}> = ({ className = '' }) => {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl bg-[#E8F4F8] border border-white/90 shadow-lg ${className}`}
    >
      <img
        src="/assets/clinic/dr-sukhia-portrait-clean.png"
        alt="Prof. Dr. H.R. Sukhia — Principal Orthodontist & Dental Surgeon"
        loading="eager"
        className="w-full h-auto block hero-photo-vivid transition-transform duration-700 hover:scale-[1.02]"
      />
    </div>
  );
};

export const GalleryLightbox: React.FC<{ showHeader?: boolean }> = ({
  showHeader = true,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const filteredItems: GalleryItem[] =
    selectedCategory === 'All'
      ? AUTHENTIC_GALLERY_ITEMS
      : AUTHENTIC_GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  useEffect(() => {
    if (activeLightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveLightboxIndex(null);
      } else if (e.key === 'ArrowRight') {
        setActiveLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % filteredItems.length
        );
      } else if (e.key === 'ArrowLeft') {
        setActiveLightboxIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + filteredItems.length) % filteredItems.length
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex, filteredItems.length]);

  const activeItem =
    activeLightboxIndex !== null ? filteredItems[activeLightboxIndex] : null;

  return (
    <div>
      {showHeader && (
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div className="max-w-xl">
            <span className="text-xs text-[#0D9488] font-bold uppercase tracking-wider">
              Real Clinic Photography
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#0F293A] mt-1">
              Inside HR Sukhia Dental Clinic
            </h2>
          </div>

          <div
            role="group"
            aria-label="Filter clinic gallery by room"
            className="flex flex-wrap items-center gap-1.5 p-1.5 liquid-glass-pill rounded-full"
          >
            {CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setSelectedCategory(category);
                  setActiveLightboxIndex(null);
                }}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-full transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedCategory === category
                    ? 'btn-animated-primary text-white'
                    : 'text-[#335268] hover:text-[#0F293A]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}

      {!showHeader && (
        <div
          role="group"
          aria-label="Filter clinic gallery by room"
          className="flex flex-wrap items-center gap-1.5 p-1.5 liquid-glass-pill rounded-full mb-8 w-fit"
        >
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => {
                setSelectedCategory(category);
                setActiveLightboxIndex(null);
              }}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-full transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                selectedCategory === category
                  ? 'btn-animated-primary text-white'
                  : 'text-[#335268] hover:text-[#0F293A]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, idx) => (
          <article
            key={item.id}
            className="group liquid-glass-card card-3d-hover rounded-3xl overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="relative h-60 w-full overflow-hidden">
                <ResilientClinicImage
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover hero-photo-vivid transition-transform duration-500 group-hover:scale-105"
                />
                <button
                  type="button"
                  onClick={() => setActiveLightboxIndex(idx)}
                  aria-label={`Inspect full photograph: ${item.title}`}
                  className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full liquid-glass-pill text-[#0F293A] text-xs font-bold hover:scale-105 transition-transform cursor-pointer"
                >
                  <Expand className="w-3.5 h-3.5 text-[#0D9488]" />
                  Inspect
                </button>
              </div>
              <div className="p-5">
                <span className="text-xs text-[#0D9488] font-bold">
                  {item.category}
                </span>
                <h3 className="text-base font-extrabold text-[#0F293A] mt-1">
                  {item.title}
                </h3>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Accessible Lightbox Modal (Liquid Glass) */}
      {activeItem && activeLightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.title}
          data-testid="gallery-lightbox-modal"
          className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
          onClick={() => setActiveLightboxIndex(null)}
        >
          <div
            className="liquid-glass-panel rounded-3xl max-w-4xl w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-teal-900/10">
              <div className="min-w-0">
                <p className="text-xs text-[#0D9488] font-bold">
                  {activeItem.category} · Photo {activeLightboxIndex + 1} of {filteredItems.length}
                </p>
                <h3 className="text-base font-extrabold text-[#0F293A] truncate">
                  {activeItem.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveLightboxIndex(null)}
                aria-label="Close photo lightbox"
                className="p-2 rounded-full liquid-glass-pill text-[#0F293A] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative bg-white/60 flex items-center justify-center max-h-[65vh] overflow-hidden p-2">
              <ResilientClinicImage
                src={activeItem.src}
                alt={activeItem.alt}
                loading="eager"
                className="max-h-[62vh] w-auto object-contain mx-auto rounded-2xl hero-photo-vivid"
              />
              {filteredItems.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveLightboxIndex(
                        (activeLightboxIndex - 1 + filteredItems.length) %
                          filteredItems.length
                      )
                    }
                    aria-label="Previous clinic photograph"
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full liquid-glass-pill text-[#0F293A] cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveLightboxIndex(
                        (activeLightboxIndex + 1) % filteredItems.length
                      )
                    }
                    aria-label="Next clinic photograph"
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full liquid-glass-pill text-[#0F293A] cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-xs md:text-sm text-[#2C4A5E] leading-relaxed max-w-2xl">
                {activeItem.caption}
              </p>
              <a
                href={activeItem.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-liquid-secondary inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-[#0F293A] whitespace-nowrap shrink-0"
              >
                Original on Google Maps
                <ExternalLink className="w-3.5 h-3.5 text-[#0D9488]" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
