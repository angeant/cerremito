import { CheckIcon } from "./Icons";

const audiences = [
  "Solopreneurs",
  "Vendedores independientes",
  "PyMEs",
  "Startups en early stage",
  "Equipos comerciales chicos",
];

export function TargetAudience() {
  return (
    <section className="px-6 py-20 bg-[#1D1616]">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#EEEEEE] mb-4">
          Para los que no quieren HubSpot ni Salesforce
        </h2>
        <p className="text-lg text-[#999999] mb-12">
          Hay 100 CRMs. CERREMITO compite por simplicidad y autonomía.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          {audiences.map((audience, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-[#2A2020] px-5 py-3 rounded-xl border border-[#3A2A2A]"
            >
              <CheckIcon className="w-4 h-4 text-[#D84040]" />
              <span className="text-[#EEEEEE] font-medium">{audience}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
