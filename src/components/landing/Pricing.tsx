"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckIcon, ArrowRightIcon } from "./Icons";

const plans = [
  {
    name: "Starter",
    description: "Para arrancar a organizar tu pipeline con AI.",
    price: { monthly: 19.99, annual: 15.99 },
    credits: "500",
    multiplier: null,
    features: [
      "Contactos ilimitados",
      "Pipeline completo con AI",
      "Seguimiento automático",
      "Spaces por cliente",
      "Reportes semanales",
    ],
    cta: "Escribinos",
    popular: false,
  },
  {
    name: "Pro",
    description: "Para quienes usan el CRM todos los días.",
    price: { monthly: 39.99, annual: 31.99 },
    credits: "2,000",
    multiplier: "2x",
    features: [
      "Todo lo del plan Starter",
      "2x más valor en créditos",
      "Alertas inteligentes",
      "Soporte prioritario",
    ],
    cta: "Elegir Pro",
    popular: true,
  },
  {
    name: "Ultra",
    description: "Para uso intensivo del CRM.",
    price: { monthly: 129.99, annual: 99.99 },
    credits: "10,000",
    multiplier: "4x",
    features: [
      "Todo lo del plan Pro",
      "4x más valor en créditos",
      "Múltiples pipelines",
      "Onboarding asistido",
    ],
    cta: "Escribinos",
    popular: false,
  },
];

function formatPrice(price: number) {
  const whole = Math.floor(price);
  const decimal = Math.round((price - whole) * 100);
  return { whole, decimal };
}

export function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section id="pricing" className="px-6 py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-transparent" />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1D1616] mb-4">
            Precios simples,
            <br />
            <span className="gradient-text">sin sorpresas</span>
          </h2>
          <p className="text-xl text-[#666666] max-w-2xl mx-auto font-light">
            Pagás un fijo mensual con créditos AI incluidos.
            <br />
            <span className="text-sm">Más grande el plan, más valor por tu dinero.</span>
          </p>
        </div>

        {/* Toggle */}
        <div className="flex items-center justify-center gap-2 mb-12">
          <button
            onClick={() => setIsAnnual(false)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
              !isAnnual 
                ? 'bg-[#1D1616] text-white' 
                : 'text-[#666666] hover:text-[#1D1616]'
            }`}
          >
            Mensual
          </button>
          <button
            onClick={() => setIsAnnual(true)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-2 ${
              isAnnual 
                ? 'bg-[#1D1616] text-white' 
                : 'text-[#666666] hover:text-[#1D1616]'
            }`}
          >
            Anual
            <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
              isAnnual ? 'bg-[#D84040] text-white' : 'bg-[#E0E0E0] text-[#666666]'
            }`}>
              hasta -23%
            </span>
          </button>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const price = isAnnual ? plan.price.annual : plan.price.monthly;
            const { whole, decimal } = formatPrice(price);
            
            return (
              <div
                key={plan.name}
                className={`relative bg-white rounded-2xl p-8 border transition-all duration-300 hover:shadow-xl ${
                  plan.popular 
                    ? 'border-[#8E1616] shadow-lg shadow-[#8E1616]/10 scale-105' 
                    : 'border-[#E0E0E0] hover:border-[#D0D0D0]'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-[#8E1616] to-[#D84040] text-white text-xs font-semibold px-4 py-1.5 rounded-full">
                      Más elegido
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-[#1D1616] mb-2">{plan.name}</h3>
                  <p className="text-sm text-[#666666]">{plan.description}</p>
                </div>

                <div className="mb-4">
                  <div className="flex items-baseline gap-0.5">
                    <span className="text-lg text-[#1D1616]">USD</span>
                    <span className="text-4xl font-bold text-[#1D1616]">
                      {whole}
                    </span>
                    <span className="text-lg font-semibold text-[#1D1616] self-start mt-1">
                      .{decimal.toString().padStart(2, '0')}
                    </span>
                    <span className="text-[#999999] ml-1">/mes</span>
                  </div>
                  {isAnnual && (
                    <p className="text-xs text-[#8E1616] mt-1">
                      Facturado anualmente
                    </p>
                  )}
                </div>

                {/* Credits info */}
                <div className="mb-6 p-3 bg-[#F5F5F5] rounded-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-[#1D1616]">{plan.credits} créditos/mes</span>
                    {plan.multiplier && (
                      <span className="text-xs font-bold text-white bg-[#8E1616] px-2 py-0.5 rounded">
                        {plan.multiplier}
                      </span>
                    )}
                  </div>
                </div>

                <Button
                  className={`w-full py-6 text-base rounded-xl mb-6 group ${
                    plan.popular
                      ? 'bg-gradient-to-r from-[#8E1616] to-[#D84040] hover:from-[#7A1313] hover:to-[#C03636] text-white shadow-lg shadow-[#D84040]/20'
                      : 'bg-[#1D1616] hover:bg-[#2A2020] text-white'
                  }`}
                >
                  {plan.cta}
                  <ArrowRightIcon className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>

                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[#666666]">
                      <CheckIcon className="w-5 h-5 text-[#8E1616] flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Credits explanation */}
        <div className="mt-16 max-w-2xl mx-auto text-center">
          <h3 className="text-lg font-semibold text-[#1D1616] mb-3">¿Qué son los créditos AI?</h3>
          <p className="text-sm text-[#666666] leading-relaxed">
            Cada interacción con la AI consume créditos: agregar un contacto, actualizar el pipeline, 
            generar un follow-up. Si necesitás más, podés comprar créditos adicionales.
          </p>
        </div>

        {/* Bottom note */}
        <p className="text-center text-sm text-[#999999] mt-8">
          ¿Tenés dudas? Escribinos y te ayudamos a elegir el plan ideal para vos.
        </p>
      </div>
    </section>
  );
}
