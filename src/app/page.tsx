import AvailabilitySection from "@/components/home/AvailabilitySection";
import BloodGroupSection from "@/components/home/BloodGroupSection";
import DonateResponsiblySection from "@/components/home/DonateResponsiblySection";
import FaqSection from "@/components/home/FaqSection";
import HeroSection from "@/components/home/HeroSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import PlatformStatsSection from "@/components/home/PlatformStatsSection";
import RecentDonorsSection from "@/components/home/RecentDonorsSection";
import SuccessStoriesSection from "@/components/home/SuccessStoriesSection";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <RecentDonorsSection />
      <BloodGroupSection />
      <HowItWorksSection />
      <AvailabilitySection />
      <PlatformStatsSection />
      <DonateResponsiblySection />
      <SuccessStoriesSection />
      <FaqSection />
    </main>
  );
}