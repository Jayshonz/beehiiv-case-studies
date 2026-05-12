import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/beehiiv-case-studies",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
