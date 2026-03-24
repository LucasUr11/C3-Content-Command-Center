export type Platform = "TikTok" | "Instagram" | "YouTube";

export type ContentStatus = "Idea" | "Guion" | "Grabado" | "Editado" | "Publicado";

export type Category = "Tutorial" | "Review" | "Opinión" | "Noticias" | "Shorts" | "Podcast" | "Hardware";

export interface VideoContent {
  id: string;
  title: string;
  platform: Platform;
  status: ContentStatus;
  category: Category;
  publishDate: string | null;
  script: string;
  createdAt: string;
}
