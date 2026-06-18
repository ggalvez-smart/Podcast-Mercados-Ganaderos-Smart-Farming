// ============================================================================
// Configuración base de autenticación (compatible con "edge")
// ============================================================================
// Este archivo contiene la parte de la configuración de NextAuth que NO
// necesita acceso directo a la base de datos: qué proveedores de login
// existen (por ahora solo "email + contraseña"), y reglas sobre qué
// páginas son públicas y cuáles requieren estar logueado.
//
// Se separa de "auth.ts" porque ese otro archivo sí usa Prisma para
// consultar la base de datos, y Prisma no puede ejecutarse en el
// entorno "edge" que usa Next.js para revisar permisos en cada
// pedido de página de forma muy rápida. Esta separación es el patrón
// recomendado oficialmente por NextAuth para evitar ese problema.
// ============================================================================

import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authConfig: NextAuthConfig = {
  // Página propia de inicio de sesión, en vez de usar la página
  // genérica que NextAuth muestra por defecto.
  pages: {
    signIn: "/ingresar",
  },

  // Las sesiones de NextAuth pueden guardarse de dos formas: en la base
  // de datos, o como un token firmado ("JWT") que el navegador guarda
  // y el servidor solo necesita verificar, sin consultar la base de
  // datos en cada pedido. Usamos "jwt" porque es compatible con el
  // entorno "edge" de Next.js (la base de datos no lo es), y porque
  // con nuestro volumen de usuarios no hay ninguna desventaja real.
  session: {
    strategy: "jwt",
  },

  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        contrasena: { label: "Contraseña", type: "password" },
      },
      // La función "authorize" real (la que de verdad consulta la base
      // de datos y compara la contraseña encriptada) vive en el archivo
      // "auth.ts", no acá, justamente porque necesita Prisma. Acá solo
      // declaramos que este proveedor existe y qué datos pide.
      async authorize() {
        return null;
      },
    }),
  ],

  callbacks: {
    // Esta función decide, para cada página que alguien intenta abrir,
    // si tiene permiso o no. La usa Next.js automáticamente en el
    // archivo proxy.ts (antes llamado "middleware.ts").
    authorized({ auth, request: { nextUrl } }) {
      const estaLogueado = !!auth?.user;

      // Por ahora, en la Fase 2, ninguna página requiere login
      // todavía (el catálogo sigue siendo público). Esto se va a
      // ajustar en la Fase 4, cuando el contenido premium sí
      // necesite verificar el estado de la suscripción.
      const esPaginaProtegida = nextUrl.pathname.startsWith("/cuenta");

      if (esPaginaProtegida && !estaLogueado) {
        return false; // Esto redirige automáticamente a /ingresar
      }
      return true;
    },
  },
};
