"use client";

import { useEffect, useState } from "react";
import { getCaseStudies } from "@/lib/case-studies";
import { CaseStudy } from "@/lib/types";
import Header from "@/components/Header";
import Gallery from "@/components/Gallery";

export default function HomePage() {
  const [studies, setStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCaseStudies()
      .then(setStudies)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-[#0f0f0f]">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-[#2a2a2a] px-4 py-16 text-center sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#ff6c2f]/20 bg-[#ff6c2f]/5 px-4 py-1.5 text-xs font-medium text-[#ff6c2f]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ff6c2f]" />
              Ad Network Results
            </div>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Built for brands that{" "}
              <span className="text-[#ff6c2f]">want results</span>
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-[#9ca3af]">
              See how top advertisers are reaching engaged newsletter audiences
              and driving measurable outcomes with the beehiiv Ad Network.
            </p>
            <div className="mt-8 flex items-center justify-center gap-8 text-center">
              {[
                { stat: "50M+", label: "Monthly readers" },
                { stat: "3,000+", label: "Publisher newsletters" },
                { stat: "42%", label: "Avg. open rate" },
              ].map(({ stat, label }) => (
                <div key={label}>
                  <div className="text-2xl font-bold text-white">{stat}</div>
                  <div className="text-xs text-[#6b7280]">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-baseline justify-between">
            <h2 className="text-lg font-semibold text-white">
              Case Studies
              {!loading && (
                <span className="ml-2 text-sm font-normal text-[#6b7280]">
                  ({studies.length})
                </span>
              )}
            </h2>
          </div>
          {loading ? (
            <div className="py-20 text-center text-sm text-[#6b7280]">Loading…</div>
          ) : (
            <Gallery studies={studies} />
          )}
        </section>
      </main>

      <footer className="border-t border-[#2a2a2a] px-4 py-6 text-center text-xs text-[#6b7280]">
        &copy; {new Date().getFullYear()} beehiiv. All rights reserved.
      </footer>
    </div>
  );
}
