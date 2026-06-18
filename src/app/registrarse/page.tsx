"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import FormularioAuth from "@/components/FormularioAuth";

export default function PaginaRegistro() {
  const router = useRouter();

  async function manejarRegistro(
    email: string,
    contrasena: string
  ): Promise<string | null> {
    const respuesta = await fetch("/api/registro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, contrasena }),
    });

    const datos = await respuesta.json();

    if (!respuesta.ok) {
      return datos.error || "No pudimos crear tu cuenta. Probá de nuevo.";
    }

    // Una vez creada la cuenta, la ingresamos automáticamente, para
    // que no tenga que volver a escribir sus datos en la página de
    // login. "redirect: false" evita que NextAuth haga su propia
    // redirección automática, porque nosotros queremos controlar
    // exactamente a dónde va la persona después (a la página principal).
    const resultadoIngreso = await signIn("credentials", {
      email,
      contrasena,
      redirect: false,
    });

    if (resultadoIngreso?.error) {
      // Esto sería un caso muy raro (la cuenta se creó bien, pero el
      // ingreso automático falló). Mandamos a la persona a la página
      // de login para que entre manualmente.
      router.push("/ingresar");
      return null;
    }

    router.push("/");
    router.refresh();
    return null;
  }

  return (
    <main className="flex-1 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <h1 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-semibold text-[var(--color-texto)] text-center mb-2">
          Creá tu cuenta
        </h1>
        <p className="text-base text-[var(--color-texto-secundario)] text-center mb-8">
          Es gratis y te toma menos de un minuto.
        </p>

        <FormularioAuth modo="registrarse" onEnviar={manejarRegistro} />

        <p className="mt-6 text-center text-base text-[var(--color-texto-secundario)]">
          ¿Ya tenés cuenta?{" "}
          <Link
            href="/ingresar"
            className="text-[var(--color-principal-oscuro)] underline font-medium"
          >
            Entrá acá
          </Link>
        </p>
      </div>
    </main>
  );
}
