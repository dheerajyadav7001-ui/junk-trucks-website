// Tiny inline-link parser shared by the React pages and the build-time
// prerender: "see [our prices](/junk-removal-ottawa-prices)" becomes parts.
export type InlinePart = string | { text: string; href: string };

const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;

export function parseInline(input: string): InlinePart[] {
  const parts: InlinePart[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  LINK.lastIndex = 0;
  while ((m = LINK.exec(input)) !== null) {
    if (m.index > last) parts.push(input.slice(last, m.index));
    parts.push({ text: m[1], href: m[2] });
    last = m.index + m[0].length;
  }
  if (last < input.length) parts.push(input.slice(last));
  return parts;
}

/** Plain text with link markup removed (for schema, meta, FAQ answers). */
export function stripInline(input: string): string {
  return input.replace(LINK, '$1');
}
