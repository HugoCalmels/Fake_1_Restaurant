import InfobarFR from "./Infobar.fr";
import InfobarEN from "./Infobar.en";

export default function Infobar({ locale }: { locale: "fr" | "en" }) {
  return locale === "en" ? <InfobarEN /> : <InfobarFR />;
}