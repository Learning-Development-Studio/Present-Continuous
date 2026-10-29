import React, { useState } from 'react';
import { Camera } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className = 'w-full h-full object-cover',
  fallbackLabel,
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-stone-800 via-stone-900 to-slate-950 text-stone-300 p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <Camera className="w-8 h-8 text-stone-400 mb-3 stroke-[1.5]" />
        <p className="text-sm font-medium text-stone-200 max-w-xs">
          {fallbackLabel || alt}
        </p>
        <span className="text-xs text-stone-400 mt-1 font-mono-tabular">
          Documentary Visual Frame
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
};
