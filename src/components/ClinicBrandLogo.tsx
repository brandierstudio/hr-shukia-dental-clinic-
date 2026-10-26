import React from 'react';

interface ClinicBrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  className?: string;
}

/**
 * Redesigned Custom Brand Logo for HR Sukhia Dental Clinic
 * - 100% Transparent Background (no dark/solid box behind the emblem)
 * - Sculpted 3D-inspired iridescent teal & aqua dental tooth contour
 * - Precision orthodontic archwire with glowing liquid-glass bracket nodes
 */
export const ClinicBrandLogo: React.FC<ClinicBrandLogoProps> = ({
  size = 'md',
  showSubtitle = false,
  className = '',
}) => {
  const iconDimensions =
    size === 'sm' ? 'w-9 h-9' : size === 'lg' ? 'w-13 h-13' : 'w-11 h-11';
  const titleSize =
    size === 'sm'
      ? 'text-base'
      : size === 'lg'
        ? 'text-xl'
        : 'text-lg';

  return (
    <span
      className={`group inline-flex items-center gap-3 select-none whitespace-nowrap shrink-0 bg-transparent ${className}`}
    >
      {/* Transparent-Background Sculpted 3D Dental & Orthodontic Emblem */}
      <span
        className={`relative ${iconDimensions} inline-flex items-center justify-center bg-transparent transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-rotate-3 shrink-0`}
      >
        <svg
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full overflow-visible drop-shadow-[0_6px_14px_rgba(13,148,136,0.25)]"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="tooth3dGrad" x1="12" y1="8" x2="52" y2="56" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0D9488" />
              <stop offset="50%" stopColor="#0284C7" />
              <stop offset="100%" stopColor="#38BDF8" />
            </linearGradient>
            <linearGradient id="toothGlassFill" x1="16" y1="10" x2="48" y2="54" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#CCFBF1" stopOpacity="0.9" />
              <stop offset="55%" stopColor="#E0F2FE" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#99F6E4" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="archwireGlow" x1="8" y1="30" x2="56" y2="30" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#06B6D4" />
              <stop offset="50%" stopColor="#0F766E" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>
          </defs>

          {/* Outer Luminous Halo Ring (Transparent center) */}
          <circle
            cx="32"
            cy="32"
            r="28"
            stroke="url(#tooth3dGrad)"
            strokeWidth="1.75"
            strokeDasharray="4 3"
            opacity="0.45"
          />

          {/* 3D Sculpted Molar Crown Silhouette */}
          <path
            d="M21.5 13.5C15.5 13.5 11.8 18.8 13 26.2C13.9 32.1 16.8 37.3 18 44.2C19 49.8 21.1 54.5 24.5 54.5C27.5 54.5 29 48.5 31.3 44.5C32.5 42.3 33.5 41.5 32 41.5C30.5 41.5 31.5 42.3 32.7 44.5C35 48.5 36.5 54.5 39.5 54.5C42.9 54.5 45 49.8 46 44.2C47.2 37.3 50.1 32.1 51 26.2C52.2 18.8 48.5 13.5 42.5 13.5C37.5 13.5 35.2 17.2 32 17.2C28.8 17.2 26.5 13.5 21.5 13.5Z"
            fill="url(#toothGlassFill)"
            stroke="url(#tooth3dGrad)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Inner Liquid-Glass Specular Highlight on Tooth Crown */}
          <path
            d="M18.5 20.5C17 23.5 17.2 27.5 18.2 31.5"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.9"
          />

          {/* Precision Orthodontic Archwire Curve */}
          <path
            d="M8.5 28.5C16.5 34.5 24.2 36.8 32 36.8C39.8 36.8 47.5 34.5 55.5 28.5"
            stroke="url(#archwireGlow)"
            strokeWidth="2.6"
            strokeLinecap="round"
          />

          {/* 3 Orthodontic Braces Bracket Nodes */}
          <rect
            x="17.5"
            y="30.2"
            width="5"
            height="5"
            rx="1.4"
            fill="#FFFFFF"
            stroke="#0D9488"
            strokeWidth="1.8"
          />
          <rect
            x="29.2"
            y="33.5"
            width="5.6"
            height="5.6"
            rx="1.5"
            fill="#0D9488"
            stroke="#FFFFFF"
            strokeWidth="1.5"
          />
          <rect
            x="41.5"
            y="30.2"
            width="5"
            height="5"
            rx="1.4"
            fill="#FFFFFF"
            stroke="#0284C7"
            strokeWidth="1.8"
          />
        </svg>
      </span>

      {/* Crisp Typography Wordmark */}
      {!showSubtitle ? (
        <span className="flex flex-col">
          <span
            className={`${titleSize} font-extrabold tracking-tight text-[#0F293A] group-hover:text-[#0D9488] transition-colors leading-none`}
          >
            HR Sukhia
          </span>
          <span className="text-[11px] font-semibold tracking-wider uppercase text-[#0D9488] mt-0.5 leading-none">
            Dental &amp; Orthodontics
          </span>
        </span>
      ) : (
        <span className="flex flex-col">
          <span
            className={`${titleSize} font-extrabold tracking-tight leading-tight text-[#0F293A]`}
          >
            HR Sukhia Dental Clinic
          </span>
          <span className="text-xs font-medium text-[#0D9488] leading-tight mt-0.5">
            Prof. Dr. H.R. Sukhia · Orthodontics
          </span>
        </span>
      )}
    </span>
  );
};

/**
 * Brandier Web Partner Attribution Badge for Footer
 * Links to https://web.brandierstudio.online with the uploaded Brandier Web logo
 * rendered with a clean transparent background.
 */
export const BrandierWebFooterBadge: React.FC = () => {
  return (
    <a
      href="https://web.brandierstudio.online"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Powered by Brandier Web — Visit web.brandierstudio.online"
      className="group inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-white shadow-xs hover:shadow-md hover:scale-105 transition-all duration-300"
    >
      <span className="relative w-6 h-6 inline-flex items-center justify-center overflow-hidden bg-transparent shrink-0">
        <img
          src="/assets/aistudio/Gemini_Generated_Image_8ikw1c8ikw1c8ikw_c7a07fa8.jfif"
          alt="Brandier Web Logo"
          className="w-full h-full object-contain mix-blend-multiply contrast-125 brightness-105 scale-[1.45] -translate-y-0.5 transition-transform duration-300 group-hover:rotate-6"
        />
      </span>
      <span className="text-xs font-medium text-[#335268] group-hover:text-[#0F293A] transition-colors">
        Powered by{' '}
        <strong className="font-extrabold text-[#0F293A] group-hover:text-[#0D9488]">
          Brandier Web
        </strong>
      </span>
    </a>
  );
};
