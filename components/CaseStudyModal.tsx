"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { CaseStudy } from "@/lib/types";
import { X, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  study: CaseStudy | null;
  studies: CaseStudy[];
  onClose: () => void;
  onNavigate: (study: CaseStudy) => void;
}

export default function CaseStudyModal({
  study,
  studies,
  onClose,
  onNavigate,
}: Props) {
  const currentIndex = study ? studies.findIndex((s) => s.id === study.id) : -1;
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < studies.length - 1;

  const handlePrev = useCallback(() => {
    if (hasPrev) onNavigate(studies[currentIndex - 1]);
  }, [hasPrev, currentIndex, studies, onNavigate]);

  const handleNext = useCallback(() => {
    if (hasNext) onNavigate(studies[currentIndex + 1]);
  }, [hasNext, currentIndex, studies, onNavigate]);

  useEffect(() => {
    if (!study) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [study, onClose, handlePrev, handleNext]);

  if (!study) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={study.title}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative z-10 flex w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-[#2a2a2a] bg-[#1a1a1a] shadow-2xl">
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-[#2a2a2a] px-5 py-3">
          <div className="flex items-center gap-3">
            <span className="inline-block rounded-full bg-[#ff6c2f]/10 px-3 py-0.5 text-xs font-medium text-[#ff6c2f]">
              {study.advertiser}
            </span>
            <h2 className="text-sm font-semibold text-[#f5f5f5] line-clamp-1">
              {study.title}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={study.caseStudyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 rounded-md border border-[#2a2a2a] px-3 py-1.5 text-xs text-[#9ca3af] transition-colors hover:border-[#ff6c2f]/50 hover:text-[#ff6c2f]"
            >
              <ExternalLink size={12} />
              Open
            </a>
            <button
              onClick={onClose}
              className="rounded-md border border-[#2a2a2a] p-1.5 text-[#9ca3af] transition-colors hover:border-[#ff6c2f]/50 hover:text-[#ff6c2f]"
              aria-label="Close"
            >
              <X size={15} />
            </button>
          </div>
        </div>

        {/* Case study image */}
        <div className="relative max-h-[75vh] overflow-y-auto bg-[#111]">
          <Image
            src={study.caseStudyUrl}
            alt={`${study.title} — full case study`}
            width={1200}
            height={1600}
            className="w-full object-contain"
            unoptimized
          />
        </div>

        {/* Navigation footer */}
        {studies.length > 1 && (
          <div className="flex items-center justify-between border-t border-[#2a2a2a] px-5 py-3">
            <button
              onClick={handlePrev}
              disabled={!hasPrev}
              className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs text-[#9ca3af] transition-colors hover:text-[#f5f5f5] disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronLeft size={14} />
              Previous
            </button>
            <span className="text-xs text-[#6b7280]">
              {currentIndex + 1} / {studies.length}
            </span>
            <button
              onClick={handleNext}
              disabled={!hasNext}
              className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs text-[#9ca3af] transition-colors hover:text-[#f5f5f5] disabled:cursor-not-allowed disabled:opacity-30"
            >
              Next
              <ChevronRight size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
