import fs from "node:fs/promises";
import path from "node:path";
import HeroClient from "./HeroClient";

export type HeroContent = {
  kicker?: string;
  title: string;
  subtitle?: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  note?: string;
  bgImage?: string;
  bgAlt?: string;
};

async function getHeroContent(): Promise<HeroContent> {
  const filePath = path.join(process.cwd(), "content", "hero.json");
  const raw = await fs.readFile(filePath, "utf8");
  return JSON.parse(raw) as HeroContent;
}

export default async function Hero() {
  const content = await getHeroContent();
  return <HeroClient content={content} />;
}