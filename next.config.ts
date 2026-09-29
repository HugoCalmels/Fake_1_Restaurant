import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Photos de démo hébergées sur Unsplash, optimisées par next/image
    // (redimensionnement + WebP/AVIF). Les photos envoyées via Decap
    // (/uploads) sont locales et optimisées sans configuration.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};

export default nextConfig;
