
import { Blog } from "@/app/types/blog";

const STORAGE_KEY = "blogs";

export function getBlogs(): Blog[] {
  if (typeof window === "undefined") return [];

  const data = localStorage.getItem(STORAGE_KEY);

  return data ? JSON.parse(data) : [];
}

export function saveBlogs(blogs: Blog[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(blogs));
}
