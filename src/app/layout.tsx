import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Cabinet Grotesk - distintiva y moderna
const cabinet = localFont({
  src: [
    {
      path: "../fonts/CabinetGrotesk-Variable.woff2",
      style: "normal",
    },
  ],
  variable: "--font-cabinet",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CERREMITO | Sales Operating System",
  description: "El CRM más simple del mundo. Impulsado por AI Agents. Zero maintenance. Para solopreneurs, vendedores independientes y equipos comerciales que quieren cerrar más, no mantener sistemas.",
  keywords: ["CRM", "sales", "AI", "ventas", "pipeline", "solopreneurs", "startups"],
  authors: [{ name: "CERREMITO" }],
  openGraph: {
    title: "CERREMITO | Sales Operating System",
    description: "Simple. Poderoso. Automático.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${cabinet.variable} antialiased font-sans`}>
        {children}
      </body>
    </html>
  );
}
