export default function MenuMidi() {
  return (
    <div className="menuPage">

      <header className="menuHeader">
        <h1 className="menuTitle">Menu Midi</h1>
        <p className="menuIntro">
          Formule du jour, produits frais, cuisine maison.
        </p>
        <div className="menuLine" />
      </header>

      <section className="menuSection">
        <h2 className="menuSectionTitle">Formules</h2>

        <div className="menuItem">
          <div className="menuItemLeft">
            <div className="menuItemName">Plat du jour</div>
          </div>
          <div className="menuItemPrice">13,50€</div>
        </div>

        <div className="menuItem">
          <div className="menuItemLeft">
            <div className="menuItemName">Entrée + Plat</div>
          </div>
          <div className="menuItemPrice">17,50€</div>
        </div>

        <div className="menuItem">
          <div className="menuItemLeft">
            <div className="menuItemName">Entrée + Plat + Dessert</div>
          </div>
          <div className="menuItemPrice">20,50€</div>
        </div>
      </section>

      <section className="menuSection">
        <h2 className="menuSectionTitle">Plats du moment</h2>

        <div className="menuItem">
          <div className="menuItemLeft">
            <div className="menuItemName">Bavette d’aloyau</div>
          </div>
        </div>

        <div className="menuItem">
          <div className="menuItemLeft">
            <div className="menuItemName">Filet de porc</div>
          </div>
        </div>

      </section>

    </div>
  );
}