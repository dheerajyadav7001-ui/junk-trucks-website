import React, { useState } from 'react';
import { Truck } from 'lucide-react';

interface LogoProps {
  theme?: 'light' | 'dark';
  className?: string;
  logoSrc?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  // Kept so existing call sites compile; the wordmark no longer shows a tagline.
  showTagline?: boolean;
  tagline?: string;
}

export const Logo: React.FC<LogoProps> = ({
  theme = 'light',
  className = '',
  logoSrc = '/logo.png',
  size = 'md',
}) => {
  const isDark = theme === 'dark';
  const [imgError, setImgError] = useState(false);

  const imgSizeClasses = {
    sm: 'h-10 w-10',
    md: 'h-12 w-12 sm:h-14 sm:w-14',
    lg: 'h-12 w-12 sm:h-16 sm:w-16',
    xl: 'h-16 w-16 sm:h-20 sm:w-20',
  }[size];

  const textClasses = {
    sm: 'text-lg',
    md: 'text-xl sm:text-2xl',
    lg: 'text-xl sm:text-3xl',
    xl: 'text-3xl sm:text-4xl lg:text-5xl',
  }[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {logoSrc && !imgError ? (
        <img
          src={logoSrc}
          alt="Junk Trucks logo"
          className={`${imgSizeClasses} shrink-0 object-cover rounded-full`}
          onError={() => setImgError(true)}
          referrerPolicy="no-referrer"
        />
      ) : (
        <div className={`${imgSizeClasses} shrink-0 rounded-full flex items-center justify-center ${isDark ? 'bg-[#FA7415]' : 'bg-[#173B5F]'}`}>
          <Truck className="w-1/2 h-1/2 text-white" />
        </div>
      )}
      <span className={`${textClasses} font-extrabold tracking-tight leading-none whitespace-nowrap ${isDark ? 'text-white' : 'text-[#173B5F]'}`}>
        Junk Trucks
      </span>
    </div>
  );
};
