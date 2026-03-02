import NavbarBase from "./NavbarBase";

export default function NavbarEN() {
  return (
    <NavbarBase
      locale="en"
      labels={{
        menus: "Menus",
        photos: "Photos",
        avis: "Reviews",
        infos: "Info",
        reserve: "Book",
        langShort: "EN",
      }}
      menuItems={[
        { label: "Evening & weekend menu", href: "/menu/soir-weekend" },
        { label: "Lunch menu", href: "/menu/midi" },
      ]}
    />
  );
}