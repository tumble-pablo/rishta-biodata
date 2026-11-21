import type { Metadata } from "next";
import { Noto_Sans_Devanagari, Noto_Serif_Devanagari, Playfair_Display, Public_Sans, Sora } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const GA_MEASUREMENT_ID = "G-KWWCWQE1YB";

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

// Fallback for Hindi/Marathi text (printed biodata labels, typed values,
// the Hindi FAQ). Public Sans and Sora have no Devanagari glyphs, and
// relying on each phone's system font makes the downloaded PDF look
// different from device to device.
const notoDevanagari = Noto_Sans_Devanagari({
  variable: "--font-devanagari",
  subsets: ["devanagari"],
  weight: ["400", "600"],
  display: "swap",
});

// Display serif for the site's large headings and the traditional biodata
// templates (with a Devanagari serif for Hindi/Marathi biodatas).
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const notoSerifDevanagari = Noto_Serif_Devanagari({
  variable: "--font-devanagari-serif",
  subsets: ["devanagari"],
  weight: ["500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rishtabiodata.com"),
  title: "Rishta Biodata — Create a beautiful marriage biodata",
  description:
    "Create a thoughtful marriage biodata and pay only when you are ready to download it.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${publicSans.variable} ${sora.variable} ${notoDevanagari.variable} ${playfair.variable} ${notoSerifDevanagari.variable} antialiased`}>
        {children}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
