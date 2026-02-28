import NavbarFR from "./Navbar.fr";
import NavbarEN from "./Navbar.en";

export default function Navbar({ locale }: { locale: "fr" | "en" }) {
  return locale === "en" ? <NavbarEN /> : <NavbarFR />;
}