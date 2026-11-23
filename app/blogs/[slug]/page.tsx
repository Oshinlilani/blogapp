
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Blog } from "@/app/types/blog";

export default function BlogDetails() {
  const params = useParams();
  const router = useRouter();

  const slug = params.slug as string;

  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedBlogs = localStorage.getItem("blogs");

    if (storedBlogs) {
      const allBlogs: Blog[] = JSON.parse(storedBlogs);

      const selectedBlog = allBlogs.find(
        (item) =>
          item.slug === slug && item.status === "published"
      );

      setBlog(selectedBlog || null);
    }

    setLoading(false);
  }, [slug]);

  if (loading) {
    return <p className="p-10">Loading blog...</p>;
  }

  if (!blog) {
    return (
      <div className="p-10 text-center">
        <h1 className="mb-4 text-2xl font-bold">
          Blog Not Found
        </h1>

        <Link href="/" className="text-blue-600 underline">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-12">
      <article className="mx-auto max-w-3xl rounded-xl bg-white p-8 shadow">

        <button
          onClick={() => router.back()}
          className="mb-6 text-blue-600"
        >
          ← Back
        </button>

        <h1 className="mb-4 text-4xl font-bold text-gray-900">
          {blog.title}
        </h1>

        <p className="mb-6 text-gray-500">
          {new Date(blog.createdAt).toLocaleDateString()}
        </p>

        <p className="mb-8 text-lg text-gray-600">
          {blog.description}
        </p>

        <div className="whitespace-pre-wrap leading-8 text-gray-800">
          {blog.content}
        </div>

      </article>
    </main>
  );
}
