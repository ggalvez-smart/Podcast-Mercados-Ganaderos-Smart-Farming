"use client";

// ============================================================================
// Proveedor de sesión
// ============================================================================
// NextAuth necesita este "envoltorio" para que funciones como signIn(),
// signOut() y useSession() (usadas del lado del navegador, no del
// servidor) tengan acceso al estado de la sesión actual. Se separa en
// su propio archivo porque tiene que ser un "client component", y así
// el resto del layout puede seguir siendo un "server component" sin
// problema.
// ============================================================================

import { SessionProvider } from "next-auth/react";

export default function ProveedorSesion({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}
