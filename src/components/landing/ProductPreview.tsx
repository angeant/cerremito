"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface IndustryData {
  id: string;
  name: string;
  icon: string;
  chat: { role: "user" | "ai"; text: string }[];
  clients: { name: string; company: string; status: string; value: string }[];
  pipeline: { deal: string; stage: string; probability: string; value: string }[];
}

const industries: IndustryData[] = [
  {
    id: "medicos",
    name: "Médicos",
    icon: "🩺",
    chat: [
      { role: "user", text: "Nueva paciente: Laura Méndez, consulta dermatología" },
      { role: "ai", text: "Agregué a Laura Méndez. ¿Agendo turno de seguimiento?" },
      { role: "user", text: "Sí, y el Dr. Ruiz me derivó a Carlos Vega" },
      { role: "ai", text: "Perfecto. Carlos Vega agregado como derivación del Dr. Ruiz." },
      { role: "user", text: "María Paz confirmó cirugía para marzo" },
      { role: "ai", text: "Excelente. Moví 'Cirugía Estética' a confirmado. $45,000." },
      { role: "user", text: "Roberto Luna pidió presupuesto de tratamiento" },
      { role: "ai", text: "Creé presupuesto 'Tratamiento Facial' en evaluación." },
    ],
    clients: [
      { name: "Laura Méndez", company: "Particular", status: "Activo", value: "$2,500" },
      { name: "Carlos Vega", company: "Derivación", status: "Nuevo", value: "$3,800" },
      { name: "María Paz", company: "Particular", status: "Activo", value: "$45,000" },
      { name: "Roberto Luna", company: "OSDE", status: "Pendiente", value: "$8,200" },
    ],
    pipeline: [
      { deal: "Cirugía Estética", stage: "Propuesta", probability: "90%", value: "$45,000" },
      { deal: "Tratamiento Facial", stage: "Demo", probability: "40%", value: "$8,200" },
      { deal: "Pack Consultas", stage: "Negociación", probability: "60%", value: "$12,000" },
      { deal: "Chequeo Anual", stage: "Contacto", probability: "20%", value: "$1,500" },
    ],
  },
  {
    id: "abogados",
    name: "Abogados",
    icon: "⚖️",
    chat: [
      { role: "user", text: "Nuevo caso: Familia Rodríguez, divorcio" },
      { role: "ai", text: "Caso creado. Familia Rodríguez - Divorcio. ¿Honorarios?" },
      { role: "user", text: "Estimado $15,000. Y sumá a TechCorp por demanda laboral" },
      { role: "ai", text: "TechCorp agregado. Caso laboral en evaluación inicial." },
      { role: "user", text: "García & Asociados firmó contrato de asesoría" },
      { role: "ai", text: "Felicitaciones! Asesoría Empresarial cerrado por $36,000/año." },
      { role: "user", text: "Juan Pérez consulta por sucesión" },
      { role: "ai", text: "Agregué consulta sucesoria de Juan Pérez. Primera reunión pendiente." },
    ],
    clients: [
      { name: "Fam. Rodríguez", company: "Particular", status: "Activo", value: "$15,000" },
      { name: "TechCorp SA", company: "Empresa", status: "Nuevo", value: "$25,000" },
      { name: "García & Asoc.", company: "Estudio", status: "Activo", value: "$36,000" },
      { name: "Juan Pérez", company: "Particular", status: "Pendiente", value: "$8,000" },
    ],
    pipeline: [
      { deal: "Asesoría Empresarial", stage: "Propuesta", probability: "95%", value: "$36,000" },
      { deal: "Caso Laboral", stage: "Demo", probability: "50%", value: "$25,000" },
      { deal: "Divorcio Rodríguez", stage: "Negociación", probability: "70%", value: "$15,000" },
      { deal: "Sucesión Pérez", stage: "Contacto", probability: "30%", value: "$8,000" },
    ],
  },
  {
    id: "agencias",
    name: "Agencias",
    icon: "📱",
    chat: [
      { role: "user", text: "Café Aroma quiere manejo de redes, 3 plataformas" },
      { role: "ai", text: "Lead creado: Café Aroma - Pack 3 redes. ¿Presupuesto mensual?" },
      { role: "user", text: "$8,000/mes. Y FitLife cerró el anual!" },
      { role: "ai", text: "Genial! FitLife pasó a cliente. Contrato anual $144,000." },
      { role: "user", text: "StartupX pide propuesta de branding completo" },
      { role: "ai", text: "Propuesta de branding creada para StartupX. $55,000." },
      { role: "user", text: "La inmobiliaria del centro quiere solo Instagram" },
      { role: "ai", text: "Inmobiliaria Centro agregada. Pack Instagram básico." },
    ],
    clients: [
      { name: "Café Aroma", company: "Gastro", status: "Nuevo", value: "$8,000" },
      { name: "FitLife Gym", company: "Fitness", status: "Activo", value: "$12,000" },
      { name: "StartupX", company: "Tech", status: "Pendiente", value: "$55,000" },
      { name: "Inmob. Centro", company: "Real Estate", status: "Nuevo", value: "$4,500" },
    ],
    pipeline: [
      { deal: "FitLife Anual", stage: "Propuesta", probability: "100%", value: "$144,000" },
      { deal: "Branding StartupX", stage: "Demo", probability: "60%", value: "$55,000" },
      { deal: "Pack Café Aroma", stage: "Negociación", probability: "80%", value: "$96,000" },
      { deal: "IG Inmobiliaria", stage: "Contacto", probability: "40%", value: "$54,000" },
    ],
  },
  {
    id: "inmobiliarias",
    name: "Inmobiliarias",
    icon: "🏠",
    chat: [
      { role: "user", text: "Los García buscan depto 3 amb en Palermo" },
      { role: "ai", text: "Búsqueda creada: García - 3 amb Palermo. Presupuesto?" },
      { role: "user", text: "Hasta USD 180k. Y Martínez hizo oferta por el PH" },
      { role: "ai", text: "Oferta registrada! PH Belgrano - Martínez: USD 220,000." },
      { role: "user", text: "Cerramos la venta del local en Caballito" },
      { role: "ai", text: "Felicitaciones! Venta Local Caballito: USD 95,000. Comisión: $2,850." },
      { role: "user", text: "Nueva tasación: casa en Olivos de los Fernández" },
      { role: "ai", text: "Tasación agendada. Casa Olivos - Fernández." },
    ],
    clients: [
      { name: "Familia García", company: "Comprador", status: "Activo", value: "USD 180k" },
      { name: "Sr. Martínez", company: "Comprador", status: "Activo", value: "USD 220k" },
      { name: "Local Caballito", company: "Vendedor", status: "Cerrado", value: "USD 95k" },
      { name: "Sra. Fernández", company: "Vendedor", status: "Nuevo", value: "USD 350k" },
    ],
    pipeline: [
      { deal: "PH Belgrano", stage: "Propuesta", probability: "75%", value: "$6,600" },
      { deal: "Depto Palermo", stage: "Demo", probability: "40%", value: "$5,400" },
      { deal: "Casa Olivos", stage: "Negociación", probability: "30%", value: "$10,500" },
      { deal: "Oficina Centro", stage: "Contacto", probability: "20%", value: "$4,200" },
    ],
  },
  {
    id: "consultores",
    name: "Consultores",
    icon: "💼",
    chat: [
      { role: "user", text: "DataTech quiere diagnóstico de procesos" },
      { role: "ai", text: "Oportunidad creada: DataTech - Diagnóstico. ¿Alcance?" },
      { role: "user", text: "Full, 3 áreas. Y Logística Sur aceptó la propuesta" },
      { role: "ai", text: "Excelente! Logística Sur cerrado. Proyecto $28,000." },
      { role: "user", text: "FinanceGroup necesita implementación de OKRs" },
      { role: "ai", text: "Propuesta OKRs creada para FinanceGroup. $15,000." },
      { role: "user", text: "RetailMax pide workshop de liderazgo" },
      { role: "ai", text: "Workshop agendado. RetailMax - Liderazgo: $4,500." },
    ],
    clients: [
      { name: "DataTech", company: "Tecnología", status: "Nuevo", value: "$18,000" },
      { name: "Logística Sur", company: "Logística", status: "Activo", value: "$28,000" },
      { name: "FinanceGroup", company: "Finanzas", status: "Pendiente", value: "$15,000" },
      { name: "RetailMax", company: "Retail", status: "Nuevo", value: "$4,500" },
    ],
    pipeline: [
      { deal: "Proyecto Logística", stage: "Propuesta", probability: "100%", value: "$28,000" },
      { deal: "Diagnóstico DataTech", stage: "Demo", probability: "60%", value: "$18,000" },
      { deal: "OKRs FinanceGroup", stage: "Negociación", probability: "50%", value: "$15,000" },
      { deal: "Workshop Retail", stage: "Contacto", probability: "70%", value: "$4,500" },
    ],
  },
  {
    id: "coaches",
    name: "Coaches",
    icon: "🎯",
    chat: [
      { role: "user", text: "Mariana empezó programa de 12 sesiones" },
      { role: "ai", text: "Cliente activo: Mariana - Pack 12. Primera sesión agendada." },
      { role: "user", text: "El equipo de ventas de SoftCo quiere training grupal" },
      { role: "ai", text: "Propuesta grupal creada: SoftCo - 8 personas, 4 sesiones." },
      { role: "user", text: "Lucas terminó y quiere renovar con sesiones sueltas" },
      { role: "ai", text: "Lucas renovado. Pack 4 sesiones mensuales: $1,200." },
      { role: "user", text: "Referido de Ana: Javier busca coaching ejecutivo" },
      { role: "ai", text: "Lead de referido: Javier - Ejecutivo. Llamada inicial pendiente." },
    ],
    clients: [
      { name: "Mariana S.", company: "Individual", status: "Activo", value: "$3,600" },
      { name: "SoftCo Team", company: "Corporativo", status: "Nuevo", value: "$8,000" },
      { name: "Lucas M.", company: "Individual", status: "Activo", value: "$1,200" },
      { name: "Javier R.", company: "Ejecutivo", status: "Pendiente", value: "$4,800" },
    ],
    pipeline: [
      { deal: "Pack Mariana", stage: "Propuesta", probability: "100%", value: "$3,600" },
      { deal: "Training SoftCo", stage: "Demo", probability: "70%", value: "$8,000" },
      { deal: "Coaching Javier", stage: "Negociación", probability: "50%", value: "$4,800" },
      { deal: "Renovación Lucas", stage: "Contacto", probability: "90%", value: "$1,200" },
    ],
  },
  {
    id: "developers",
    name: "Developers",
    icon: "💻",
    chat: [
      { role: "user", text: "E-commerce para TiendaModa, Shopify custom" },
      { role: "ai", text: "Proyecto creado: TiendaModa - E-commerce Shopify. Estimación?" },
      { role: "user", text: "$12,000. Y la app de delivery ya tiene milestone 1 aprobado" },
      { role: "ai", text: "Milestone 1 DeliveryApp cobrado. Siguiente: $8,000." },
      { role: "user", text: "StartupAI necesita MVP en 6 semanas" },
      { role: "ai", text: "Propuesta MVP creada: StartupAI - Sprint 6 semanas: $18,000." },
      { role: "user", text: "Mantenimiento mensual para los 3 clientes activos" },
      { role: "ai", text: "Contratos de mantenimiento actualizados. MRR: $2,400." },
    ],
    clients: [
      { name: "TiendaModa", company: "Retail", status: "Nuevo", value: "$12,000" },
      { name: "DeliveryApp", company: "Startup", status: "Activo", value: "$24,000" },
      { name: "StartupAI", company: "Tech", status: "Pendiente", value: "$18,000" },
      { name: "3 Clientes", company: "Mant.", status: "Activo", value: "$2,400" },
    ],
    pipeline: [
      { deal: "App Delivery M2", stage: "Propuesta", probability: "95%", value: "$8,000" },
      { deal: "MVP StartupAI", stage: "Demo", probability: "60%", value: "$18,000" },
      { deal: "E-com TiendaModa", stage: "Negociación", probability: "80%", value: "$12,000" },
      { deal: "Mantenimiento", stage: "Contacto", probability: "100%", value: "$2,400" },
    ],
  },
  {
    id: "contadores",
    name: "Contadores",
    icon: "📊",
    chat: [
      { role: "user", text: "Nuevo monotributista: Diego, categoría E" },
      { role: "ai", text: "Cliente creado: Diego - Monotributo E. Fee mensual: $8,000." },
      { role: "user", text: "ImportMax necesita balance y DJ anual" },
      { role: "ai", text: "Servicio anual agregado: ImportMax - Balance + DJ: $180,000." },
      { role: "user", text: "PyME del referido de Carlos, SRL con 5 empleados" },
      { role: "ai", text: "Lead de referido: PyME SRL - Sueldos + Impuestos." },
      { role: "user", text: "Recordame renovar contrato con Distribuidora López" },
      { role: "ai", text: "Alerta creada: Renovación López vence en 30 días. $45,000/año." },
    ],
    clients: [
      { name: "Diego R.", company: "Monotributo", status: "Activo", value: "$8,000" },
      { name: "ImportMax SA", company: "SA", status: "Activo", value: "$180,000" },
      { name: "PyME Nueva", company: "SRL", status: "Nuevo", value: "$25,000" },
      { name: "Distrib. López", company: "SA", status: "Pendiente", value: "$45,000" },
    ],
    pipeline: [
      { deal: "Balance ImportMax", stage: "Propuesta", probability: "100%", value: "$180,000" },
      { deal: "Onboard PyME", stage: "Demo", probability: "70%", value: "$25,000" },
      { deal: "Renovación López", stage: "Negociación", probability: "85%", value: "$45,000" },
      { deal: "Fee Diego", stage: "Contacto", probability: "100%", value: "$96,000" },
    ],
  },
];

const stageColors: Record<string, string> = {
  "Propuesta": "bg-green-500",
  "Negociación": "bg-yellow-500",
  "Demo": "bg-blue-500",
  "Contacto": "bg-gray-400",
};

const statusColors: Record<string, string> = {
  "Activo": "bg-green-500",
  "Nuevo": "bg-blue-500",
  "Pendiente": "bg-yellow-500",
  "Cerrado": "bg-purple-500",
};

export function ProductPreview() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleMessages, setVisibleMessages] = useState(0);
  const [visibleClients, setVisibleClients] = useState(0);
  const [visibleDeals, setVisibleDeals] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const messageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const selectedIndustry = industries[currentIndex];

  const startAnimation = useCallback(() => {
    setVisibleMessages(0);
    setVisibleClients(0);
    setVisibleDeals(0);
    setIsAnimating(true);
    messageRefs.current = [];
    // Reset scroll to top
    if (chatRef.current) {
      chatRef.current.scrollTop = 0;
    }
  }, []);

  const goToNextIndustry = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % industries.length);
  }, []);

  const selectIndustry = (index: number) => {
    setIsPaused(false);
    setCurrentIndex(index);
  };

  // Start animation when industry changes
  useEffect(() => {
    startAnimation();
  }, [currentIndex, startAnimation]);

  // Message animation interval
  useEffect(() => {
    if (!isAnimating) return;

    const messageInterval = setInterval(() => {
      setVisibleMessages((prev) => {
        if (prev >= selectedIndustry.chat.length) {
          clearInterval(messageInterval);
          setIsAnimating(false);
          return prev;
        }
        return prev + 1;
      });
    }, 2000); // 2 seconds between messages

    return () => clearInterval(messageInterval);
  }, [isAnimating, selectedIndustry.chat.length]);

  // Sync clients and deals with messages
  useEffect(() => {
    const clientIndex = Math.floor(visibleMessages / 2);
    setVisibleClients(Math.min(clientIndex, selectedIndustry.clients.length));
    setVisibleDeals(Math.min(clientIndex, selectedIndustry.pipeline.length));
  }, [visibleMessages, selectedIndustry.clients.length, selectedIndustry.pipeline.length]);

  // Scroll within chat container - only scroll if message is out of view
  useEffect(() => {
    if (visibleMessages > 0 && chatRef.current && messageRefs.current[visibleMessages - 1]) {
      const container = chatRef.current;
      const messageEl = messageRefs.current[visibleMessages - 1];
      
      if (messageEl) {
        // Wait for message to render
        setTimeout(() => {
          const messageBottom = messageEl.offsetTop + messageEl.offsetHeight;
          const containerScrollBottom = container.scrollTop + container.clientHeight;
          
          // Only scroll if message is below the visible area
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

  // Auto-rotate to next industry after animation completes
  useEffect(() => {
    if (isAnimating || isPaused) return;

    const rotateTimer = setTimeout(() => {
      goToNextIndustry();
    }, 12000); // 12 seconds pause before rotating

    return () => clearTimeout(rotateTimer);
  }, [isAnimating, isPaused, goToNextIndustry]);

  // Initial start
  useEffect(() => {
    const timer = setTimeout(() => startAnimation(), 500);
    return () => clearTimeout(timer);
  }, [startAnimation]);

  const calculateTotal = () => {
    return selectedIndustry.pipeline
      .slice(0, visibleDeals)
      .reduce((acc, d) => {
        const num = parseInt(d.value.replace(/[$,]/g, ""));
        return acc + (isNaN(num) ? 0 : num);
      }, 0);
  };

  return (
    <section 
      id="product-preview" 
      className="px-6 py-24 overflow-hidden bg-[#FAFAFA]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1D1616] mb-4">
            Hablás. El CRM se actualiza.
          </h2>
          <p className="text-lg text-[#666666] max-w-2xl mx-auto">
            Decile a la AI qué pasó. Ella se encarga del resto.
          </p>
        </div>

        {/* Industry Selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {industries.map((industry, index) => (
            <button
              key={industry.id}
              onClick={() => selectIndustry(index)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2",
                currentIndex === index
                  ? "bg-[#1D1616] text-white shadow-lg scale-105"
                  : "bg-white text-[#666666] border border-[#E0E0E0] hover:border-[#1D1616] hover:text-[#1D1616]"
              )}
            >
              <span>{industry.icon}</span>
              <span>{industry.name}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Clients Table - Left */}
          <div className="perspective-left flex justify-center lg:justify-end">
            <div className="table-3d-left bg-white rounded-2xl border border-[#E0E0E0] w-full max-w-sm overflow-hidden shadow-2xl">
              <div className="bg-[#1D1616] text-white px-4 py-3 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#D84040]" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-2 text-sm font-medium opacity-80">Clientes</span>
                <span className="ml-auto text-xs opacity-50">{visibleClients} registros</span>
              </div>

              <div className="divide-y divide-[#E0E0E0]">
                <div className="grid grid-cols-4 gap-1 px-3 py-2 bg-[#F5F5F5] text-[10px] font-semibold text-[#666666] uppercase tracking-wider">
                  <span>Nombre</span>
                  <span>Tipo</span>
                  <span>Estado</span>
                  <span className="text-right">Valor</span>
                </div>

                <div className="min-h-[160px]">
                  {selectedIndustry.clients.map((client, i) => (
                    <div
                      key={`${selectedIndustry.id}-client-${i}`}
                      className={cn(
                        "grid grid-cols-4 gap-1 px-3 py-2.5 text-xs transition-all duration-500",
                        i < visibleClients ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                      )}
                      style={{ transitionDelay: `${i * 100}ms` }}
                    >
                      <span className="font-medium text-[#1D1616] truncate">{client.name}</span>
                      <span className="text-[#666666] truncate">{client.company}</span>
                      <span className="flex items-center gap-1">
                        <span className={cn("w-1.5 h-1.5 rounded-full", statusColors[client.status], i < visibleClients && "animate-pulse")} />
                        <span className="text-[#666666] text-[10px]">{client.status}</span>
                      </span>
                      <span className="text-right font-medium text-[#1D1616] text-[11px]">{client.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Chat - Center */}
          <div className="flex flex-col items-center">
            <div className="bg-white rounded-2xl border border-[#E0E0E0] w-full max-w-sm shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-[#8E1616] to-[#D84040] text-white px-4 py-3 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">
                  C
                </div>
                <div>
                  <span className="text-sm font-medium">CERREMITO AI</span>
                  <span className="block text-xs opacity-70">{selectedIndustry.name}</span>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                </div>
              </div>

              <div ref={chatRef} className="h-[260px] overflow-y-auto p-3 space-y-2 bg-[#FAFAFA] relative">
                {selectedIndustry.chat.slice(0, visibleMessages).map((msg, i) => (
                  <div
                    key={`${selectedIndustry.id}-msg-${i}`}
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
                          : "bg-white border border-[#E0E0E0] text-[#1D1616] rounded-bl-md"
                      )}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}

                {isAnimating && visibleMessages < selectedIndustry.chat.length && visibleMessages > 0 && selectedIndustry.chat[visibleMessages - 1]?.role === "user" && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-[#E0E0E0] px-4 py-2 rounded-2xl rounded-bl-md">
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
                    placeholder="Escribí algo..."
                    className="flex-1 bg-transparent text-sm outline-none text-[#666666]"
                    disabled
                  />
                  <button className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#8E1616] to-[#D84040] flex items-center justify-center">
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
              {industries.map((_, index) => (
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

          {/* Pipeline Table - Right */}
          <div className="perspective-right flex justify-center lg:justify-start">
            <div className="table-3d-right bg-white rounded-2xl border border-[#E0E0E0] w-full max-w-sm overflow-hidden shadow-2xl">
              <div className="bg-gradient-to-r from-[#8E1616] to-[#D84040] text-white px-4 py-3 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-white/30" />
                <div className="w-3 h-3 rounded-full bg-white/30" />
                <div className="w-3 h-3 rounded-full bg-white/30" />
                <span className="ml-2 text-sm font-medium opacity-90">Pipeline</span>
                <span className="ml-auto text-xs opacity-70">{visibleDeals} deals</span>
              </div>

              <div className="divide-y divide-[#E0E0E0]">
                <div className="grid grid-cols-4 gap-1 px-3 py-2 bg-[#F5F5F5] text-[10px] font-semibold text-[#666666] uppercase tracking-wider">
                  <span>Deal</span>
                  <span>Etapa</span>
                  <span>Prob.</span>
                  <span className="text-right">Valor</span>
                </div>

                <div className="min-h-[160px]">
                  {selectedIndustry.pipeline.map((deal, i) => (
                    <div
                      key={`${selectedIndustry.id}-deal-${i}`}
                      className={cn(
                        "grid grid-cols-4 gap-1 px-3 py-2.5 text-xs transition-all duration-500",
                        i < visibleDeals ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                      )}
                      style={{ transitionDelay: `${i * 100}ms` }}
                    >
                      <span className="font-medium text-[#1D1616] truncate">{deal.deal}</span>
                      <span className="flex items-center gap-1">
                        <span className={cn("w-1.5 h-1.5 rounded-full", stageColors[deal.stage], i < visibleDeals && "animate-pulse")} />
                        <span className="text-[#666666] text-[10px]">{deal.stage}</span>
                      </span>
                      <span className="text-[#666666]">{deal.probability}</span>
                      <span className="text-right font-medium text-[#8E1616] text-[11px]">{deal.value}</span>
                    </div>
                  ))}
                </div>

                <div className={cn(
                  "grid grid-cols-4 gap-1 px-3 py-2.5 bg-[#F5F5F5] text-xs font-semibold transition-all duration-500",
                  visibleDeals > 0 ? "opacity-100" : "opacity-30"
                )}>
                  <span className="text-[#1D1616]">Total</span>
                  <span></span>
                  <span></span>
                  <span className="text-right text-[#8E1616]">
                    ${calculateTotal().toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hover hint */}
        <p className="text-center text-xs text-[#999999] mt-6">
          Pasá el mouse para pausar · Hacé click en un rubro para verlo
        </p>
      </div>
    </section>
  );
}
