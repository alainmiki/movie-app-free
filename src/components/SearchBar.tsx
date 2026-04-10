"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  initialQuery?: string;
}

export function SearchBar({ initialQuery = "" }: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (debouncedQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(debouncedQuery.trim())}`);
    } else if (debouncedQuery === "") {
      router.push("/search");
    }
  }, [debouncedQuery, router]);

  const handleClear = () => {
    setQuery("");
    router.push("/search");
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9ca3af]" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies..."
          className="w-full h-14 pl-12 pr-12 bg-[#1f1f1f] border border-[#2a2a2a] rounded-xl text-white placeholder-[#9ca3af] focus:outline-none focus:border-[#ff6b6b] transition-colors"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9ca3af] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
