import { BlogPost } from './blogTypes';
import { threeItemLimit } from './blog/three-item-limit';
import { notPickedUp } from './blog/not-picked-up-curbside';
import { costGuide } from './blog/cost-guide';
import { movingOut } from './blog/moving-out';
import { winterChecklist } from './blog/winter-checklist';
import { condoGuide } from './blog/condo-guide';

export type { BlogPost, BlogSection } from './blogTypes';

// Newest first. To add a post: create a file in src/data/blog/, import it
// here, add it to this list, add its URL to public/sitemap.xml.
export const BLOG_POSTS: BlogPost[] = [
  costGuide,
  threeItemLimit,
  notPickedUp,
  movingOut,
  winterChecklist,
  condoGuide,
];

export const BLOG_PATH = '/blog';

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
