import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Unizik Talkative | Digital Media & Advertising Platform",
    template: "%s | Unizik Talkative",
  },
  description: "Connect with thousands daily. Professional digital media platform for news, entertainment, and high-impact advertising.",
  keywords: ["WhatsApp TV", "digital media", "advertising", "blog", "Websyncdigital"],
  authors: [{ name: "Websyncdigital" }],
  creator: "Websyncdigital",
  metadataBase: new URL("https://your-domain.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-domain.com",
    title: "WhatsApp TV - Premium Digital Media",
    description: "Your daily source for entertainment and news. Scale your brand with our reach.",
    siteName: "WhatsApp TV",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="font-sans antialiased text-slate-900 selection:bg-primary-light selection:text-primary-dark">
        {children}
      </body>
    </html>
  );
}

