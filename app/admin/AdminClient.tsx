"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Eye, EyeOff, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

export default function AdminClient() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");

  const [title, setTitle] = useState("");
  const [advertiser, setAdvertiser] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [caseStudyUrl, setCaseStudyUrl] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleAuth(e: FormEvent) {
    e.preventDefault();
    setAuthError("");
    // Verify by attempting a POST with no body — will return 401 or 400
    const res = await fetch("/api/case-studies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${password}`,
      },
      body: JSON.stringify({}),
    });
    if (res.status === 401) {
      setAuthError("Incorrect password.");
    } else {
      // 400 (missing fields) or 201 both mean auth passed
      setAuthenticated(true);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/case-studies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${password}`,
        },
        body: JSON.stringify({ title, advertiser, thumbnailUrl, caseStudyUrl }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Something went wrong");
      }

      setStatus("success");
      setTitle("");
      setAdvertiser("");
      setThumbnailUrl("");
      setCaseStudyUrl("");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Unknown error");
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#0f0f0f]">
      {/* Top bar */}
      <header className="border-b border-[#2a2a2a] px-4 py-4">
        <div className="mx-auto flex max-w-2xl items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-[#9ca3af] transition-colors hover:text-white"
          >
            <ArrowLeft size={14} />
            Back to gallery
          </Link>
          <span className="text-[#2a2a2a]">/</span>
          <span className="text-sm text-[#6b7280]">Admin</span>
        </div>
      </header>

      <main className="flex flex-1 items-start justify-center px-4 py-12">
        <div className="w-full max-w-lg">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white">Add Case Study</h1>
            <p className="mt-1 text-sm text-[#6b7280]">
              Upload a new case study to the beehiiv Ad Network showcase.
            </p>
          </div>

          {!authenticated ? (
            /* Password gate */
            <form
              onSubmit={handleAuth}
              className="rounded-xl border border-[#2a2a2a] bg-[#1a1a1a] p-6"
            >
              <label className="mb-1.5 block text-sm font-medium text-[#d1d5db]">
                Admin password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter password…"
                  className="w-full rounded-lg border border-[#2a2a2a] bg-[#111] py-2.5 pl-3.5 pr-10 text-sm text-[#f5f5f5] placeholder-[#6b7280] outline-none transition-colors focus:border-[#ff6c2f]/50 focus:ring-1 focus:ring-[#ff6c2f]/30"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b7280] hover:text-[#9ca3af]"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {authError && (
                <p className="mt-2 text-xs text-red-400">{authError}</p>
              )}
              <button
                type="submit"
                className="mt-4 w-full rounded-lg bg-[#ff6c2f] py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 active:opacity-75"
              >
                Unlock
              </button>
              <p className="mt-3 text-center text-xs text-[#6b7280]">
                Set <code className="text-[#9ca3af]">ADMIN_PASSWORD</code> in
                your .env file.
              </p>
            </form>
          ) : (
            /* Upload form */
            <form
              onSubmit={handleSubmit}
              className="space-y-5 rounded-xl border border-[#2a2a2a] bg-[#1a1a1a] p-6"
            >
              {status === "success" && (
                <div className="flex items-center gap-2 rounded-lg border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400">
                  <CheckCircle size={15} />
                  Case study added successfully!{" "}
                  <Link
                    href="/"
                    className="ml-auto underline hover:no-underline"
                  >
                    View gallery
                  </Link>
                </div>
              )}

              {status === "error" && (
                <div className="flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                  <AlertCircle size={15} />
                  {errorMsg}
                </div>
              )}

              <Field
                label="Title"
                id="title"
                value={title}
                onChange={setTitle}
                placeholder="How BrandX drove 3x ROAS with beehiiv Ads"
                required
              />
              <Field
                label="Advertiser name"
                id="advertiser"
                value={advertiser}
                onChange={setAdvertiser}
                placeholder="BrandX"
                required
              />
              <Field
                label="Thumbnail image URL"
                id="thumbnailUrl"
                value={thumbnailUrl}
                onChange={setThumbnailUrl}
                placeholder="https://…"
                required
                type="url"
              />
              <Field
                label="Full case study image URL"
                id="caseStudyUrl"
                value={caseStudyUrl}
                onChange={setCaseStudyUrl}
                placeholder="https://…"
                required
                type="url"
              />

              {/* Previews */}
              {thumbnailUrl && (
                <div>
                  <p className="mb-1.5 text-xs text-[#6b7280]">Thumbnail preview</p>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={thumbnailUrl}
                    alt="thumbnail preview"
                    className="h-28 w-full rounded-lg object-cover"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#ff6c2f] py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 active:opacity-75 disabled:opacity-60"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Saving…
                  </>
                ) : (
                  <>
                    <Plus size={14} />
                    Add case study
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}

function Field({
  label,
  id,
  value,
  onChange,
  placeholder,
  required,
  type = "text",
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-[#d1d5db]">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-lg border border-[#2a2a2a] bg-[#111] px-3.5 py-2.5 text-sm text-[#f5f5f5] placeholder-[#6b7280] outline-none transition-colors focus:border-[#ff6c2f]/50 focus:ring-1 focus:ring-[#ff6c2f]/30"
      />
    </div>
  );
}
