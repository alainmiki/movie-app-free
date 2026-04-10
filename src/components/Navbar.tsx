"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Film, Search, Play, Tv } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-[#2a2a2a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <Film className="w-8 h-8 text-[#ff6b6b] transition-transform group-hover:scale-110" />
            <span className="text-2xl font-bold font-display text-white tracking-wider">
              CINEVERSE
            </span>
          </Link>

          <div className="flex items-center gap-6">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors ${
                pathname === "/"
                  ? "text-[#ff6b6b]"
                  : "text-[#9ca3af] hover:text-white"
              }`}
            >
              Home
            </Link>
            <Link
              href="/search"
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                pathname === "/search"
                  ? "text-[#ff6b6b]"
                  : "text-[#9ca3af] hover:text-white"
              }`}
            >
              <Search className="w-4 h-4" />
              Search
            </Link>
            <Link
              href="/streaming"
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                pathname === "/streaming"
                  ? "text-[#ff6b6b]"
                  : "text-[#9ca3af] hover:text-white"
              }`}
            >
              <Tv className="w-4 h-4" />
              Stream
            </Link>
            <Link
              href="/free"
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                pathname === "/free"
                  ? "text-[#ff6b6b]"
                  : "text-[#9ca3af] hover:text-white"
              }`}
            >
              <Play className="w-4 h-4" />
              Free
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
