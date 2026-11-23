
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Blog } from "@/app/types/blog";

export default function AdminDashboard() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const storedBlogs = localStorage.getItem("blogs");

    if (storedBlogs) {
      setBlogs(JSON.parse(storedBlogs));
    }
  }, []);

  const totalBlogs = blogs.length;

  const publishedBlogs = blogs.filter(
    (blog) => blog.status === "published"
  ).length;

  const draftBlogs = blogs.filter(
    (blog) => blog.status === "draft"
  ).length;

  const recentBlogs = [...blogs]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    )
    .slice(0, 5);

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-6xl">

        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Dashboard
            </h1>
            <p className="mt-2 text-gray-500">
              Welcome to your Blog CMS.
            </p>
          </div>

          <Link
            href="/admin/blogs/new"
            className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
          >
            + Create Blog
          </Link>
        </div>

        {/* Statistics */}

        <div className="mb-8 grid gap-5 sm:grid-cols-3">

          <div className="rounded-xl bg-white p-6 shadow">
            <p className="text-sm text-gray-500">Total Blogs</p>
            <h2 className="mt-3 text-3xl font-bold text-yellow-800">
              {totalBlogs}
            </h2>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <p className="text-sm text-gray-500">Published Blogs</p>
            <h2 className="mt-3 text-3xl font-bold text-green-600">
              {publishedBlogs}
            </h2>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <p className="text-sm text-gray-500">Draft Blogs</p>
            <h2 className="mt-3 text-3xl font-bold text-yellow-600">
              {draftBlogs}
            </h2>
          </div>

        </div>

        {/* Recent Blogs */}

        <div className="rounded-xl bg-white p-6 shadow">

          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-500">
              Recent Blogs
            </h2>

            <Link
              href="/admin/blogs"
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              View All
            </Link>
          </div>

          {recentBlogs.length === 0 ? (
            <p className="py-8 text-center text-gray-500">
              No blogs created yet.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b text-sm text-gray-500">
                    <th className="p-3">Title</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Created At</th>
                  </tr>
                </thead>

                <tbody>
                  {recentBlogs.map((blog) => (
                    <tr key={blog.id} className="border-b">
                      <td className="p-3 font-medium text-black">
                        {blog.title}
                      </td>

                      <td className="p-3">
                        <span
                          className={`rounded-full px-3 py-1 text-xs ${
                            blog.status === "published"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {blog.status}
                        </span>
                      </td>

                      <td className="p-3 text-sm text-gray-500">
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>

        {/* Quick Actions */}

        <div className="mt-8 grid gap-5 sm:grid-cols-2">

          <Link
            href="/admin/blogs"
            className="rounded-xl bg-white p-6 shadow transition hover:shadow-lg"
          >
            <h3 className="text-lg font-semibold text-gray-500">
              Manage Blogs →
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Edit, delete and manage your existing posts.
            </p>
          </Link>

          <Link
            href="/admin/blogs/new"
            className="rounded-xl bg-white p-6 shadow transition hover:shadow-lg"
          >
            <h3 className="text-lg font-semibold text-gray-500">
              Write a New Blog →
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Create a new article and publish it.
            </p>
          </Link>

        </div>

      </div>
    </main>
  );
}
