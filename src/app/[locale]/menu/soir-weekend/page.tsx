import MenuView, { type MenuData } from "../MenuView";
import data from "../../../../../content/menu-soir-weekend.json";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <MenuView locale={locale === "en" ? "en" : "fr"} active="soir-weekend" menu={data as MenuData} />;
}
