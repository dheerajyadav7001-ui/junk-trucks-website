import React, { useEffect, useRef } from 'react';

interface Flake {
  x: number;
  y: number;
  r: number;
  speed: number;
  drift: number;
  phase: number;
  alpha: number;
}

/**
 * Light falling-snow overlay for the hero. Canvas based, ignores clicks,
 * pauses when the tab is hidden, and is skipped for people who prefer reduced motion.
 */
export const SnowEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let flakes: Flake[] = [];
    let raf = 0;
    let running = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const make = (initial: boolean): Flake => ({
      x: Math.random() * w,
      y: initial ? Math.random() * h : -10,
      r: 1 + Math.random() * 2.6,
      speed: 0.35 + Math.random() * 0.9,
      drift: 0.3 + Math.random() * 0.7,
      phase: Math.random() * Math.PI * 2,
      alpha: 0.45 + Math.random() * 0.5,
    });

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(110, Math.max(35, (w * h) / 11000)));
      flakes = Array.from({ length: count }, () => make(true));
    };

    const tick = (t: number) => {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = '#fff';
      for (let i = 0; i < flakes.length; i++) {
        const f = flakes[i];
        f.y += f.speed;
        f.x += Math.sin(t / 1400 + f.phase) * f.drift * 0.5;
        if (f.y > h + 6 || f.x < -10 || f.x > w + 10) {
          flakes[i] = make(false);
          continue;
        }
        ctx.globalAlpha = f.alpha;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    resize();
    raf = requestAnimationFrame(tick);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none z-[5]"
    />
  );
};
