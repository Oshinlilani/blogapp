
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Blog } from "@/app/types/blog";

export default function EditBlog() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [blog, setBlog] = useState<Blog | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<Blog["status"]>("draft");
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("")
  const [filterStatus, setFilterStatus] = useState()

  useEffect(() => {
    const storedBlogs = localStorage.getItem("blogs");

    if (storedBlogs) {
      const allBlogs: Blog[] = JSON.parse(storedBlogs);

      const selectedBlog = allBlogs.find(
        (item) => item.id === id
      );

      if (selectedBlog) {
        setBlog(selectedBlog);
        setTitle(selectedBlog.title);
        setDescription(selectedBlog.description);
        setContent(selectedBlog.content);
        setStatus(selectedBlog.status);
      }
    }

    setLoading(false);
  }, [id]);

  const handleUpdate = () => {
    if (!title.trim() || !description.trim() || !content.trim()) {
      alert("Please fill all fields");
      return;
    }

    const storedBlogs = localStorage.getItem("blogs");

    const allBlogs: Blog[] = storedBlogs
      ? JSON.parse(storedBlogs)
      : [];

    const updatedBlogs = allBlogs.map((item) =>
      item.id === id
        ? {
            ...item,
            title,
            slug: title.toLowerCase().trim().replace(/\s+/g, "-"),
            description,
            content,
            status,
          }
        : item
    );

    localStorage.setItem("blogs", JSON.stringify(updatedBlogs));

    alert("Blog updated successfully!");

    router.push("/admin/blogs");
  };

  if (loading) {
    return <p className="p-8">Loading...</p>;
  }

  if (!blog) {
    return <p className="p-8">Blog not found.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-3xl rounded-xl bg-white p-8  shadow">

        <h1 className="mb-6 text-3xl font-bold text-black">
          Edit Blog
        </h1>

        <div className="space-y-5">

          <div>
            <label className="mb-2 block font-medium text-gray-600">
              Blog Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-3 text-black"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-gray-600">
              Description
            </label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-3 text-black"
              rows={3}
            />
          </div>

          <div>
            <label className="mb-2 block font-mediu text-gray-600">
              Blog Content
            </label>

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-3 text-black"
              rows={10}
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-gray-600">
              Blog Status
            </label>

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value as Blog["status"])
              }
              className="w-full rounded-lg border p-3 text-black"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          <button
            onClick={handleUpdate}
            className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
          >
            Save Changes
          </button>

        </div>
      </div>
    </div>
  );
}
