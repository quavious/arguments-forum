export interface NewsModel {
  id: string;
  title: string;
  link: string;
  description: string;
  publishedAt: string;
}

export interface NewsResponseItem {
  title: string;
  originallink: string;
  link: string;
  description: string;
  pubDate: string;
}

export interface NewsResponse {
  title: string;
  link: string;
  description: string;
  lastBuildDate: string;
  total: number;
  start: number;
  display: number;
  items: NewsResponseItem[];
}
