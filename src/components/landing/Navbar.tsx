"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Image from "next/image";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ${
        scrolled 
          ? "bg-[#EEEEEE]/95 backdrop-blur-md shadow-sm" 
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image 
            src="/logo_cerremito.svg" 
            alt="CERREMITO" 
            width={32} 
            height={32}
            className="w-8 h-8"
          />
          <span className="text-[#1D1616] font-semibold text-xl tracking-tight">
            CERREMITO
          </span>
        </div>
        
        {/* CTA */}
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            className="text-[#666666] hover:text-[#1D1616] hover:bg-white/50"
          >
            Iniciar sesión
          </Button>
          <Button 
            className="bg-[#1D1616] hover:bg-[#2A2020] text-white rounded-lg"
          >
            Empezar gratis
          </Button>
        </div>
      </div>
    </nav>
  );
}
