import { About } from "@/components/sections/about";
import { Certifications } from "@/components/sections/certifications";
import { ContactSection } from "@/components/sections/contact-section";
import { Faq } from "@/components/sections/faq";
import { HeroSection } from "@/components/sections/hero-section";
import { Services } from "@/components/sections/services";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <Certifications />
        <Services />
        <About />
        <Faq />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
