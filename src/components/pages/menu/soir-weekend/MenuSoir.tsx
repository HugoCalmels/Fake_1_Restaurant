export default function MenuSoir() {
  return (
    <div className="menuPage">

      <header className="menuHeader">
        <h1 className="menuTitle">Carte Soir & Week-end</h1>
        <p className="menuIntro">
          Cuisine de saison, produits frais. Tous nos plats sont faits maison.
        </p>
        <div className="menuLine" />
      </header>

      <section className="menuSection">
        <h2 className="menuSectionTitle">Entrées</h2>

        <div className="menuItem">
          <div className="menuItemLeft">
            <div className="menuItemName">Tartare de saumon</div>
            <div className="menuItemDesc">Fines herbes, citron, huile d’olive</div>
          </div>
          <div className="menuItemPrice">12€</div>
        </div>

        <div className="menuItem">
          <div className="menuItemLeft">
            <div className="menuItemName">Camembert rôti</div>
          </div>
          <div className="menuItemPrice">10€</div>
        </div>
      </section>

      <section className="menuSection">
        <h2 className="menuSectionTitle">Plats</h2>

        <div className="menuItem">
          <div className="menuItemLeft">
            <div className="menuItemName">Magret de canard</div>
            <div className="menuItemDesc">Sauce maison, légumes de saison</div>
          </div>
          <div className="menuItemPrice">24€</div>
        </div>

        <div className="menuItem">
          <div className="menuItemLeft">
            <div className="menuItemName">Risotto aux gambas</div>
          </div>
          <div className="menuItemPrice">22€</div>
        </div>
      </section>

      <section className="menuSection">
        <h2 className="menuSectionTitle">Desserts</h2>

        <div className="menuItem">
          <div className="menuItemLeft">
            <div className="menuItemName">Crème brûlée</div>
          </div>
          <div className="menuItemPrice">7€</div>
        </div>

        <div className="menuItem">
          <div className="menuItemLeft">
            <div className="menuItemName">Café gourmand</div>
          </div>
          <div className="menuItemPrice">9€</div>
        </div>
      </section>

    </div>
  );
}