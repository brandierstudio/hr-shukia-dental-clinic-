import React, { useState } from 'react';
import { Check, ExternalLink, Search, Star } from 'lucide-react';
import { CLINIC_INFO, VERIFIED_GOOGLE_REVIEWS } from '../data/clinicData';
import { filterReviews } from '../utils/clinicLogic';

const REVIEW_THEMES = [
  'All',
  'Orthodontics & Braces',
  'Doctor Demeanor',
  'Affordability',
  'Waiting Time & Scheduling',
] as const;

const ReviewerAvatar: React.FC<{
  src: string;
  name: string;
  initials: string;
}> = ({ src, name, initials }) => {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative w-12 h-12 shrink-0">
      {!failed && src ? (
        <img
          src={src}
          alt={`${name} profile portrait`}
          loading="eager"
          onError={() => setFailed(true)}
          className="w-12 h-12 rounded-full object-cover object-center border-2 border-white shadow-md ring-2 ring-[#0D9488]/25"
        />
      ) : (
        <div
          aria-hidden="true"
          className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0D9488] to-[#0284C7] text-white flex items-center justify-center font-display font-bold text-xs border-2 border-white shadow-md"
        >
          {initials}
        </div>
      )}
      <span
        title="Verified Google Maps Reviewer"
        aria-hidden="true"
        className="absolute -bottom-0.5 -right-0.5 w-4.5 h-4.5 rounded-full bg-[#0D9488] border-2 border-white text-white flex items-center justify-center shadow-xs"
      >
        <Check className="w-2.5 h-2.5 stroke-[3]" />
      </span>
    </div>
  );
};

export const ReviewsSection: React.FC<{
  showAllControls?: boolean;
  onNavigateReviewsPage?: () => void;
}> = ({ showAllControls = false, onNavigateReviewsPage }) => {
  const [selectedTheme, setSelectedTheme] = useState<string>('All');
  const [ratingFilter, setRatingFilter] = useState<'all' | '5' | 'critical'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredReviews = filterReviews(
    VERIFIED_GOOGLE_REVIEWS,
    selectedTheme,
    ratingFilter,
    searchQuery
  );

  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
        <div className="max-w-2xl">
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#0D9488] font-bold uppercase tracking-wider">
            <span>Verified Google Feedback</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono-tabular inline-flex items-center gap-1">
              <span>{CLINIC_INFO.googleRating.score} / 5.0</span>
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>({CLINIC_INFO.googleRating.count} Reviews)</span>
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#0F293A] mt-1.5">
            Patient Reviews from Google Maps
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href={CLINIC_INFO.cidUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-animated-primary inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-white text-xs font-bold whitespace-nowrap shrink-0"
          >
            All {CLINIC_INFO.googleRating.count} Google Reviews
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          {onNavigateReviewsPage && (
            <button
              type="button"
              onClick={onNavigateReviewsPage}
              className="btn-liquid-secondary inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-[#0F293A] text-xs font-bold whitespace-nowrap shrink-0 cursor-pointer"
            >
              Full Review Analysis
            </button>
          )}
        </div>
      </div>

      {/* Liquid Glass Filter Controls */}
      <div className="liquid-glass-card rounded-2xl p-4 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div
          role="group"
          aria-label="Filter reviews by topic"
          className="flex flex-wrap items-center gap-1.5"
        >
          {REVIEW_THEMES.map((theme) => (
            <button
              key={theme}
              type="button"
              onClick={() => setSelectedTheme(theme)}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-full transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                selectedTheme === theme
                  ? 'btn-animated-primary text-white'
                  : 'bg-white/75 text-[#335268] hover:text-[#0F293A]'
              }`}
            >
              {theme}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div
            role="group"
            aria-label="Filter reviews by rating"
            className="flex flex-wrap items-center gap-1 p-1 bg-white/70 rounded-2xl sm:rounded-full border border-white max-w-full"
          >
            <button
              type="button"
              onClick={() => setRatingFilter('all')}
              className={`px-3 py-1 text-xs font-bold rounded-full transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                ratingFilter === 'all'
                  ? 'bg-[#CCFBF1] text-[#0F293A]'
                  : 'text-[#47657A] hover:text-[#0F293A]'
              }`}
            >
              All ({VERIFIED_GOOGLE_REVIEWS.length})
            </button>
            <button
              type="button"
              onClick={() => setRatingFilter('5')}
              className={`px-3 py-1 text-xs font-bold rounded-full transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                ratingFilter === '5'
                  ? 'bg-[#CCFBF1] text-[#0F293A]'
                  : 'text-[#47657A] hover:text-[#0F293A]'
              }`}
            >
              5-Star (4)
            </button>
            <button
              type="button"
              onClick={() => setRatingFilter('critical')}
              className={`px-3 py-1 text-xs font-bold rounded-full transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                ratingFilter === 'critical'
                  ? 'bg-[#CCFBF1] text-[#0F293A]'
                  : 'text-[#47657A] hover:text-[#0F293A]'
              }`}
            >
              Wait-Time (1)
            </button>
          </div>

          {showAllControls && (
            <div className="relative w-full sm:w-auto">
              <Search className="w-3.5 h-3.5 text-[#47657A] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="search"
                aria-label="Search review text or reviewer name"
                placeholder="Search reviews..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-auto pl-8 pr-3 py-1.5 text-xs rounded-full border border-white bg-white/80 focus:bg-white focus:border-[#0D9488] focus:outline-none"
              />
            </div>
          )}
        </div>
      </div>

      {/* Review Cards Grid */}
      {filteredReviews.length === 0 ? (
        <div className="liquid-glass-card rounded-2xl p-8 text-center">
          <p className="text-sm font-bold text-[#0F293A]">
            No verified reviews match the current filter criteria.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedTheme('All');
              setRatingFilter('all');
              setSearchQuery('');
            }}
            className="mt-3 btn-animated-primary px-5 py-2 rounded-full text-white text-xs font-bold cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          data-testid="verified-reviews-grid"
        >
          {filteredReviews.map((review) => (
            <article
              key={review.id}
              className="liquid-glass-card card-3d-hover rounded-3xl p-5 sm:p-6 flex flex-col justify-between overflow-hidden"
            >
              <div>
                <div className="flex flex-wrap items-start justify-between gap-3 pb-4 border-b border-teal-900/10">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <ReviewerAvatar
                      src={review.avatarUrl}
                      name={review.reviewerName}
                      initials={review.reviewerInitials}
                    />
                    <div className="min-w-0">
                      <h3 className="text-sm font-extrabold text-[#0F293A] truncate">
                        {review.reviewerName}
                      </h3>
                      <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#47657A] mt-0.5">
                        <span>{review.publishedLabel}</span>
                        <span aria-hidden="true">·</span>
                        <span>{review.source}</span>
                      </div>
                    </div>
                  </div>

                  <div
                    className="flex items-center gap-1 shrink-0"
                    aria-label={`Rated ${review.rating} out of 5 stars`}
                  >
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-200'
                        }`}
                      />
                    ))}
                    <span className="ml-1 text-xs font-mono-tabular font-bold text-[#0F293A]">
                      {review.rating}.0
                    </span>
                  </div>
                </div>

                <blockquote className="mt-4 text-sm text-[#1E3A4C] leading-relaxed whitespace-pre-line">
                  “{review.text}”
                </blockquote>
              </div>

              <div className="mt-5 pt-4 border-t border-teal-900/10 flex flex-wrap items-center justify-between gap-3 text-xs text-[#47657A]">
                <div className="flex flex-wrap items-center gap-1.5">
                  {review.themes.map((t, idx) => (
                    <React.Fragment key={t}>
                      {idx > 0 && <span aria-hidden="true">·</span>}
                      <span>{t}</span>
                    </React.Fragment>
                  ))}
                </div>

                <a
                  href={review.reviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#0D9488] hover:text-[#0284C7] inline-flex items-center gap-1 whitespace-nowrap shrink-0"
                >
                  Verify on Google Maps
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
