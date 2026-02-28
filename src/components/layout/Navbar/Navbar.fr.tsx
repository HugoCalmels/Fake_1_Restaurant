import NavbarBase from "./NavbarBase";

export default function NavbarFR() {
  return (
    <NavbarBase
      locale="fr"
      labels={{
        menus: "Cartes & Menus",
        photos: "Photos",
        avis: "Avis",
        infos: "Infos",
        reserve: "Réserver",
        langShort: "FR",
      }}
      menuItems={[
        { label: "Carte soir & weekend", href: "/menu/soir-weekend" },
        { label: "Carte midi", href: "/menu/midi" },
      ]}
    />
  );
}