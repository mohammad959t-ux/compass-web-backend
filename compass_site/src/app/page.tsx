import { FeaturedProjects } from "../components/sections/FeaturedProjects";
import { FAQ } from "../components/sections/FAQ";
import { FinalCTA } from "../components/sections/FinalCTA";
import { Hero } from "../components/sections/Hero";
import { PackagesPreview } from "../components/sections/PackagesPreview";
import { ProcessSteps } from "../components/sections/ProcessSteps";
import { ReviewsPreview } from "../components/sections/ReviewsPreview";
import { ServicesPreview } from "../components/sections/ServicesPreview";
import { TrustStrip } from "../components/sections/TrustStrip";

export default function HomePage() {
  return (
    <div className="space-y-24">
      <Hero />
      <TrustStrip />
      <ProcessSteps />
      <ServicesPreview />
      <FeaturedProjects />
      <PackagesPreview />
      <ReviewsPreview />
      <FAQ />
      <FinalCTA />
    </div>
  );
}
