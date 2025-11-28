import { cn } from "@/lib/utils";
import {
  SparklesIcon,
  PipelineIcon,
  AutomationIcon,
  AgentIcon,
  SpaceIcon,
  RocketIcon,
} from "./Icons";

const features = [
  {
    title: "Carga asistida por AI",
    description:
      "Escribí lo que quieras. La AI entiende y completa los campos por vos.",
    iconType: "sparkles" as const,
    variant: "default" as const,
    colSpan: 2,
    rowSpan: 1,
  },
  {
    title: "Pipeline que se actualiza solo",
    description:
      "Detecta señales de tus conversaciones y mueve los deals automáticamente.",
    iconType: "pipeline" as const,
    variant: "featured" as const,
    colSpan: 1,
    rowSpan: 2,
  },
  {
    title: "Zero mantenimiento",
    description:
      "Olvidate de limpiar datos o actualizar estados. El CRM se cuida solo.",
    iconType: "automation" as const,
    variant: "accent" as const,
    colSpan: 1,
    rowSpan: 1,
  },
  {
    title: "Agentes que te ayudan a vender",
    description:
      "Follow-ups automáticos, recomendaciones y alertas antes de perder un deal.",
    iconType: "agent" as const,
    variant: "default" as const,
    colSpan: 1,
    rowSpan: 1,
  },
  {
    title: "Spaces por cliente",
    description:
      "Todo el contexto de cada cliente en un solo lugar. Compacto y completo.",
    iconType: "space" as const,
    variant: "default" as const,
    colSpan: 1,
    rowSpan: 1,
  },
  {
    title: "Arrancá en 2 minutos",
    description:
      "Sin configuraciones eternas. Sin mil campos obligatorios. Empezá a vender ya.",
    iconType: "rocket" as const,
    variant: "featured" as const,
    colSpan: 2,
    rowSpan: 1,
  },
];

function FeatureIcon({ iconType, variant }: { iconType: string; variant: string }) {
  const className = variant === "default" ? "w-6 h-6 text-[#8E1616]" : "w-6 h-6 text-white";
  
  switch (iconType) {
    case "sparkles":
      return <SparklesIcon className={className} />;
    case "pipeline":
      return <PipelineIcon className={className} />;
    case "automation":
      return <AutomationIcon className={className} />;
    case "agent":
      return <AgentIcon className={className} />;
    case "space":
      return <SpaceIcon className={className} />;
    case "rocket":
      return <RocketIcon className={className} />;
    default:
      return null;
  }
}

const variantStyles: Record<string, string> = {
  default: "bg-white border border-[#E0E0E0]",
  featured: "bg-[#1D1616] text-[#EEEEEE]",
  accent: "bg-gradient-to-br from-[#8E1616] to-[#D84040] text-white",
};

const iconBgStyles: Record<string, string> = {
  default: "bg-[#F5F5F5]",
  featured: "bg-[#3A2A2A]",
  accent: "bg-white/20",
};

export function BentoGrid() {
  return (
    <section className="px-6 py-20 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1D1616] mb-4">
          Simple. Poderoso. Automático.
        </h2>
        <p className="text-lg text-[#666666] max-w-2xl mx-auto">
          Un CRM que no te hace perder tiempo. La AI hace el trabajo pesado.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className={cn(
              "bento-card rounded-2xl p-6 flex flex-col justify-between min-h-[180px]",
              variantStyles[feature.variant],
              feature.colSpan === 2 && "md:col-span-2",
              feature.rowSpan === 2 && "md:row-span-2"
            )}
          >
            <div>
              <div
                className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
                  iconBgStyles[feature.variant]
                )}
              >
                <FeatureIcon iconType={feature.iconType} variant={feature.variant} />
              </div>
              <h3
                className={cn(
                  "text-lg font-semibold mb-2",
                  feature.variant === "default" && "text-[#1D1616]"
                )}
              >
                {feature.title}
              </h3>
              <p
                className={cn(
                  "text-sm leading-relaxed",
                  feature.variant === "default" && "text-[#666666]",
                  feature.variant === "featured" && "text-[#AAAAAA]",
                  feature.variant === "accent" && "text-white/80"
                )}
              >
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
