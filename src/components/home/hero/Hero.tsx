import HeroClient from "./HeroClient";
import { heroFR } from "./Hero.fr";
import { heroEN } from "./Hero.en";

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

export default function Hero({ locale }: { locale: "fr" | "en" }) {
  const content: HeroContent = locale === "en" ? heroEN : heroFR;
  return <HeroClient locale={locale} content={content} />;
}