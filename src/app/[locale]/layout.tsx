import type { Metadata } from "next";
import "../../styles/global.css";
import "../../styles/theme.css";

import Navbar from "@/components/layout/Navbar/Navbar"; // <= wrapper i18n (important)
import Footer from "@/components/layout/Footer";
import { Inter, Libre_Baskerville } from "next/font/google";
import { BookingProvider } from "@/components/booking/BookingProvider";
import BookingWidget from "@/components/booking/BookingWidget";

const fontDisplay = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-display",
});

const fontSans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

const META: Record<"fr" | "en", Metadata> = {
  fr: {
    title: "Le Faux Bistrot",
    description: "Cuisine française, produits frais et ambiance conviviale à Toulouse.",
  },
  en: {
    title: "Le Faux Bistrot",
    description: "French cuisine, fresh produce, and a friendly atmosphere in Toulouse.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l: "fr" | "en" = locale === "en" ? "en" : "fr";
  return META[l];
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const l: "fr" | "en" = locale === "en" ? "en" : "fr";

  return (
    <html lang={l} className={`${fontSans.variable} ${fontDisplay.variable}`}>
      <body>
        <BookingProvider>
          <Navbar locale={l} />
          <main>{children}</main>
          <Footer />
          <BookingWidget locale={l} />
        </BookingProvider>
      </body>
    </html>
  );
}