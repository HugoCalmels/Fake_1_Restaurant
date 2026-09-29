// Logo "enseigne" : texte en arc autour d'une cloche de service, dans l'esprit
// des bistrots d'antan. SVG inline : net à toutes les tailles, quelques Ko.
export default function BistrotLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 120"
      role="img"
      aria-label="Le Faux Bistrot"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Arc du haut sur 220° (r = 44) pour loger « LE FAUX BISTROT » en entier,
            arc du bas sur 110° (r = 38) ; les deux se lisent de gauche à droite */}
        <path id="logo-arc-top" d="M 18.65 75.05 A 44 44 0 1 1 101.35 75.05" />
        <path id="logo-arc-bottom" d="M 28.9 81.8 A 38 38 0 0 0 91.1 81.8" />
      </defs>

      <circle cx="60" cy="60" r="57" fill="#fbf7f1" stroke="#6b2f2f" strokeWidth="2.5" />
      <circle cx="60" cy="60" r="51" fill="none" stroke="#6b2f2f" strokeWidth="0.8" />

      <text
        fill="#6b2f2f"
        fontSize="14.5"
        fontWeight="700"
        letterSpacing="0.8"
        style={{ fontFamily: "var(--font-display), Georgia, serif" }}
      >
        <textPath href="#logo-arc-top" startOffset="50%" textAnchor="middle">
          LE FAUX BISTROT
        </textPath>
      </text>

      <text
        fill="#6b2f2f"
        fontSize="9"
        fontWeight="700"
        letterSpacing="1.8"
        style={{ fontFamily: "var(--font-sans), Arial, sans-serif" }}
      >
        <textPath href="#logo-arc-bottom" startOffset="50%" textAnchor="middle">
          TOULOUSE
        </textPath>
      </text>

      {/* Cloche de service */}
      <g
        fill="none"
        stroke="#6b2f2f"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M 40 72 A 20 20 0 0 1 80 72" />
        <path d="M 35 72 L 85 72" />
        <path d="M 38 77 L 82 77" />
        <circle cx="60" cy="49" r="2.6" fill="#6b2f2f" />
        <path d="M 47 63 A 14 14 0 0 1 54 56" strokeWidth="1.4" />
      </g>
    </svg>
  );
}
