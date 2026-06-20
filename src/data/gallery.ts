import type { GalleryItem } from '@/types';

export const galleryItems: GalleryItem[] = [
  {
    id: 'moto-sir-bay',
    src: new URL('../images/moto-sir_bay.png', import.meta.url).href,
    title: 'Class Adviser',
    subtitle: 'Guidance and support from our adviser.',
  },
  {
    id: 'moto-christine',
    src: new URL('../images/moto-christine.png', import.meta.url).href,
    title: 'Class President',
    subtitle: 'Leading our group with confidence.',
  },
  {
    id: 'moto-marky',
    src: new URL('../images/moto-marky.png', import.meta.url).href,
    title: 'Vice President',
    subtitle: 'Teamwork, support, and leadership.',
  },
  {
    id: 'moto-rhea',
    src: new URL('../images/moto-rhea.png', import.meta.url).href,
    title: 'Secretary',
    subtitle: 'Organized notes and class memories.',
  },
  {
    id: 'moto-faith',
    src: new URL('../images/moto-faith.png', import.meta.url).href,
    title: 'Treasurer',
    subtitle: 'Keeping our class goals on track.',
  },
  {
    id: 'moto-neil',
    src: new URL('../images/moto-neil.png', import.meta.url).href,
    title: 'Auditor',
    subtitle: 'Ensuring accuracy and trust.',
  },
  {
    id: 'moto-carlo',
    src: new URL('../images/moto-carlo.png', import.meta.url).href,
    title: 'Public Information Officer',
    subtitle: 'Sharing our stories with the class.',
  },
];
