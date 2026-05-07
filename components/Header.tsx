"use client";

import Link from "next/link";
import { Settings } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#2a2a2a] bg-[#0f0f0f]/90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <svg
              width="28"
              height="28"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="32" height="32" rx="8" fill="#ff6c2f" />
              <path
                d="M8 10h10a5 5 0 0 1 0 10H8V10zm0 0v12"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex flex-col leading-none">
              <span className="text-[13px] font-semibold tracking-widest text-[#ff6c2f] uppercase">
                beehiiv
              </span>
              <span className="text-[10px] tracking-wider text-[#6b7280] uppercase">
                Ad Network
              </span>
            </div>
          </Link>

          <nav className="flex items-center gap-6">
            <span className="hidden text-sm text-[#6b7280] sm:block">
              Case Studies
            </span>
            <Link
              href="/admin"
              className="flex items-center gap-1.5 rounded-md border border-[#2a2a2a] px-3 py-1.5 text-xs text-[#9ca3af] transition-colors hover:border-[#ff6c2f]/50 hover:text-[#ff6c2f]"
            >
              <Settings size={13} />
              Admin
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
