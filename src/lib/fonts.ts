import { Bebas_Neue, Titillium_Web, JetBrains_Mono } from "next/font/google";

export const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas-neue",
  subsets: ["latin-ext"]
})

export const titillium = Titillium_Web({
  weight: ["200", "300", "400", "600", "700", "900"],
  variable: "--font-titillium",
  subsets: ["latin-ext"]
}) 

export const JBMono = JetBrains_Mono({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--jb-mono",
  subsets: ["latin-ext"]
})