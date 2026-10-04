// Slides for the homepage "Our Work" slideshow.
// Add a photo:  drop it in public/gallery/ and add { type: 'image', src: '/gallery/name.jpg', alt: '...' }
// Add a video:  drop an .mp4 in public/gallery/ and add
//               { type: 'video', src: '/gallery/name.mp4', poster: '/gallery/name-poster.jpg', alt: '...' }
export type GallerySlide =
  | { type: 'image'; src: string; alt: string }
  | { type: 'video'; src: string; alt: string; poster: string };

export const GALLERY_SLIDES: GallerySlide[] = [
  { type: 'video', src: '/gallery/video-1.mp4', poster: '/gallery/video-1-poster.jpg', alt: 'Junk Trucks crew on a job in Ottawa' },
  { type: 'image', src: '/gallery/job-1.jpg', alt: 'Loaded trailer after a cleanout in Ottawa' },
  { type: 'image', src: '/gallery/job-2.jpg', alt: 'Truck and trailer loaded with junk' },
  { type: 'video', src: '/gallery/video-2.mp4', poster: '/gallery/video-2-poster.jpg', alt: 'Junk Trucks job clip' },
  { type: 'image', src: '/gallery/job-4.jpg', alt: 'Trailer loaded and strapped down' },
  { type: 'image', src: '/gallery/job-5.jpg', alt: 'Covered load ready to haul' },
  { type: 'image', src: '/gallery/job-6.jpg', alt: 'Trailer loaded on an Ottawa street' },
  { type: 'image', src: '/gallery/job-7.jpg', alt: 'Heavy load headed to the dump' },
  { type: 'image', src: '/gallery/job-8.jpg', alt: 'Full trailer after a pickup' },
];
