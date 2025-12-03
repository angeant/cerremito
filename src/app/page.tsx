import { Navbar, Hero, ProductPreview, BentoGrid, PipelineFollowUp, TargetAudience, Pricing, CTA, Footer } from "@/components/landing";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#EEEEEE]">
      <Navbar />
      <Hero />
      <ProductPreview />
      <BentoGrid />
      <PipelineFollowUp />
      <TargetAudience />
      <Pricing />
      <CTA />
      <Footer />
    </main>
  );
}
