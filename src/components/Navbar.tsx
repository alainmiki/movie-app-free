"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Film, Search, Play, Tv, Sun, Moon, Bookmark } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function Navbar() {
  const pathname = usePathname();
  const { isDark, toggleTheme } = useTheme();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 dark:bg-black/80 backdrop-blur-md border-b border-[#2a2a2a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <Film className="w-8 h-8 text-[#ff6b6b] transition-transform group-hover:scale-110" />
            <span className="text-2xl font-bold font-display text-white tracking-wider">
              CINEVERSE
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/watchlist"
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                pathname === "/watchlist"
                  ? "text-[#ff6b6b]"
                  : "text-[#9ca3af] hover:text-white"
              }`}
            >
              <Bookmark className="w-4 h-4" />
              Watchlist
            </Link>
            <Link
              href="/"
              className={`text-sm font-medium transition-colors ${
                pathname === "/"
                  ? "text-[#ff6b6b]"
                  : "text-[#9ca3af] hover:text-white"
              }`}
            >
              Movies
            </Link>
            <Link
              href="/tv"
              className={`text-sm font-medium transition-colors ${
                pathname === "/tv" || pathname.startsWith("/tv/")
                  ? "text-[#ff6b6b]"
                  : "text-[#9ca3af] hover:text-white"
              }`}
            >
              TV Shows
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
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-[#9ca3af] hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}