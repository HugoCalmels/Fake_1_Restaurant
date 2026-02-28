
import AboutSection from "@/components/pages/home/about/AboutSection";
import Hero from "@/components/pages/home/hero/Hero";
import Infobar from "@/components/pages/home/infobar/Infobar";
import MapSection from "@/components/pages/home/map-section/MapSection";
 // <= doit pointer vers le wrapper

import MenuTeaser from "@/components/pages/home/menu-teaser/MenuTeaser";


export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const l: "fr" | "en" = locale === "en" ? "en" : "fr";

  return (
    <main>
      <Hero locale={l} />
      <Infobar locale={l} />
      <AboutSection locale={l} />
      <MenuTeaser locale={l}/>
      <MapSection locale={l} />
    </main>
  );
}