import MapSectionFR from "./MapSection.fr";
import MapSectionEN from "./MapSection.en";

export default function MapSection({ locale }: { locale: "fr" | "en" }) {
  return locale === "en" ? <MapSectionEN /> : <MapSectionFR />;
}