import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://anantaayatra.com"),
  title: {
    default: "Anantaayatra | Discover the World",
    template: "%s | Anantaayatra",
  },
  description: "Discover the world's most breathtaking destinations, unique itineraries, and expert travel guides.",
  openGraph: {
    title: {
      default: "Anantaayatra | Discover the World",
      template: "%s | Anantaayatra",
    },
    description: "Discover the world's most breathtaking destinations, unique itineraries, and expert travel guides.",
    url: "/",
    siteName: "Anantaayatra",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: {
      default: "Anantaayatra | Discover the World",
      template: "%s | Anantaayatra",
    },
    description: "Discover the world's most breathtaking destinations, unique itineraries, and expert travel guides.",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-sans bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50 transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
