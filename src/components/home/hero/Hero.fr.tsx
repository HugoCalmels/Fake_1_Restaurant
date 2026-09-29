import type { HeroContent } from "./Hero";
import home from "../../../../content/home.json";

// Accroche, sous-titre, ligne d'infos et photo : modifiables dans Decap
// (collection "Page d'accueil"). Le nom et les boutons restent fixes.
export const heroFR: HeroContent = {
  kicker: home.heroKicker,
  title: "Le faux bistrot",
  subtitle: home.heroSubtitle,
  primaryCtaLabel: "Réserver",
  primaryCtaHref: "/booking",
  secondaryCtaLabel: "Voir la carte",
  secondaryCtaHref: "/menu/soir-weekend",
  note: home.heroNote,
  bgImage: home.heroImage,
  bgAlt: "Intérieur du restaurant",
};
