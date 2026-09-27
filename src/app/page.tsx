import { redirect } from "next/navigation";

// "/" n'a pas de contenu propre : on envoie vers la version française.
// Ne dépend pas du middleware (qui posait problème en edge function sur Netlify).
export default function RootPage() {
  redirect("/fr");
}
