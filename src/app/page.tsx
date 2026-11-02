import Contact from "@/components/composed/home/Contact";
import Education from "@/components/composed/home/Education";
import Experience from "@/components/composed/home/Experience";
import FeaturedProject from "@/components/composed/home/FeaturedProject";
import HeroAbout from "@/components/composed/home/HeroAbout";
import TechnicalStack from "@/components/composed/home/TechnicalStack";

export default function Home() {
  return (
      <div className="flex w-full flex-col divide-y divide-soft">

        <HeroAbout />
        <Experience />
        <FeaturedProject />
        <TechnicalStack />
        <Education />
        <Contact />
        
      </div>
  );
}
