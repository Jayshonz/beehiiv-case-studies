"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CaseStudy } from "@/lib/types";
import CaseStudyCard from "./CaseStudyCard";
import CaseStudyModal from "./CaseStudyModal";
import { Search } from "lucide-react";

interface Props {
  studies: CaseStudy[];
}

export default function Gallery({ studies }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selected, setSelected] = useState<CaseStudy | null>(null);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return studies;
    return studies.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.advertiser.toLowerCase().includes(q)
    );
  }, [studies, query]);

  // Open modal from URL param on load
  useEffect(() => {
    const id = searchParams.get("study");
    if (id) {
      const match = studies.find((s) => s.id === id);
      if (match) setSelected(match);
    }
  }, [searchParams, studies]);

  const openStudy = useCallback(
    (study: CaseStudy) => {
      setSelected(study);
      const params = new URLSearchParams(searchParams.toString());
      params.set("study", study.id);
      router.replace(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  const closeStudy = useCallback(() => {
    setSelected(null);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("study");
    const qs = params.toString();
    router.replace(qs ? `?${qs}` : "/", { scroll: false });
  }, [router, searchParams]);

  return (
    <>
      {/* Search */}
      <div className="relative mx-auto mb-8 w-full max-w-md">
        <Search
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6b7280]"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by advertiser or title…"
          className="w-full rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] py-2.5 pl-9 pr-4 text-sm text-[#f5f5f5] placeholder-[#6b7280] outline-none transition-colors focus:border-[#ff6c2f]/50 focus:ring-1 focus:ring-[#ff6c2f]/30"
        />
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="py-20 text-center text-sm text-[#6b7280]">
          No case studies match &ldquo;{query}&rdquo;
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((study) => (
            <CaseStudyCard
              key={study.id}
              study={study}
              onClick={openStudy}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      <CaseStudyModal
        study={selected}
        studies={filtered}
        onClose={closeStudy}
        onNavigate={openStudy}
      />
    </>
  );
}
