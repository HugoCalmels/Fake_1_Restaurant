import type { Metadata } from "next";
import "../styles/global.css";
import "../styles/theme.css";
import Navbar from "@/components/layout/Navbar";
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

export const metadata: Metadata = {
  title: "Site",
  description: "Base Next.js minimale",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${fontSans.variable} ${fontDisplay.variable}`}>
      <body>
        <BookingProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <BookingWidget />
        </BookingProvider>
      </body>
    </html>
  );
}