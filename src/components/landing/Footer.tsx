export function Footer() {
  return (
    <footer className="px-6 py-12 border-t border-[#E0E0E0]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-br from-[#8E1616] to-[#D84040] rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-xs">C</span>
          </div>
          <span className="text-[#1D1616] font-semibold tracking-tight">
            CERREMITO
          </span>
        </div>
        
        {/* Copyright */}
        <p className="text-sm text-[#999999]">
          {new Date().getFullYear()} CERREMITO. Simple. Poderoso. Automático.
        </p>
      </div>
    </footer>
  );
}
