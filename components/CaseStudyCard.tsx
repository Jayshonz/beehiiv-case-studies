"use client";

import Image from "next/image";
import { CaseStudy } from "@/lib/types";
import { ArrowUpRight } from "lucide-react";

interface Props {
  study: CaseStudy;
  onClick: (study: CaseStudy) => void;
}

export default function CaseStudyCard({ study, onClick }: Props) {
  return (
    <button
      onClick={() => onClick(study)}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-[#2a2a2a] bg-[#1a1a1a] text-left transition-all duration-200 hover:-translate-y-1 hover:border-[#ff6c2f]/40 hover:shadow-[0_0_24px_rgba(255,108,47,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6c2f]"
    >
      {/* Thumbnail */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#2a2a2a]">
        <Image
          src={study.thumbnailUrl}
          alt={study.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          unoptimized
        />
        {/* Overlay icon */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-200 group-hover:bg-black/30">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ff6c2f] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <ArrowUpRight size={18} className="text-white" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center gap-2">
          <span className="inline-block rounded-full bg-[#ff6c2f]/10 px-2.5 py-0.5 text-[11px] font-medium text-[#ff6c2f]">
            {study.advertiser}
          </span>
        </div>
        <h2 className="text-sm font-semibold leading-snug text-[#f5f5f5] line-clamp-2 group-hover:text-white">
          {study.title}
        </h2>
        <p className="mt-auto pt-2 text-xs text-[#6b7280]">
          {new Date(study.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
      </div>
    </button>
  );
}
