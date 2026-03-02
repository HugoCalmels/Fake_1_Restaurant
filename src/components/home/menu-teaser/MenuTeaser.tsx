import MenuTeaserFR from "./MenuTeaser.fr";
import MenuTeaserEN from "./MenuTeaser.en";

export default function MenuTeaser({ locale }: { locale: "fr" | "en" }) {
  return locale === "en" ? <MenuTeaserEN /> : <MenuTeaserFR />;
}