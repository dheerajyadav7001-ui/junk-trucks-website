// Slides for the homepage "Our Work" slideshow.
// To add a video: drop the file (mp4 preferred) in public/gallery/ and add
//   { type: 'video', src: '/gallery/your-video.mp4', alt: 'Short description' }
// Optional `poster` is an image shown before the video loads.
export type GallerySlide =
  | { type: 'image'; src: string; alt: string }
  | { type: 'video'; src: string; alt: string; poster?: string };

export const GALLERY_SLIDES: GallerySlide[] = [
  { type: 'image', src: '/furniture-removal.jpg', alt: 'Crew carrying a couch out to the truck' },
  { type: 'image', src: '/before-after-showcase.jpg', alt: 'Garage and basement cleanout, before and after' },
  { type: 'image', src: '/appliance-recycling.jpg', alt: 'Appliance removal from a basement' },
  { type: 'image', src: '/estate-cleanouts.jpg', alt: 'Estate cleanout loading the truck' },
  { type: 'image', src: '/commercial-cleanout.jpg', alt: 'Office cleanout' },
  { type: 'image', src: '/renovation-debris.jpg', alt: 'Renovation debris removal' },
  { type: 'image', src: '/yard-waste.jpg', alt: 'Yard waste pickup' },
];
