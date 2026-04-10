"use client";

import Image from "next/image";
import { Credits, getPosterUrl } from "@/lib/types";

interface CastListProps {
  credits: Credits;
}

export function CastList({ credits }: CastListProps) {
  const topCast = credits.cast.slice(0, 10);

  if (!topCast || topCast.length === 0) {
    return (
      <div className="text-[#9ca3af]">No cast information available.</div>
    );
  }

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
      {topCast.map((actor) => (
        <div
          key={actor.id}
          className="flex-shrink-0 w-24 sm:w-28 text-center"
        >
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full overflow-hidden bg-[#1f1f1f] mb-3">
            {actor.profile_path ? (
              <Image
                src={getPosterUrl(actor.profile_path, "medium") || ""}
                alt={actor.name}
                fill
                className="object-cover"
                sizes="96px"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-[#2a2a2a]">
                <span className="text-[#9ca3af] text-xs">No Photo</span>
              </div>
            )}
          </div>
          <p className="text-sm font-semibold text-white truncate">{actor.name}</p>
          <p className="text-xs text-[#9ca3af] truncate">{actor.character}</p>
        </div>
      ))}
    </div>
  );
}
