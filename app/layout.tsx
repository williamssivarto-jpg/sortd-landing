import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = "Sortd — AI holiday matcher for independent travel agents";
const description =
  "Turn vague holiday enquiries into qualified leads, 24/7. Sortd asks every website visitor the right questions, recommends best-fit holidays and sends a lead summary straight to your inbox.";

export const metadata: Metadata = {
  metadataBase: new URL("https://trysortd.co.uk"),
  title,
  description,
  openGraph: {
    title,
    description,
    url: "https://trysortd.co.uk",
    siteName: "Sortd",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-GB"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
