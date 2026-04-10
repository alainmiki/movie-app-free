"use client";

import Image from "next/image";
import Link from "next/link";
import { Globe, Play } from "lucide-react";
import { WatchProviders, getPosterUrl } from "@/lib/types";

interface WatchProvidersProps {
  providers: WatchProviders | null;
  country?: string;
}

export function WatchProvidersList({ providers, country = "US" }: WatchProvidersProps) {
  if (!providers?.results?.[country]) {
    return (
      <div className="flex items-center gap-2 text-[#9ca3af]">
        <Globe className="w-4 h-4" />
        <span className="text-sm">No streaming info available</span>
      </div>
    );
  }

  const countryData = providers.results[country];
  const flatrate = countryData.flatrate || [];
  const rent = countryData.rent || [];
  const buy = countryData.buy || [];

  if (flatrate.length === 0 && rent.length === 0 && buy.length === 0) {
    return (
      <div className="flex items-center gap-2 text-[#9ca3af]">
        <Globe className="w-4 h-4" />
        <span className="text-sm">Not available to stream</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {countryData.link && (
        <Link
          href={countryData.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#ff6b6b] hover:bg-[#ff5252] text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors"
        >
          <Play className="w-4 h-4 fill-white" />
          Watch Now
        </Link>
      )}

      {flatrate.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-[#9ca3af] mb-2">Stream</h3>
          <div className="flex flex-wrap gap-2">
            {flatrate.map((provider) => {
              const logoUrl = getPosterUrl(provider.logo_path, "small");
              return (
                <div
                  key={provider.provider_id}
                  className="flex items-center gap-2 bg-[#1f1f1f] px-2 py-1 rounded-lg"
                  title={provider.provider_name}
                >
                  {logoUrl && (
                    <Image
                      src={logoUrl}
                      alt={provider.provider_name}
                      width={32}
                      height={32}
                      className="rounded"
                    />
                  )}
                  <span className="text-sm text-white">{provider.provider_name}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {rent.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-[#9ca3af] mb-2">Rent</h3>
          <div className="flex flex-wrap gap-2">
            {rent.map((provider) => {
              const logoUrl = getPosterUrl(provider.logo_path, "small");
              return (
                <div
                  key={provider.provider_id}
                  className="flex items-center gap-2 bg-[#1f1f1f] px-2 py-1 rounded-lg"
                  title={provider.provider_name}
                >
                  {logoUrl && (
                    <Image
                      src={logoUrl}
                      alt={provider.provider_name}
                      width={32}
                      height={32}
                      className="rounded"
                    />
                  )}
                  <span className="text-sm text-white">{provider.provider_name}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {buy.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-[#9ca3af] mb-2">Buy</h3>
          <div className="flex flex-wrap gap-2">
            {buy.map((provider) => {
              const logoUrl = getPosterUrl(provider.logo_path, "small");
              return (
                <div
                  key={provider.provider_id}
                  className="flex items-center gap-2 bg-[#1f1f1f] px-2 py-1 rounded-lg"
                  title={provider.provider_name}
                >
                  {logoUrl && (
                    <Image
                      src={logoUrl}
                      alt={provider.provider_name}
                      width={32}
                      height={32}
                      className="rounded"
                    />
                  )}
                  <span className="text-sm text-white">{provider.provider_name}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}