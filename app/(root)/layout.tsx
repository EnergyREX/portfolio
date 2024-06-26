import type { Metadata } from "next";
import { Inter } from "next/font/google";
import styles from "./globals.module.css"
import Footer from "../components/ui/Footer/Footer"
import Navbar from "../components/ui/Nav/Navbar";

export const metadata: Metadata = {
  title: "EnergyREX's Portfolio",
  description: "EnergyREX's developer portfolio",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={inter.className} lang="en">
      <body className={styles.mainBody}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
