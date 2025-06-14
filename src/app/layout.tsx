import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { Inter, IBM_Plex_Sans_Thai } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const ibm = IBM_Plex_Sans_Thai({
  variable: "--font-ibm",
  weight: ["400", "500", "700"],
  subsets: ["thai"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "KU Drop",
  description: "Real time app for ku bus tracking",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`font-sans ${inter.variable}  ${ibm.variable} antialiased`}
      >
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
