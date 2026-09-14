import React, { useState } from 'react';
import { Truck } from 'lucide-react';

interface LogoProps {
  showTagline?: boolean;
  tagline?: string;
  theme?: 'light' | 'dark';
  className?: string;
  logoSrc?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Logo: React.FC<LogoProps> = ({
  showTagline = true,
  tagline = "Gets The Job Done.",
  theme = "light",
  className = "",
  logoSrc = "/logo.png",
  size = "md",
}) => {
  const isDark = theme === 'dark';
  const [imgError, setImgError] = useState(false);

  const imgSizeClasses = {
    sm: "h-9 w-9",
    md: "h-12 sm:h-13 w-12 sm:w-13",
    lg: "h-14 sm:h-16 w-14 sm:w-16",
    xl: "h-16 sm:h-20 w-16 sm:w-20",
  }[size];

  const brandTextClasses = {
    sm: "text-base",
    md: "text-lg sm:text-xl",
    lg: "text-2xl sm:text-3xl",
    xl: "text-3xl sm:text-4xl lg:text-5xl",
  }[size];

  const taglineClasses = {
    sm: "text-[10px]",
    md: "text-[11px] sm:text-xs",
    lg: "text-xs sm:text-sm",
    xl: "text-sm sm:text-base",
  }[size];

  return logoSrc && !imgError ? (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative shrink-0">
        <img
          src={logoSrc}
          alt="Junk Trucks Logo"
          className={`${imgSizeClasses} object-cover rounded-full shadow-md ring-2 ${
            isDark
              ? 'ring-emerald-400/40 shadow-emerald-950/60'
              : 'ring-[#025337]/20 shadow-stone-400/30'
          }`}
          onError={() => setImgError(true)}
          referrerPolicy="no-referrer"
        />
      </div>
      {showTagline && (
        <div className="text-left">
          <div className="flex items-center gap-1.5">
            <span className={`block font-black ${brandTextClasses} tracking-tight leading-none ${isDark ? 'text-white' : 'text-[#025337]'}`}>
              JUNK<span className="text-[#F2661C]">TRUCKS</span>
            </span>
            <span className={`text-[10px] uppercase font-bold font-mono px-1.5 py-0.5 rounded tracking-wide ${isDark ? 'bg-white/10 text-emerald-300' : 'bg-[#EDF5F1] text-[#025337]'}`}>
              Ottawa
            </span>
          </div>
          <span className={`block ${taglineClasses} font-semibold tracking-wide mt-1 ${isDark ? 'text-stone-300' : 'text-stone-500'}`}>
            {tagline}
          </span>
        </div>
      )}
    </div>
  ) : (
    <div className={`flex items-center gap-3 text-left ${className}`}>
      <div className={`${imgSizeClasses} rounded-full flex items-center justify-center transition-colors shrink-0 shadow-md ${isDark ? 'bg-[#F2661C] text-white' : 'bg-[#025337] text-white'}`}>
        <Truck className={`w-6 h-6 ${isDark ? 'text-white' : 'text-[#F2661C]'}`} />
      </div>
      <div>
        <div className="flex items-center gap-1.5">
          <span className={`font-black ${brandTextClasses} tracking-tight ${isDark ? 'text-white' : 'text-[#025337]'}`}>
            JUNK<span className="text-[#F2661C]">TRUCKS</span>
          </span>
          <span className={`text-[10px] uppercase font-bold font-mono px-1.5 py-0.5 rounded ${isDark ? 'bg-white/10 text-emerald-300' : 'bg-[#EDF5F1] text-[#025337]'}`}>
            Ottawa
          </span>
        </div>
        {showTagline && (
          <p className={`text-[11px] font-semibold tracking-wide mt-1 ${isDark ? 'text-stone-300' : 'text-stone-500'}`}>
            {tagline}
          </p>
        )}
      </div>
    </div>
  );
};
