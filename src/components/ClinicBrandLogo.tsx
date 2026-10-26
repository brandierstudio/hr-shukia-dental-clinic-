import React from 'react';

interface ClinicBrandLogoProps {
  variant?: 'dark-text' | 'light-text';
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  className?: string;
}

/**
 * Custom-designed vector brand emblem and wordmark for HR Sukhia Dental Clinic.
 * Combines a Royal-College-inspired shield crest, an anatomical molar crown contour,
 * and a precision orthodontic archwire + bracket motif with the HRS monogram.
 */
export const ClinicBrandLogo: React.FC<ClinicBrandLogoProps> = ({
  variant = 'dark-text',
  size = 'md',
  showSubtitle = false,
  className = '',
}) => {
  const iconDimensions =
    size === 'sm' ? 'w-9 h-9' : size === 'lg' ? 'w-12 h-12' : 'w-10 h-10';
  const titleSize =
    size === 'sm'
      ? 'text-base'
      : size === 'lg'
        ? 'text-xl'
        : 'text-lg';

  const isLight = variant === 'light-text';

  return (
    <span
      className={`group inline-flex items-center gap-3 select-none whitespace-nowrap shrink-0 ${className}`}
    >
      {/* Custom SVG Dental & Orthodontic Crest */}
      <span
        className={`relative ${iconDimensions} rounded-xl bg-gradient-to-br from-[#16324F] via-[#1B3F63] to-[#167D83] p-0.5 shadow-xs transition-transform duration-300 group-hover:scale-105 shrink-0`}
      >
        <span className="w-full h-full rounded-[10px] bg-[#10263C] flex items-center justify-center relative overflow-hidden">
          <svg
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full p-1"
            aria-hidden="true"
          >
            {/* Outer Crest Shield Border */}
            <path
              d="M32 5L53 13V30C53 44.5 43.8 54.4 32 59C20.2 54.4 11 44.5 11 30V13L32 5Z"
              stroke="#167D83"
              strokeWidth="2"
              strokeOpacity="0.7"
              fill="#16324F"
              fillOpacity="0.55"
            />
            {/* Sculpted Dental Crown Silhouette */}
            <path
              d="M22.5 21C19 21 17 24.2 17.6 28.5C18.1 32.2 19.8 35.4 20.5 39.5C21.1 43 22.3 46 24.4 46C26.2 46 27.1 42.3 28.5 39.8C29.4 38.2 30.6 37.5 32 37.5C33.4 37.5 34.6 38.2 35.5 39.8C36.9 42.3 37.8 46 39.6 46C41.7 46 42.9 43 43.5 39.5C44.2 35.4 45.9 32.2 46.4 28.5C47 24.2 45 21 41.5 21C38.4 21 35.8 23.2 32 23.2C28.2 23.2 25.6 21 22.5 21Z"
              stroke="#EAF5F4"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="#167D83"
              fillOpacity="0.22"
            />
            {/* Precision Orthodontic Archwire & Bracket Node Motif */}
            <path
              d="M15 30.5C20.5 34.2 26.2 35.8 32 35.8C37.8 35.8 43.5 34.2 49 30.5"
              stroke="#38BDF8"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Orthodontic Bracket Nodes */}
            <rect
              x="21.5"
              y="31.2"
              width="3.6"
              height="3.6"
              rx="0.8"
              fill="#FFFFFF"
            />
            <rect
              x="30"
              y="33.5"
              width="4"
              height="4"
              rx="1"
              fill="#38BDF8"
            />
            <rect
              x="38.9"
              y="31.2"
              width="3.6"
              height="3.6"
              rx="0.8"
              fill="#FFFFFF"
            />
            {/* Subtle HRS Crown Initials */}
            <text
              x="32"
              y="17.5"
              textAnchor="middle"
              fill="#EAF5F4"
              fontFamily="Georgia, 'Cormorant Garamond', serif"
              fontWeight="700"
              fontSize="7.5"
              letterSpacing="1.2"
            >
              HRS
            </text>
          </svg>
        </span>
      </span>

      {/* Brand Wordmark */}
      {!showSubtitle ? (
        <span
          className={`${titleSize} font-bold tracking-tight transition-colors ${
            isLight
              ? 'text-white group-hover:text-[#EAF5F4]'
              : 'text-[#16324F] group-hover:text-[#167D83]'
          }`}
        >
          HR Sukhia Dental Clinic
        </span>
      ) : (
        <span className="flex flex-col">
          <span
            className={`${titleSize} font-bold tracking-tight leading-tight ${
              isLight ? 'text-white' : 'text-[#16324F]'
            }`}
          >
            HR Sukhia Dental Clinic
          </span>
          <span
            className={`font-signage text-xs leading-tight mt-0.5 ${
              isLight ? 'text-white/75' : 'text-[#667582]'
            }`}
          >
            Dr. H.R. Sukhia Dental Surgery &amp; Orthodontics
          </span>
        </span>
      )}
    </span>
  );
};
