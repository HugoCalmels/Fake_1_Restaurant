import { notFound } from "next/navigation";

// Toute URL inconnue (en français ou sous /en) tombe ici : on affiche la page 404
// du site (avec navbar et footer) plutôt que la 404 brute de Next.
export default function CatchAll() {
  notFound();
}
