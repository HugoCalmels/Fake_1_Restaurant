import PhotosGallery from "./PhotosGallery";

// Page serveur : récupère la langue de l'URL et la transmet à la galerie (client).
export default async function PhotosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <PhotosGallery locale={locale === "en" ? "en" : "fr"} />;
}
