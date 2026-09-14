import React, { useMemo } from 'react';

/**
 * A subtle, site-wide falling-snow effect for the winter campaign.
 * Pure CSS animation — lightweight, no external assets, and non-interactive
 * (pointer-events-none) so it never blocks clicks on the page beneath it.
 */
export const SnowOverlay: React.FC = () => {
  const flakes = useMemo(
    () =>
      Array.from({ length: 45 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 3 + Math.random() * 5,
        duration: 8 + Math.random() * 10,
        delay: Math.random() * 12,
        drift: (Math.random() - 0.5) * 60,
        opacity: 0.35 + Math.random() * 0.45,
      })),
    []
  );

  return (
    <div
      className="fixed inset-0 z-40 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {flakes.map((flake) => (
        <span
          key={flake.id}
          className="absolute top-[-10px] rounded-full bg-white"
          style={{
            left: `${flake.left}%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            opacity: flake.opacity,
            filter: 'blur(0.3px)',
            animation: `snow-fall ${flake.duration}s linear ${flake.delay}s infinite`,
            // custom property consumed by the keyframes for horizontal drift
            ['--drift' as any]: `${flake.drift}px`,
          }}
        />
      ))}
    </div>
  );
};

export default SnowOverlay;
