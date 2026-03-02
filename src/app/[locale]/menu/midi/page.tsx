import Link from "next/link";
import "../menu.css";
import data from "../../../../../content/menu-midi.json";

type MenuData = {
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

const menu = data as MenuData;

export default function Page() {
  return (
    <main className="menuPage">
      <div className="menuShell">
        <div className="menuTabsWrap">
          <div className="menuTabs">
            <Link className="menuTab" href="/menu/soir-weekend">
              Carte Soir et week-end
            </Link>
            <Link className="menuTab menuTabActive" href="/menu/midi">
              Carte Midi
            </Link>
          </div>
        </div>

        <section className="menuCard">
          <div className="menuCardTopLine" />

          <header className="menuHeader">
            <h1 className="menuTitle">{menu.title}</h1>
            <p className="menuIntro">{menu.intro}</p>

            <div className="menuFlourish" aria-hidden="true">
              <svg viewBox="0 0 120 30" fill="none">
                <path
                  d="M10 18c12 0 12-10 24-10s12 10 24 10 12-10 24-10 12 10 24 10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </header>

          {/* FORMULES */}
          <div className="menuSection">
            {menu.formules.map((x) => (
              <div className="menuItem" key={x.label}>
                <div className="menuRow">
                  <span className="menuLabel menuLabelCaps">{x.label}</span>
                  <span className="menuLeader" aria-hidden="true" />
                  <span className="menuValueBox">{x.price}</span>
                </div>
              </div>
            ))}
          </div>

          {/* SECTIONS */}
          {menu.sections.map((sec, idx) => (
            <div
              key={`${sec.title}-${idx}`}
              className={`menuSection ${idx === menu.sections.length - 1 ? "menuSectionLast" : ""}`}
            >
              <h2 className="menuSectionTitle">{sec.title}</h2>
              {sec.sub && <p className="menuSectionSub">{sec.sub}</p>}
              <div className="menuSectionDash">—</div>

              {sec.items.map((it) => (
                <div className="menuItem" key={it.name}>
                  <div className="menuRow">
                    <span className="menuLabel">{it.name}</span>
                    <span className="menuLeader" aria-hidden="true" />
                  </div>
                  {it.desc && <p className="menuDesc">{it.desc}</p>}
                </div>
              ))}

              {sec.note && <p className="menuNote">{sec.note}</p>}
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}