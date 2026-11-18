import React from 'react';
import { parseInline } from '../../../utils/richText';

/** Renders text with [label](/path) links as real anchors; site paths navigate client-side. */
export const RichText: React.FC<{ text: string; onNavigatePath?: (path: string) => void }> = ({ text, onNavigatePath }) => (
  <>
    {parseInline(text).map((part, i) => {
      if (typeof part === 'string') return <React.Fragment key={i}>{part}</React.Fragment>;
      const external = /^https?:\/\//.test(part.href);
      return (
        <a
          key={i}
          href={part.href}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          onClick={(e) => {
            if (!external && onNavigatePath) {
              e.preventDefault();
              onNavigatePath(part.href);
            }
          }}
          className="font-semibold text-[#173B5F] underline decoration-[#FA7415]/60 underline-offset-2 hover:text-[#FA7415]"
        >
          {part.text}
        </a>
      );
    })}
  </>
);
