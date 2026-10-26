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
        className={`bg-gradient-to-br from-[#16324F] to-[#167D83] text-white flex flex-col items-center justify-center p-6 text-center ${className}`}
      >
        <Camera className="w-8 h-8 opacity-80 mb-2" />
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
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs text-[#167D83] font-semibold">
              <span>Authentic Clinic Photography</span>
              <span aria-hidden="true">·</span>
              <span>101 Abdullah Haroon Road, Saddar</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#16324F] mt-2">
              Inside HR Sukhia Dental Clinic
            </h2>
            <p className="text-sm md:text-base text-[#667582] mt-2 leading-relaxed">
              Every photograph below is an authentic image of the actual clinic in Saddar, Karachi—including the original brushed-metal entrance signage, the air-conditioned waiting area with its Orthodontics Problem Identification Chart, and the clinical operatories.
            </p>
          </div>

          <div
            role="group"
            aria-label="Filter clinic gallery by room"
            className="flex flex-wrap items-center gap-1.5 p-1 bg-[#EAF5F4] rounded-lg border border-[#E4EAF0]"
          >
            {CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setSelectedCategory(category);
                  setActiveLightboxIndex(null);
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedCategory === category
                    ? 'bg-[#16324F] text-white shadow-2xs'
                    : 'text-[#172B3A] hover:text-[#167D83]'
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
          className="flex flex-wrap items-center gap-1.5 p-1 bg-[#EAF5F4] rounded-lg border border-[#E4EAF0] mb-8 w-fit"
        >
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => {
                setSelectedCategory(category);
                setActiveLightboxIndex(null);
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                selectedCategory === category
                  ? 'bg-[#16324F] text-white shadow-2xs'
                  : 'text-[#172B3A] hover:text-[#167D83]'
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
            className="group bg-white rounded-xl border border-[#E4EAF0] overflow-hidden flex flex-col justify-between transition-colors hover:border-[#167D83]/50"
          >
            <div>
              <div className="relative h-64 w-full overflow-hidden bg-[#16324F]/5">
                <ResilientClinicImage
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
                <button
                  type="button"
                  onClick={() => setActiveLightboxIndex(idx)}
                  aria-label={`Inspect full photograph: ${item.title}`}
                  className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#16324F]/90 text-white text-xs font-medium hover:bg-[#167D83] transition-colors cursor-pointer"
                >
                  <Expand className="w-3.5 h-3.5" />
                  Inspect Photo
                </button>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 text-xs text-[#667582]">
                  <span className="text-[#167D83] font-medium">{item.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>Authentic Clinic Asset</span>
                </div>
                <h3 className="text-base font-bold text-[#16324F] mt-1.5">
                  {item.title}
                </h3>
                <p className="text-xs text-[#667582] mt-2 leading-relaxed">
                  {item.caption}
                </p>
              </div>
            </div>

            <div className="px-5 py-3 bg-[#F8FAFC] border-t border-[#E4EAF0] flex items-center justify-between gap-2 text-xs text-[#667582]">
              <span className="truncate">{item.attribution}</span>
              <a
                href={item.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#167D83] font-medium hover:underline inline-flex items-center gap-1 shrink-0"
              >
                Source
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </article>
        ))}
      </div>

      {/* Accessible Lightbox Modal */}
      {activeItem && activeLightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.title}
          data-testid="gallery-lightbox-modal"
          className="fixed inset-0 z-50 bg-[#16324F]/90 backdrop-blur-xs flex items-center justify-center p-4 md:p-8"
          onClick={() => setActiveLightboxIndex(null)}
        >
          <div
            className="bg-white rounded-xl max-w-4xl w-full overflow-hidden border border-[#E4EAF0] shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 px-5 py-3.5 border-b border-[#E4EAF0]">
              <div className="min-w-0">
                <p className="text-xs text-[#167D83] font-semibold">
                  {activeItem.category} · Photo {activeLightboxIndex + 1} of {filteredItems.length}
                </p>
                <h3 className="text-base font-bold text-[#16324F] truncate">
                  {activeItem.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveLightboxIndex(null)}
                aria-label="Close photo lightbox"
                className="p-2 rounded-lg text-[#667582] hover:text-[#16324F] hover:bg-[#F8FAFC] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative bg-[#0F2338] flex items-center justify-center max-h-[65vh] overflow-hidden">
              <ResilientClinicImage
                src={activeItem.src}
                alt={activeItem.alt}
                loading="eager"
                className="max-h-[65vh] w-auto object-contain mx-auto"
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
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/90 text-[#16324F] hover:bg-white transition-colors cursor-pointer"
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
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/90 text-[#16324F] hover:bg-white transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            <div className="p-5 bg-[#F8FAFC] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-xs md:text-sm text-[#172B3A] leading-relaxed max-w-2xl">
                {activeItem.caption}
              </p>
              <a
                href={activeItem.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-[#E4EAF0] bg-white text-xs font-semibold text-[#16324F] hover:border-[#167D83] transition-colors whitespace-nowrap shrink-0"
              >
                View Original on Google Maps
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
