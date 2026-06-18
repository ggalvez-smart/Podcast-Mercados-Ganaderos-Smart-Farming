import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// ----------------------------------------------------------------------------
// NOTA SOBRE TIPOGRAFÍAS:
//
// En producción, lo más prolijo es usar next/font/google con "Inter" para
// el cuerpo y "Fraunces" para los títulos (es el código que dejamos
// comentado más abajo, listo para activar). Ese enfoque descarga las
// fuentes en el momento de compilar el sitio y las sirve después sin
// depender de Google en cada visita.
//
// En ESTE entorno de demo (sandbox de desarrollo) no hay acceso a
// fonts.googleapis.com, así que usamos una alternativa sin conexión:
//   - Lora (variable, ya incluida en este proyecto como archivo local)
//     para los títulos, con next/font/local.
//   - La pila de fuentes del sistema operativo para el cuerpo de texto
//     (system-ui), que en celulares modernos ya es muy legible por
//     defecto (San Francisco en iOS, Roboto en Android).
//
// CUANDO TE LLEVES EL PROYECTO A TU MÁQUINA O A VERCEL (que sí tienen
// acceso normal a internet), podés activar el bloque de Google Fonts
// comentado abajo si preferís Inter/Fraunces en vez de las fuentes
// del sistema. Ambas opciones son válidas para producción.
// ----------------------------------------------------------------------------

const fraunces = localFont({
  src: "./fonts/Lora-Variable.ttf",
  variable: "--font-fraunces",
  display: "swap",
});

/* ALTERNATIVA PARA PRODUCCIÓN CON GOOGLE FONTS (requiere acceso a internet
   en el momento de compilar; recomendada si no usás las fuentes locales):

import { Inter, Fraunces } from "next/font/google";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["500", "600"],
});
*/

export const metadata: Metadata = {
  title: "El Podcast del Campo",
  description: "Escuchá todos los episodios del podcast semanal del campo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
