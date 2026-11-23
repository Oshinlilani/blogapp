"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Blog } from "@/app/types/blog";

export default function ManageBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const storedBlogs = localStorage.getItem("blogs");

    if (storedBlogs) {
      setBlogs(JSON.parse(storedBlogs));
    }
  }, []);

  const handleDelete = (id: string) => {
    const filteredBlogs = blogs.filter((blog) => blog.id !== id);

    setBlogs(filteredBlogs);

    localStorage.setItem("blogs", JSON.stringify(filteredBlogs));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Manage Blogs</h1>

          <Link
            href="/admin/blogs/new"
            className="rounded-lg bg-blue-600 px-5 py-3 text-white"
          >
            + Create Blog
          </Link>
        </div>

        {blogs.length === 0 ? (
          <div className="rounded-xl bg-white p-10 text-center shadow">
            <p className="text-gray-500">
              No blogs found. Create your first blog!
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl bg-white shadow">
            <table className="w-full text-left">
              <thead className="bg-gray-700">
                <tr>
                  <th className="p-4">Title</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {blogs.map((blog) => (
                  <tr key={blog.id} className="border-t">
                    <td className="p-4 text-gray-700 font-medium">
                      {blog.title}
                    </td>

                    <td className="p-4">
                      <span
                        className={`rounded-full px-3 py-1 text-sm ${
                          blog.status === "published"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {blog.status}
                      </span>
                    </td>

                    <td className="p-4 text-gray-600">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </td>

                    <td className="flex gap-3 p-4">
                      <Link
                        href={`/admin/blogs/${blog.id}/edit`}
                        className="rounded-lg bg-blue-100 px-3 py-2 text-blue-600 hover:bg-blue-200"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => handleDelete(blog.id)}
                        className="rounded-lg bg-red-100 px-3 py-2 text-red-600 hover:bg-red-200"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
