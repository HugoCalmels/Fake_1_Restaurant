
import AboutSection from "@/components/home/about/AboutSection";
import Hero from "@/components/home/hero/Hero";
import Infobar from "@/components/home/infobar/Infobar";
import MapSection from "@/components/home/map-section/MapSection";
import MenuTeaser from "@/components/home/menu-teaser/MenuTeaser";

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