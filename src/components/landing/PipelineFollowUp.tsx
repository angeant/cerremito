"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface PipelineDeal {
  deal: string;
  stage: string;
  probability: string;
  value: string;
  nextStep: string;
  daysInStage: number;
}

interface FollowUpData {
  id: string;
  name: string;
  icon: string;
  chat: { role: "user" | "ai"; text: string }[];
  pipeline: PipelineDeal[];
}

const followUpScenarios: FollowUpData[] = [
  {
    id: "stalled",
    name: "Deals estancados",
    icon: "⏱️",
    chat: [
      { role: "ai", text: "TechCorp lleva 14 días en Demo sin avances. ¿Agendamos seguimiento?" },
      { role: "user", text: "Sí, mandales mail recordatorio" },
      { role: "ai", text: "Mail enviado. ¿Qué tal una llamada si no responden en 48hs?" },
      { role: "user", text: "Dale, agendá la llamada para el jueves" },
      { role: "ai", text: "Llamada agendada. También noté que DataMax está hace 21 días en Propuesta..." },
      { role: "user", text: "Con DataMax cerremos, no van a avanzar" },
      { role: "ai", text: "Entendido. Moví DataMax a perdido. ¿Razón? Precio, timing, competencia?" },
      { role: "user", text: "Eligieron competencia más barata" },
    ],
    pipeline: [
      { deal: "TechCorp SaaS", stage: "Demo", probability: "50%", value: "$18,000", nextStep: "Llamada Jueves", daysInStage: 14 },
      { deal: "StartupX MVP", stage: "Propuesta", probability: "70%", value: "$25,000", nextStep: "Revisar presupuesto", daysInStage: 5 },
      { deal: "DataMax CRM", stage: "Perdido", probability: "0%", value: "$12,000", nextStep: "-", daysInStage: 21 },
      { deal: "RetailPro", stage: "Negociación", probability: "80%", value: "$35,000", nextStep: "Enviar contrato", daysInStage: 3 },
    ],
  },
  {
    id: "hot",
    name: "Deals calientes",
    icon: "🔥",
    chat: [
      { role: "ai", text: "FinanceGroup pidió el contrato ayer. ¿Lo enviaste?" },
      { role: "user", text: "No todavía, lo mando ahora" },
      { role: "ai", text: "Dale. También LogísticaSur confirmó que firma mañana." },
      { role: "user", text: "Genial! Actualizá a 95% de probabilidad" },
      { role: "ai", text: "Hecho. Son $45,000 casi cerrados. ¿Preparamos el onboarding?" },
      { role: "user", text: "Sí, armá el kickoff para la próxima semana" },
      { role: "ai", text: "Kickoff tentativo creado. Te lo confirmo cuando firmen." },
      { role: "user", text: "Perfecto, gracias" },
    ],
    pipeline: [
      { deal: "FinanceGroup", stage: "Negociación", probability: "85%", value: "$28,000", nextStep: "Enviar contrato", daysInStage: 2 },
      { deal: "LogísticaSur", stage: "Propuesta", probability: "95%", value: "$45,000", nextStep: "Firma mañana", daysInStage: 1 },
      { deal: "MediaCorp", stage: "Demo", probability: "60%", value: "$15,000", nextStep: "2da reunión Lunes", daysInStage: 4 },
      { deal: "ConsultingPro", stage: "Contacto", probability: "30%", value: "$8,000", nextStep: "Llamada discovery", daysInStage: 0 },
    ],
  },
  {
    id: "followups",
    name: "Follow-ups pendientes",
    icon: "📋",
    chat: [
      { role: "ai", text: "Tenés 3 follow-ups pendientes para hoy. ¿Empezamos?" },
      { role: "user", text: "Dale, qué hay primero?" },
      { role: "ai", text: "María de CloudTech esperaba la propuesta revisada hace 2 días." },
      { role: "user", text: "Uh, la terminé ayer. Se la mando ahora" },
      { role: "ai", text: "Mandada. Siguiente: llamar a Pedro de InnovaCorp por el presupuesto." },
      { role: "user", text: "Lo llamo a las 3, anotá" },
      { role: "ai", text: "Agendado 15:00hs. Por último, revisar demo de AgileTeam grabada." },
      { role: "user", text: "Eso lo hago mañana temprano" },
    ],
    pipeline: [
      { deal: "CloudTech Infra", stage: "Propuesta", probability: "65%", value: "$22,000", nextStep: "Propuesta enviada", daysInStage: 7 },
      { deal: "InnovaCorp", stage: "Demo", probability: "55%", value: "$18,500", nextStep: "Llamada 15:00", daysInStage: 5 },
      { deal: "AgileTeam", stage: "Demo", probability: "45%", value: "$12,000", nextStep: "Revisar demo", daysInStage: 3 },
      { deal: "ScaleUp SA", stage: "Negociación", probability: "75%", value: "$32,000", nextStep: "Esperar OK legal", daysInStage: 2 },
    ],
  },
  {
    id: "weekly",
    name: "Resumen semanal",
    icon: "📊",
    chat: [
      { role: "ai", text: "Esta semana cerraste 2 deals por $67,000. Pipeline subió 12%." },
      { role: "user", text: "No está mal, qué hay para la próxima?" },
      { role: "ai", text: "Tenés $85,000 en deals que deberían cerrar en los próximos 7 días." },
      { role: "user", text: "Cuáles son los más probables?" },
      { role: "ai", text: "MegaCorp al 90% ($40k) y TechStart al 85% ($25k). Ambos esperan aprobación." },
      { role: "user", text: "Con MegaCorp hablo hoy, lo tengo" },
      { role: "ai", text: "Excelente. También hay 4 deals estancados que deberíamos revisar." },
      { role: "user", text: "Mañana los vemos" },
    ],
    pipeline: [
      { deal: "MegaCorp Enterprise", stage: "Propuesta", probability: "90%", value: "$40,000", nextStep: "Llamada hoy", daysInStage: 3 },
      { deal: "TechStart", stage: "Negociación", probability: "85%", value: "$25,000", nextStep: "Aprobación CEO", daysInStage: 2 },
      { deal: "GrowthCo", stage: "Demo", probability: "50%", value: "$15,000", nextStep: "Follow-up", daysInStage: 8 },
      { deal: "DigitalFirst", stage: "Contacto", probability: "25%", value: "$10,000", nextStep: "Calificar lead", daysInStage: 1 },
    ],
  },
];

const stageColors: Record<string, string> = {
  "Propuesta": "bg-green-500",
  "Negociación": "bg-yellow-500",
  "Demo": "bg-blue-500",
  "Contacto": "bg-gray-400",
  "Perdido": "bg-red-500",
};

export function PipelineFollowUp() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleMessages, setVisibleMessages] = useState(0);
  const [visibleDeals, setVisibleDeals] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const messageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const selectedScenario = followUpScenarios[currentIndex];

  const startAnimation = useCallback(() => {
    setVisibleMessages(0);
    setVisibleDeals(0);
    setIsAnimating(true);
    messageRefs.current = [];
    if (chatRef.current) {
      chatRef.current.scrollTop = 0;
    }
  }, []);

  const goToNextScenario = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % followUpScenarios.length);
  }, []);

  const selectScenario = (index: number) => {
    setIsPaused(false);
    setCurrentIndex(index);
  };

  useEffect(() => {
    startAnimation();
  }, [currentIndex, startAnimation]);

  useEffect(() => {
    if (!isAnimating) return;

    const messageInterval = setInterval(() => {
      setVisibleMessages((prev) => {
        if (prev >= selectedScenario.chat.length) {
          clearInterval(messageInterval);
          setIsAnimating(false);
          return prev;
        }
        return prev + 1;
      });
    }, 2000);

    return () => clearInterval(messageInterval);
  }, [isAnimating, selectedScenario.chat.length]);

  useEffect(() => {
    const dealIndex = Math.ceil(visibleMessages / 2);
    setVisibleDeals(Math.min(dealIndex, selectedScenario.pipeline.length));
  }, [visibleMessages, selectedScenario.pipeline.length]);

  useEffect(() => {
    if (visibleMessages > 0 && chatRef.current && messageRefs.current[visibleMessages - 1]) {
      const container = chatRef.current;
      const messageEl = messageRefs.current[visibleMessages - 1];
      
      if (messageEl) {
        setTimeout(() => {
          const messageBottom = messageEl.offsetTop + messageEl.offsetHeight;
          const containerScrollBottom = container.scrollTop + container.clientHeight;
          
          if (messageBottom > containerScrollBottom) {
            const newScrollTop = messageBottom - container.clientHeight + 16;
            container.scrollTo({
              top: newScrollTop,
              behavior: "smooth"
            });
          }
        }, 150);
      }
    }
  }, [visibleMessages]);

  useEffect(() => {
    if (isAnimating || isPaused) return;

    const rotateTimer = setTimeout(() => {
      goToNextScenario();
    }, 10000);

    return () => clearTimeout(rotateTimer);
  }, [isAnimating, isPaused, goToNextScenario]);

  useEffect(() => {
    const timer = setTimeout(() => startAnimation(), 500);
    return () => clearTimeout(timer);
  }, [startAnimation]);

  const calculateTotal = () => {
    return selectedScenario.pipeline
      .slice(0, visibleDeals)
      .filter(d => d.stage !== "Perdido")
      .reduce((acc, d) => {
        const num = parseInt(d.value.replace(/[$,]/g, ""));
        return acc + (isNaN(num) ? 0 : num);
      }, 0);
  };

  return (
    <section 
      id="pipeline-followup" 
      className="px-6 py-24 overflow-hidden bg-white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1D1616] mb-4">
            La AI que te empuja a cerrar.
          </h2>
          <p className="text-lg text-[#666666] max-w-2xl mx-auto">
            Seguimiento inteligente. Alertas proactivas. Nunca más un deal olvidado.
          </p>
        </div>

        {/* Scenario Selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {followUpScenarios.map((scenario, index) => (
            <button
              key={scenario.id}
              onClick={() => selectScenario(index)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2",
                currentIndex === index
                  ? "bg-gradient-to-r from-[#8E1616] to-[#D84040] text-white shadow-lg scale-105"
                  : "bg-white text-[#666666] border border-[#E0E0E0] hover:border-[#D84040] hover:text-[#D84040]"
              )}
            >
              <span>{scenario.icon}</span>
              <span>{scenario.name}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start max-w-5xl mx-auto">
          {/* Pipeline Table - Left */}
          <div className="perspective-left flex justify-center">
            <div className="table-3d-left bg-white rounded-2xl border border-[#E0E0E0] w-full overflow-hidden shadow-2xl">
              <div className="bg-gradient-to-r from-[#8E1616] to-[#D84040] text-white px-4 py-3 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-white/30" />
                <div className="w-3 h-3 rounded-full bg-white/30" />
                <div className="w-3 h-3 rounded-full bg-white/30" />
                <span className="ml-2 text-sm font-medium opacity-90">Pipeline con Next Steps</span>
                <span className="ml-auto text-xs opacity-70">{visibleDeals} deals</span>
              </div>

              <div className="divide-y divide-[#E0E0E0]">
                <div className="grid grid-cols-5 gap-1 px-3 py-2 bg-[#F5F5F5] text-[10px] font-semibold text-[#666666] uppercase tracking-wider">
                  <span>Deal</span>
                  <span>Etapa</span>
                  <span>Días</span>
                  <span>Next Step</span>
                  <span className="text-right">Valor</span>
                </div>

                <div className="min-h-[200px]">
                  {selectedScenario.pipeline.map((deal, i) => (
                    <div
                      key={`${selectedScenario.id}-deal-${i}`}
                      className={cn(
                        "grid grid-cols-5 gap-1 px-3 py-3 text-xs transition-all duration-500 border-b border-[#F0F0F0] last:border-0",
                        i < visibleDeals ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4",
                        deal.stage === "Perdido" && "bg-red-50"
                      )}
                      style={{ transitionDelay: `${i * 150}ms` }}
                    >
                      <span className={cn(
                        "font-medium truncate",
                        deal.stage === "Perdido" ? "text-[#999999] line-through" : "text-[#1D1616]"
                      )}>
                        {deal.deal}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className={cn("w-1.5 h-1.5 rounded-full", stageColors[deal.stage], i < visibleDeals && deal.stage !== "Perdido" && "animate-pulse")} />
                        <span className="text-[#666666] text-[10px]">{deal.stage}</span>
                      </span>
                      <span className={cn(
                        "text-[10px]",
                        deal.daysInStage > 10 ? "text-red-500 font-semibold" : "text-[#666666]"
                      )}>
                        {deal.daysInStage}d
                      </span>
                      <span className={cn(
                        "text-[10px] truncate",
                        deal.nextStep === "-" ? "text-[#999999]" : "text-[#8E1616] font-medium"
                      )}>
                        {deal.nextStep}
                      </span>
                      <span className={cn(
                        "text-right font-medium text-[11px]",
                        deal.stage === "Perdido" ? "text-[#999999] line-through" : "text-[#8E1616]"
                      )}>
                        {deal.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className={cn(
                  "grid grid-cols-5 gap-1 px-3 py-3 bg-[#F5F5F5] text-xs font-semibold transition-all duration-500",
                  visibleDeals > 0 ? "opacity-100" : "opacity-30"
                )}>
                  <span className="text-[#1D1616]">Pipeline activo</span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span className="text-right text-[#8E1616]">
                    ${calculateTotal().toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Chat - Right */}
          <div className="flex flex-col items-center">
            <div className="bg-white rounded-2xl border border-[#E0E0E0] w-full shadow-xl overflow-hidden">
              <div className="bg-[#1D1616] text-white px-4 py-3 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#8E1616] to-[#D84040] flex items-center justify-center font-bold text-sm">
                  C
                </div>
                <div>
                  <span className="text-sm font-medium">Seguimiento AI</span>
                  <span className="block text-xs opacity-70">{selectedScenario.name}</span>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <span className="text-[10px] opacity-50 bg-white/10 px-2 py-1 rounded">Proactivo</span>
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                </div>
              </div>

              <div ref={chatRef} className="h-[280px] overflow-y-auto p-3 space-y-2 bg-[#FAFAFA] relative">
                {selectedScenario.chat.slice(0, visibleMessages).map((msg, i) => (
                  <div
                    key={`${selectedScenario.id}-msg-${i}`}
                    ref={(el) => { messageRefs.current[i] = el; }}
                    className={cn(
                      "flex transition-all duration-300",
                      msg.role === "user" ? "justify-end" : "justify-start",
                      "opacity-100 translate-y-0"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[85%] px-3 py-2 rounded-2xl text-sm",
                        msg.role === "user"
                          ? "bg-[#1D1616] text-white rounded-br-md"
                          : "bg-white border border-[#E0E0E0] text-[#1D1616] rounded-bl-md shadow-sm"
                      )}
                    >
                      {msg.role === "ai" && i === 0 && (
                        <span className="inline-block w-2 h-2 bg-[#D84040] rounded-full mr-2 animate-pulse" />
                      )}
                      {msg.text}
                    </div>
                  </div>
                ))}

                {isAnimating && visibleMessages < selectedScenario.chat.length && visibleMessages > 0 && selectedScenario.chat[visibleMessages - 1]?.role === "user" && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-[#E0E0E0] px-4 py-2 rounded-2xl rounded-bl-md shadow-sm">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-[#D84040] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-2 h-2 bg-[#D84040] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-2 h-2 bg-[#D84040] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-3 border-t border-[#E0E0E0] bg-white">
                <div className="flex items-center gap-2 bg-[#F5F5F5] rounded-xl px-3 py-2">
                  <input
                    type="text"
                    placeholder="Respondé a la AI..."
                    className="flex-1 bg-transparent text-sm outline-none text-[#666666]"
                    disabled
                  />
                  <button className="w-8 h-8 rounded-lg bg-[#1D1616] flex items-center justify-center hover:bg-[#2A2020] transition-colors">
                    <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 2L11 13" />
                      <path d="M22 2L15 22L11 13L2 9L22 2Z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Progress indicator */}
            <div className="flex gap-1 mt-4">
              {followUpScenarios.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "h-1 rounded-full transition-all duration-300",
                    currentIndex === index ? "w-6 bg-[#D84040]" : "w-2 bg-[#E0E0E0]"
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Hover hint */}
        <p className="text-center text-xs text-[#999999] mt-6">
          Pasá el mouse para pausar · Hacé click en un escenario para verlo
        </p>
      </div>
    </section>
  );
}

