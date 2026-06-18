// ============================================================================
// Protección de rutas según el estado de login
// ============================================================================
// NOTA TÉCNICA: en versiones anteriores de Next.js este archivo se
// llamaba "middleware.ts". A partir de Next.js 16 se renombró a
// "proxy.ts", y debe exportar una función llamada "proxy" (o una
// función por defecto, como hacemos acá).
//
// Esta función se ejecuta automáticamente antes de mostrar cualquier
// página que coincida con las rutas indicadas en "matcher" al final
// del archivo. Usa la regla que definimos en auth.config.ts (el
// callback "authorized") para decidir si deja pasar o redirige a
// la página de inicio de sesión.
// ============================================================================

import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";

export default NextAuth(authConfig).auth;

export const config = {
  // Por ahora solo protegemos rutas que empiecen con "/cuenta"
  // (todavía no existen páginas ahí, pero las vamos a necesitar para
  // que la persona vea su perfil/estado de suscripción en fases
  // siguientes). El catálogo y los episodios siguen siendo públicos.
  matcher: ["/cuenta/:path*"],
};
