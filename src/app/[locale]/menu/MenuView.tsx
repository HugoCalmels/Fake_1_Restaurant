import Link from "next/link";
import "./menu.css";
import { localePath, type Locale } from "@/lib/i18n";

export type MenuData = {
  title: string;
  intro: string;
  formules: Array<{ label: string; price: string }>;
  sections: Array<{
    title: string;
    sub?: string;
    items: Array<{ name: string; desc?: string }>;
    note?: string;
  }>;
};

// Mise en page commune aux deux cartes (midi / soir et week-end),
// calquée sur la carte du restaurant d'origine.
export default function MenuView({
  locale,
  active,
  menu,
}: {
  locale: Locale;
  active: "midi" | "soir-weekend";
  menu: MenuData;
}) {
  const tabs = [
    { slug: "soir-weekend", label: "Carte Soir et week-end" },
    { slug: "midi", label: "Carte Midi" },
  ];
  const notes = menu.sections.map((sec) => sec.note).filter(Boolean);

  return (
    <div className="menuPage">
      <div className="menuShell">
        <nav className="menuTabs">
          {tabs.map((tab) => (
            <Link
              key={tab.slug}
              className={`menuTab ${tab.slug === active ? "menuTabActive" : ""}`}
              href={localePath(locale, `/menu/${tab.slug}`)}
            >
              {tab.label}
            </Link>
          ))}
        </nav>

        <section className="menuCard">
          <header className="menuHeader">
            <h1 className="menuTitle">{menu.title}</h1>
            <p className="menuIntro">{menu.intro}</p>
            <div className="menuDivider" aria-hidden="true">
              <span />
            </div>
          </header>

          {menu.formules.map((f) => (
            <div className="menuFormule" key={f.label}>
              <h2 className="menuFormuleLabel">{f.label}</h2>
              <span className="menuPrice">{f.price}</span>
            </div>
          ))}

          {menu.sections.map((sec, idx) => (
            <div key={`${sec.title}-${idx}`} className="menuSection">
              <div className="menuSectionHead">
                <h2 className="menuSectionTitle">{sec.title}</h2>
                {sec.sub && <p className="menuSectionSub">{sec.sub}</p>}
              </div>

              {sec.items.map((it, i) => (
                <div className="menuItem" key={`${it.name}-${i}`}>
                  <div className="menuRow">
                    <h3 className="menuLabel">{it.name}</h3>
                    <span className="menuLeader" aria-hidden="true" />
                  </div>
                  {it.desc && <p className="menuDesc">{it.desc}</p>}
                </div>
              ))}
            </div>
          ))}

          {notes.map((note) => (
            <p key={note} className="menuNote">
              {note}
            </p>
          ))}
        </section>
      </div>
    </div>
  );
}
