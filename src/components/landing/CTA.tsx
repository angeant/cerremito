import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "./Icons";

export function CTA() {
  return (
    <section className="px-6 py-24 relative overflow-hidden dot-grid-bg">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#8E1616]/5 via-transparent to-[#D84040]/5" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#D84040]/10 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-[#1D1616] mb-6">
          Tu próximo CRM.
          <br />
          <span className="gradient-text">Sin la complejidad.</span>
        </h2>
        
        <p className="text-xl text-[#666666] mb-10 max-w-xl mx-auto font-light">
          Escribinos y te contamos cómo arrancar en minutos.
        </p>
        
        <Button 
          size="lg" 
          className="bg-gradient-to-r from-[#8E1616] to-[#D84040] hover:from-[#7A1313] hover:to-[#C03636] text-white px-10 py-7 text-lg rounded-xl shadow-lg shadow-[#D84040]/25 group animate-pulse-glow"
        >
          Escribinos ahora
          <ArrowRightIcon className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
        </Button>
        
        <p className="mt-6 text-sm text-[#999999]">
          Sin compromiso. Te ayudamos a empezar.
        </p>
      </div>
    </section>
  );
}
