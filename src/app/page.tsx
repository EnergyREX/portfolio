import type { Metadata } from "next";
import Contact from "@/components/composed/home/Contact";
import Education from "@/components/composed/home/Education";
import Experience from "@/components/composed/home/Experience";
import FeaturedProject from "@/components/composed/home/FeaturedProject";
import HeroAbout from "@/components/composed/home/HeroAbout";
import TechnicalStack from "@/components/composed/home/TechnicalStack";
import { JsonLd } from "@/components/primitives/JsonLd";
import { SITE_AUTHOR, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/constants/SITE";
import { GITHUB_PROFILE_URL } from "@/lib/github";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: SITE_AUTHOR,
      url: SITE_URL,
      image: `${SITE_URL}/me.jpeg`,
      jobTitle: "Desarrollador de software fullstack",
      address: { "@type": "PostalAddress", addressLocality: "Almería", addressCountry: "ES" },
      sameAs: [
        GITHUB_PROFILE_URL,
        "https://www.linkedin.com/in/francisco-javier-mf/",
        "https://x.com/energyrexdev",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      inLanguage: "es",
      author: { "@id": `${SITE_URL}/#person` },
    },
  ],
};

export default function Home() {
  return (
      <div className="flex w-full flex-col divide-y divide-soft">
        <JsonLd data={structuredData} />

        <HeroAbout />
        <Experience />
        <FeaturedProject />
        <TechnicalStack />
        <Education />
        <Contact />

      </div>
  );
}
