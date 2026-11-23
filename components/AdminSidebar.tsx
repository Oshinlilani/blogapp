"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    name: "Dashboard",
    href: "/admin",
  },
  {
    name: "Manage Blogs",
    href: "/admin/blogs",
  },
  {
    name: "Create Blog",
    href: "/admin/blogs/new",
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex min-h-screen w-64 flex-col border-r bg-white p-5">
      <h2 className="mb-10 text-2xl font-bold text-blue-600">Blog App</h2>

      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : item.href === "/admin/blogs"
                ? pathname === "/admin/blogs" ||
                  pathname.startsWith("/admin/blogs/")
                : pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-lg px-4 py-3 font-medium transition ${
                isActive
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto">
        <Link
          href="/"
          className="block rounded-lg px-4 py-3 text-gray-600 hover:bg-gray-100"
        >
          View Website →
        </Link>
      </div>
    </aside>
  );
}
