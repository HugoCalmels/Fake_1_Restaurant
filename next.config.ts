import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Photos de démo hébergées sur Unsplash, optimisées par next/image
    // (redimensionnement + WebP/AVIF). Les photos envoyées via Decap
    // (/uploads) sont locales et optimisées sans configuration.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },

  // Français à la racine, anglais sous /en. Les pages vivent dans
  // app/[locale] : "/menu/midi" est servi par "/fr/menu/midi" sans que
  // l'URL change. Les anciennes URL en /fr/... redirigent vers la racine.
  async redirects() {
    return [
      { source: "/fr", destination: "/", permanent: true },
      { source: "/fr/:path*", destination: "/:path*", permanent: true },
      // Interface Decap CMS (fichier statique public/admin/index.html)
      { source: "/admin", destination: "/admin/index.html", permanent: false },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/", destination: "/fr" },
        {
          // Tout sauf /en, /fr, les fichiers internes de Next, l'admin Decap
          // et les fichiers statiques (avec un point : images, favicon…)
          source: "/:path((?!en(?:/|$)|fr(?:/|$)|_next/|admin|api/|\.netlify/)[^.]+)",
          destination: "/fr/:path",
        },
      ],
    };
  },
};

export default nextConfig;
