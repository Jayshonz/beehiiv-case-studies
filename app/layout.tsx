import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "beehiiv Ad Network — Case Studies",
  description:
    "See how top brands achieve breakthrough results advertising with the beehiiv Ad Network.",
  openGraph: {
    title: "beehiiv Ad Network — Case Studies",
    description:
      "See how top brands achieve breakthrough results advertising with the beehiiv Ad Network.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className={`${inter.className} min-h-full flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
