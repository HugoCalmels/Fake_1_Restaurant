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

export default function Hero({ locale }: { locale: "fr" | "en" }) {
  // imports synchrones OK côté server
  const content = locale === "en" ? require("./Hero.en").heroEN : require("./Hero.fr").heroFR;
  return <HeroClient locale={locale} content={content} />;
}