// Logo dans l'esprit de l'enseigne d'origine : nom en arc au-dessus d'un
// petit dessin (cloche de service). Même hauteur que l'ancien logo : il
// reprend la classe .logo (44 px, 38 px sur mobile), la largeur suit le viewBox.
export default function BistrotLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 150 60"
      role="img"
      aria-label="Le Faux Bistrot"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Arc doux (r = 100, ~152 unités) : sommet vers y = 18, bords à y = 46 */}
        <path id="bistrot-logo-arc" d="M 6 46 A 100 100 0 0 1 144 46" />
      </defs>

      <text
        fill="#6b2f2f"
        fontSize="13"
        fontWeight="700"
        letterSpacing="0.4"
        style={{ fontFamily: "var(--font-display), Georgia, serif" }}
      >
        <textPath href="#bistrot-logo-arc" startOffset="50%" textAnchor="middle">
          LE FAUX BISTROT
        </textPath>
      </text>

      {/* Cloche de service, centrée sous l'arc */}
      <g
        fill="none"
        stroke="#6b2f2f"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="75" cy="33" r="1.9" fill="#6b2f2f" />
        <path d="M 62 50 A 13 13 0 0 1 88 50" />
        <path d="M 58 50 L 92 50" />
        <path d="M 61 54.5 L 89 54.5" />
        <path d="M 66.5 45 A 8.5 8.5 0 0 1 70.5 40.8" strokeWidth="1.3" />
      </g>
    </svg>
  );
}
