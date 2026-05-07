"use client";

import Link from "next/link";
import Image from "next/image";
import { Settings } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#2a2a2a] bg-[#0f0f0f]/90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/beehiiv-logo.png"
              alt="beehiiv"
              width={120}
              height={32}
              className="brightness-0 invert"
              priority
            />
            <span className="hidden text-[10px] tracking-wider text-[#6b7280] uppercase sm:block">
              Ad Network
            </span>
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
