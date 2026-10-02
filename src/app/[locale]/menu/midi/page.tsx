import MenuView, { type MenuData } from "../MenuView";
import data from "../../../../../content/menu-midi.json";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <MenuView locale={locale === "en" ? "en" : "fr"} active="midi" menu={data as MenuData} />;
}
