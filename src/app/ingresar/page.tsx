"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import FormularioAuth from "@/components/FormularioAuth";

export default function PaginaIngreso() {
  const router = useRouter();

  async function manejarIngreso(
    email: string,
    contrasena: string
  ): Promise<string | null> {
    const resultado = await signIn("credentials", {
      email,
      contrasena,
      redirect: false,
    });

    if (resultado?.error) {
      // Mensaje genérico a propósito: no decimos si el problema fue
      // el email o la contraseña, por seguridad (para no darle pistas
      // a quien intente entrar a una cuenta que no es suya).
      return "El email o la contraseña no son correctos.";
    }

    router.push("/");
    router.refresh();
    return null;
  }

  return (
    <main className="flex-1 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <h1 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-semibold text-[var(--color-texto)] text-center mb-2">
          Ingresá a tu cuenta
        </h1>
        <p className="text-base text-[var(--color-texto-secundario)] text-center mb-8">
          Escribí tu email y tu contraseña.
        </p>

        <FormularioAuth modo="ingresar" onEnviar={manejarIngreso} />

        <p className="mt-6 text-center text-base text-[var(--color-texto-secundario)]">
          ¿Todavía no tenés cuenta?{" "}
          <Link
            href="/registrarse"
            className="text-[var(--color-principal-oscuro)] underline font-medium"
          >
            Creala acá
          </Link>
        </p>
      </div>
    </main>
  );
}
