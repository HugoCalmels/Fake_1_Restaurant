import AboutSection from "@/components/pages/home/AboutSection";
import Hero from "@/components/pages/home/hero/Hero";
import InfoBar from "@/components/pages/home/Infobar";
import MapSection from "@/components/pages/home/MapSection";
import MenuTeaser from "@/components/pages/home/MenuTeaser";

export default function Home() {
  return (
    <main>
      <Hero />
      <InfoBar />
      <AboutSection />
      <MenuTeaser />
      <MapSection />
    </main>
  );
}
