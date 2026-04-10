"use client";

export function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-xl bg-[#1f1f1f] overflow-hidden">
      <div className="aspect-[2/3] bg-[#2a2a2a]" />
      <div className="p-3 space-y-2">
        <div className="h-4 bg-[#2a2a2a] rounded w-3/4" />
        <div className="h-3 bg-[#2a2a2a] rounded w-1/2" />
      </div>
    </div>
  );
}

export function SkeletonText({ lines = 1 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 bg-[#2a2a2a] rounded animate-pulse"
          style={{ width: `${70 - i * 10}%` }}
        />
      ))}
    </div>
  );
}

export function SkeletonHero() {
  return (
    <div className="relative h-[70vh] animate-pulse">
      <div className="absolute inset-0 bg-[#1f1f1f]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
      <div className="absolute bottom-20 left-4 sm:left-8 lg:left-16 right-4 sm:right-8 lg:right-16 space-y-4">
        <div className="h-10 bg-[#2a2a2a] rounded w-2/3" />
        <div className="h-4 bg-[#2a2a2a] rounded w-full" />
        <div className="h-4 bg-[#2a2a2a] rounded w-3/4" />
      </div>
    </div>
  );
}
