import { Suspense } from "react";
import { SearchClient } from "@/components/SearchClient";
import { SkeletonCard } from "@/components/Skeleton";

interface SearchPageProps {
  searchParams: Promise<{ q?: string; type?: string; page?: string }>;
}

export async function generateMetadata({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  return {
    title: q ? `Search: ${q} - Cineverse` : "Search - Cineverse",
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q: query, type } = await searchParams;

  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="h-10 w-32 bg-[#2a2a2a] rounded animate-pulse mb-8" />
        <div className="h-14 bg-[#2a2a2a] rounded-xl animate-pulse mb-8" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          {Array.from({ length: 10 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    }>
      <SearchClient initialQuery={query || ""} initialType={type || "movie"} />
    </Suspense>
  );
}