export interface iFrontMatter {
  title: string;
  draft?: string;
  date: string;
  excerpt: string;
  cover_image?: string;
  keywords?: string;
  links?: Array<Record<string, any>> | string;
  commands?: Array<Record<string, any>> | string;
}
