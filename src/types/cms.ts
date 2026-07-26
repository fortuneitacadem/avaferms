export interface FounderItem {
  id: string;
  name: string;
  role: string;
  photo: string;
  bio: string;
  quote: string;
}

export interface SiteSettings {
  logoUrl: string;
  logoSize: 'sm' | 'md' | 'lg';
  logoPosition: 'left' | 'center' | 'right';
  gameTitle1: string;
  gameTitle2: string;
  gameSubtitle: string;
  version: string;
  releaseDate: string;
  fileSize: string;
  downloadCount: number;
  googlePlayUrl: string;
  pcDownloadUrl: string;
  pcDownloadFileName: string;
  apkDownloadUrl: string;
  companyName: string;
  companyDescription: string;
  companyMission: string;
  telegramLink: string;
  youtubeLink: string;
  discordLink: string;
  supportEmail: string;
}

export interface NewsAttachment {
  name: string;
  url: string;
  size: string;
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: string;
  image: string;
  summary: string;
  attachment?: NewsAttachment;
}

export interface CarItem {
  id: string;
  name: string;
  brand: string;
  image: string;
  speed: string;
  accel: string;
  power: string;
  weight: string;
  drive: string;
  description: string;
  colors: string[];
}

export interface FaqItem {
  id: string;
  q: string;
  a: string;
}

export interface DownloadMirror {
  id: string;
  name: string;
  speedLabel: string;
  url: string;
  type: 'uz' | 'global' | 'torrent' | 'playstore';
}
