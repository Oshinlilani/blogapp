export interface Blog {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  status: "draft" | "published";
  createdAt: string;
}