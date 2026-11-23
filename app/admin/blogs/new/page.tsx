
"use client";

import { useState } from "react";
import { Blog } from "@/app/types/blog";

export default function NewBlog() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (status: Blog["status"]) => {
    if (!title.trim() || !description.trim() || !content.trim()) {
      alert("Please fill all fields");
      return;
    }

    const slug = title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-");

    const newBlog: Blog = {
      id: crypto.randomUUID(),
      title,
      slug,
      description,
      content,
      status,
      createdAt: new Date().toISOString(),
    };

    const existingBlogs: Blog[] = JSON.parse(
      localStorage.getItem("blogs") || "[]"
    );

    const updatedBlogs = [...existingBlogs, newBlog];

    localStorage.setItem("blogs", JSON.stringify(updatedBlogs));

    alert("Blog saved successfully!");

    setTitle("");
    setDescription("");
    setContent("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-3xl rounded-xl bg-white p-8 shadow">

        <h1 className="mb-6 text-3xl font-bold text-gray-900">
          Create New Blog
        </h1>

        <div className="space-y-5">

          <div>
            <label className="mb-2 block text-gray-500 font-medium">Blog Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter blog title"
              className="w-full rounded-lg border border-gray-200 p-3 text-black"
            />
          </div>

          <div>
            <label className="mb-2 block text-gray-500 font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter short description"
              className="w-full rounded-lg border border-gray-200 p-3 text-black"
              rows={3}
            />
          </div>

          <div>
            <label className="mb-2 block text-gray-500 font-medium">Blog Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your blog here..."
              className="w-full rounded-lg border border-gray-200 p-3 text-black"
              rows={10}
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => handleSubmit("draft")}
              className="rounded-lg bg-gray-700 px-5 py-3 text-white"
            >
              Save as Draft
            </button>

            <button
              onClick={() => handleSubmit("published")}
              className="rounded-lg bg-blue-600 px-5 py-3 text-white"
            >
              Publish Blog
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
