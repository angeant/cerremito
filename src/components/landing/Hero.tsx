import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRightIcon } from "./Icons";

export function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center px-6 py-16 overflow-hidden grid-bg">
      {/* Background glow elements */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#D84040]/8 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-[#8E1616]/8 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <Badge 
          variant="secondary" 
          className="mb-6 px-4 py-2 text-sm font-medium bg-white border border-[#E0E0E0] text-[#1D1616] shadow-sm"
        >
          El CRM que trabaja por vos
        </Badge>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
          <span className="text-[#1D1616]">CRM ultra fácil.</span>
          <br />
          <span className="gradient-text">Monitoreado por AI.</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-[#666666] max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          Dejá que la inteligencia artificial mantenga tu pipeline actualizado. 
          Vos enfocate en vender.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="bg-[#1D1616] hover:bg-[#2A2020] text-white px-8 py-6 text-lg rounded-xl group shadow-lg shadow-[#1D1616]/20"
          >
            Escribinos y arrancamos
            <ArrowRightIcon className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-[#D0D0D0] hover:bg-white/80 hover:border-[#B0B0B0] px-8 py-6 text-lg rounded-xl"
          >
            Ver precios
          </Button>
        </div>
        
        <p className="mt-6 text-sm text-[#999999]">
          Te contamos cómo iniciar en minutos.
        </p>
      </div>
    </section>
  );
}
