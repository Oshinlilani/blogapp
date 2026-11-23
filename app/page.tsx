
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Blog } from "@/app/types/blog";

export default function Home() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const storedBlogs = localStorage.getItem("blogs");

    if (storedBlogs) {
      const allBlogs: Blog[] = JSON.parse(storedBlogs);

      const publishedBlogs = allBlogs.filter(
        (blog) => blog.status === "published"
      );

      setBlogs(publishedBlogs);
    }
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-12">
      <div className="mx-auto max-w-5xl">

        <h1 className="mb-3 text-4xl font-bold text-gray-900">
          My Blog
        </h1>

        <p className="mb-10 text-gray-600">
          Explore my latest articles and thoughts.
        </p>

        {blogs.length === 0 ? (
          <p className="rounded-xl bg-white p-8 text-center text-gray-500">
            No published blogs available.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">

            {blogs.map((blog) => (
              <article
                key={blog.id}
                className="rounded-xl bg-white p-6 shadow transition hover:shadow-lg"
              >
                <h2 className="mb-3 text-2xl font-semibold text-gray-900">
                  {blog.title}
                </h2>

                <p className="mb-4 text-gray-600">
                  {blog.description}
                </p>

                <p className="mb-5 text-sm text-gray-400">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </p>

                <Link
                  href={`/blogs/${blog.slug}`}
                  className="font-medium text-blue-600 hover:underline"
                >
                  Read More →
                </Link>
              </article>
            ))}

          </div>
        )}

      </div>
    </main>
  );
}
