"use client";

// ============================================================================
// Componente: Barra de cuenta
// ============================================================================
// Muestra, en la esquina de la página, si hay alguien logueado o no:
//   - Si no hay sesión: un botón "Ingresar".
//   - Si hay sesión: el email de la persona y un botón "Salir".
//
// "useSession" es la función de NextAuth que, del lado del navegador,
// dice si hay alguien logueado en este momento (y quién es), sin tener
// que consultar la base de datos cada vez: usa la sesión guardada en
// el propio navegador.
// ============================================================================

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function BarraCuenta() {
  const { data: sesion, status } = useSession();

  // Mientras se está confirmando si hay sesión o no (apenas carga la
  // página), no mostramos nada todavía, para evitar un parpadeo donde
  // primero se ve "Ingresar" y after aparece el email.
  if (status === "loading") {
    return <div className="h-10" />;
  }

  if (!sesion) {
    return (
      <Link
        href="/ingresar"
        className="px-4 py-2 text-sm font-medium rounded-full border-2 border-[var(--color-principal)] text-[var(--color-principal-oscuro)] hover:bg-[var(--color-principal-claro)] transition-colors"
      >
        Ingresar
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-[var(--color-texto-secundario)] truncate max-w-[140px] sm:max-w-none">
        {sesion.user?.email}
      </span>
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="px-4 py-2 text-sm font-medium rounded-full border-2 border-[var(--color-borde)] text-[var(--color-texto)] hover:bg-[var(--color-principal-claro)] transition-colors cursor-pointer"
      >
        Salir
      </button>
    </div>
  );
}
