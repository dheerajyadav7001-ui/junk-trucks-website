import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { GALLERY_SLIDES } from '../data/galleryData';

const IMAGE_DURATION = 5000;

export const WorkGallery: React.FC = () => {
  const slides = GALLERY_SLIDES;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const go = useCallback(
    (next: number) => setIndex((next + slides.length) % slides.length),
    [slides.length]
  );

  // Images advance on a timer; videos play through and advance when they end.
  useEffect(() => {
    const current = slides[index];
    if (current.type === 'video') {
      const v = videoRefs.current[index];
      if (v) {
        v.currentTime = 0;
        v.play().catch(() => {});
      }
      return;
    }
    if (paused) return;
    const t = setTimeout(() => go(index + 1), IMAGE_DURATION);
    return () => clearTimeout(t);
  }, [index, paused, slides, go]);

  // Stop videos that are no longer showing.
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (v && i !== index) v.pause();
    });
  }, [index]);

  return (
    <div
      className="relative rounded-2xl overflow-hidden bg-[#0F2742] shadow-lg aspect-square sm:aspect-video max-w-4xl mx-auto"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((s, i) => (
        <div
          key={s.src}
          className={`absolute inset-0 transition-opacity duration-700 ${i === index ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          aria-hidden={i !== index}
        >
          {/* Blurred copy fills the panel so portrait and landscape both fit without cropping */}
          <img
            src={s.type === 'image' ? s.src : s.poster}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110 opacity-60"
            loading="lazy"
          />
          {s.type === 'image' ? (
            <img
              src={s.src}
              alt={s.alt}
              className="relative w-full h-full object-contain"
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          ) : (
            <video
              ref={(el) => { videoRefs.current[i] = el; }}
              src={s.src}
              poster={s.poster}
              className="relative w-full h-full object-contain"
              muted
              playsInline
              preload="metadata"
              onEnded={() => go(i + 1)}
              aria-label={s.alt}
            />
          )}
        </div>
      ))}

      <button
        onClick={() => go(index - 1)}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 text-[#173B5F] hover:bg-white shadow flex items-center justify-center"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => go(index + 1)}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 text-[#173B5F] hover:bg-white shadow flex items-center justify-center"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
        {slides.map((s, i) => (
          <button
            key={s.src}
            onClick={() => go(i)}
            aria-label={`Show slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${i === index ? 'w-6 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/80'}`}
          />
        ))}
      </div>
    </div>
  );
};
