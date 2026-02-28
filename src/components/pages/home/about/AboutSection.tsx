import AboutSectionFR from "./AboutSection.fr";
import AboutSectionEN from "./AboutSection.en";

export default function AboutSection({ locale }: { locale: "fr" | "en" }) {
  return locale === "en" ? <AboutSectionEN /> : <AboutSectionFR />;
}