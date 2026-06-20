export interface Officer {
  id: string;
  name: string;
  role: string;
  roleShort: string;
  motto: string;
  image: string;
  isAdviser?: boolean;
}

export interface GalleryItem {
  id: string;
  src: string;
  title: string;
  subtitle: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface StatItem {
  value: string;
  label: string;
}
