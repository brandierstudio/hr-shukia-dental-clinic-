import React, { useState } from 'react';
import { ExternalLink, Search, Star } from 'lucide-react';
import { CLINIC_INFO, VERIFIED_GOOGLE_REVIEWS } from '../data/clinicData';
import { filterReviews } from '../utils/clinicLogic';

const REVIEW_THEMES = [
  'All',
  'Orthodontics & Braces',
  'Doctor Demeanor',
  'Affordability',
  'Waiting Time & Scheduling',
] as const;

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
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#167D83] font-semibold">
            <span>Verified Google Business Profile Feedback</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono-tabular inline-flex items-center gap-1">
              <span>{CLINIC_INFO.googleRating.score} / 5.0</span>
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>({CLINIC_INFO.googleRating.count} Google Reviews)</span>
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#16324F] mt-2">
            Verbatim Patient Reviews from Google Maps
          </h2>
          <p className="text-sm md:text-base text-[#667582] mt-2 leading-relaxed">
            Below are unedited, attributable Google Maps reviews for HR Sukhia Dental Clinic—covering both 5-star orthodontic outcomes and candid patient feedback regarding peak waiting times and appointment scheduling.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <a
            href={CLINIC_INFO.cidUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#16324F] text-white text-xs font-semibold hover:bg-[#167D83] transition-colors whitespace-nowrap shrink-0"
          >
            Read All {CLINIC_INFO.googleRating.count} Google Reviews
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          {onNavigateReviewsPage && (
            <button
              type="button"
              onClick={onNavigateReviewsPage}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#E4EAF0] bg-white text-[#16324F] text-xs font-semibold hover:border-[#167D83] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Open Full Review Analysis
            </button>
          )}
        </div>
      </div>

      {/* Filter Controls */}
      <div className="bg-white rounded-xl border border-[#E4EAF0] p-4 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
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
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                selectedTheme === theme
                  ? 'bg-[#16324F] text-white'
                  : 'bg-[#F8FAFC] text-[#667582] hover:text-[#172B3A]'
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
            className="flex items-center gap-1 p-1 bg-[#F8FAFC] rounded-lg border border-[#E4EAF0]"
          >
            <button
              type="button"
              onClick={() => setRatingFilter('all')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                ratingFilter === 'all'
                  ? 'bg-white text-[#16324F] shadow-2xs'
                  : 'text-[#667582] hover:text-[#172B3A]'
              }`}
            >
              All ({VERIFIED_GOOGLE_REVIEWS.length})
            </button>
            <button
              type="button"
              onClick={() => setRatingFilter('5')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                ratingFilter === '5'
                  ? 'bg-white text-[#16324F] shadow-2xs'
                  : 'text-[#667582] hover:text-[#172B3A]'
              }`}
            >
              5-Star (4)
            </button>
            <button
              type="button"
              onClick={() => setRatingFilter('critical')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                ratingFilter === 'critical'
                  ? 'bg-white text-[#16324F] shadow-2xs'
                  : 'text-[#667582] hover:text-[#172B3A]'
              }`}
            >
              Wait-Time / Critical (1)
            </button>
          </div>

          {showAllControls && (
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#667582] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="search"
                aria-label="Search review text or reviewer name"
                placeholder="Search reviews (e.g. braces, wait)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-[#E4EAF0] bg-[#F8FAFC] focus:bg-white focus:border-[#167D83] focus:outline-none"
              />
            </div>
          )}
        </div>
      </div>

      {/* Review Cards Grid */}
      {filteredReviews.length === 0 ? (
        <div className="bg-white rounded-xl border border-[#E4EAF0] p-8 text-center">
          <p className="text-sm font-medium text-[#16324F]">
            No verified reviews match the current filter criteria.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedTheme('All');
              setRatingFilter('all');
              setSearchQuery('');
            }}
            className="mt-3 px-4 py-2 rounded-lg bg-[#EAF5F4] text-[#16324F] text-xs font-semibold hover:bg-[#167D83] hover:text-white transition-colors cursor-pointer"
          >
            Reset Review Filters
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
              className="bg-white rounded-xl border border-[#E4EAF0] p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#E4EAF0]">
                  <div className="flex items-center gap-3">
                    <div
                      aria-hidden="true"
                      className="w-10 h-10 rounded-full bg-[#16324F] text-white flex items-center justify-center font-display font-bold text-xs shrink-0"
                    >
                      {review.reviewerInitials}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#16324F]">
                        {review.reviewerName}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-[#667582] mt-0.5">
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
                            : 'text-[#E4EAF0]'
                        }`}
                      />
                    ))}
                    <span className="ml-1 text-xs font-mono-tabular font-semibold text-[#172B3A]">
                      {review.rating}.0
                    </span>
                  </div>
                </div>

                <blockquote className="mt-4 text-sm text-[#172B3A] leading-relaxed whitespace-pre-line">
                  “{review.text}”
                </blockquote>
              </div>

              <div className="mt-5 pt-4 border-t border-[#E4EAF0] flex flex-wrap items-center justify-between gap-3 text-xs text-[#667582]">
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
                  className="font-semibold text-[#167D83] hover:text-[#16324F] inline-flex items-center gap-1 whitespace-nowrap shrink-0"
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
