// ============================================================================
// Configuración completa de autenticación (con acceso a la base de datos)
// ============================================================================
// Este archivo extiende la configuración base (auth.config.ts) agregando
// el adaptador de Prisma y la función "authorize" real: la que busca al
// usuario por su email y verifica que la contraseña sea correcta.
//
// Se usa en: páginas del servidor, rutas de API, y en el archivo de
// registro de usuarios nuevos. NO se usa en proxy.ts (ver auth.config.ts
// para la explicación de por qué).
// ============================================================================

import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { authConfig } from "@/lib/auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        contrasena: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        // Si faltan datos, no se puede ni intentar el login.
        if (!credentials?.email || !credentials?.contrasena) {
          return null;
        }

        const usuario = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        // Si no existe un usuario con ese email, no decimos
        // específicamente "el email no existe" (por seguridad, para
        // no darle pistas a quien intente adivinar cuentas), sino que
        // devolvemos null igual que si la contraseña fuera incorrecta.
        // El mensaje genérico se muestra después, en el formulario.
        if (!usuario) {
          return null;
        }

        // Comparamos la contraseña que la persona escribió ahora con
        // la versión encriptada que guardamos en su momento. Esta
        // función nunca "desencripta" nada — vuelve a encriptar lo
        // que escribieron y compara los resultados.
        const contrasenaValida = await bcrypt.compare(
          credentials.contrasena as string,
          usuario.contrasenaHash
        );

        if (!contrasenaValida) {
          return null;
        }

        // Lo que se devuelve acá es lo que NextAuth va a guardar en
        // la sesión del usuario logueado.
        return {
          id: usuario.id,
          email: usuario.email,
        };
      },
    }),
  ],
});
