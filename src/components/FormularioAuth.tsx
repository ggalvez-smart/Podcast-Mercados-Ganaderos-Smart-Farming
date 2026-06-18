"use client";

// ============================================================================
// Componente: Formulario de ingreso o registro
// ============================================================================
// Un mismo componente sirve para las dos páginas (ingresar y registrarse)
// porque visualmente son casi idénticas; lo que cambia es el texto y qué
// pasa al enviar el formulario.
//
// Decisiones de diseño para una audiencia de 45+ años con poca práctica
// digital:
//   - Un botón explícito "Mostrar contraseña" con texto, no un ícono de
//     ojo pequeño que puede no notarse.
//   - Mensajes de error en español simple, nunca términos técnicos
//     como "401" o "credenciales inválidas".
//   - Mientras se envía el formulario, el botón se desactiva y cambia
//     de texto a "Entrando..." o "Creando cuenta...", para que quede
//     claro que el toque sí se registró y hay que esperar.
// ============================================================================

import { useState, FormEvent } from "react";

interface FormularioAuthProps {
  modo: "ingresar" | "registrarse";
  onEnviar: (email: string, contrasena: string) => Promise<string | null>;
}

export default function FormularioAuth({
  modo,
  onEnviar,
}: FormularioAuthProps) {
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function manejarEnvio(evento: FormEvent) {
    evento.preventDefault();
    setError(null);
    setEnviando(true);

    const mensajeError = await onEnviar(email, contrasena);

    if (mensajeError) {
      setError(mensajeError);
      setEnviando(false);
    }
    // Si no hay error, el propio "onEnviar" se encarga de redirigir
    // a la página siguiente, así que no hace falta hacer nada más aquí.
  }

  return (
    <form onSubmit={manejarEnvio} className="flex flex-col gap-5">
      <div>
        <label
          htmlFor="email"
          className="block text-base font-medium text-[var(--color-texto)] mb-1.5"
        >
          Tu email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ejemplo@correo.com"
          className="w-full px-4 py-3 text-base rounded-xl border-2 border-[var(--color-borde)] focus:border-[var(--color-principal)] outline-none transition-colors"
        />
      </div>

      <div>
        <label
          htmlFor="contrasena"
          className="block text-base font-medium text-[var(--color-texto)] mb-1.5"
        >
          Tu contraseña
        </label>
        <input
          id="contrasena"
          type={mostrarContrasena ? "text" : "password"}
          autoComplete={
            modo === "ingresar" ? "current-password" : "new-password"
          }
          required
          minLength={modo === "registrarse" ? 8 : undefined}
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          className="w-full px-4 py-3 text-base rounded-xl border-2 border-[var(--color-borde)] focus:border-[var(--color-principal)] outline-none transition-colors"
        />
        <button
          type="button"
          onClick={() => setMostrarContrasena(!mostrarContrasena)}
          className="mt-2 text-sm text-[var(--color-principal-oscuro)] underline cursor-pointer"
        >
          {mostrarContrasena ? "Ocultar contraseña" : "Mostrar contraseña"}
        </button>
        {modo === "registrarse" && (
          <p className="mt-1.5 text-sm text-[var(--color-texto-secundario)]">
            Tiene que tener al menos 8 caracteres.
          </p>
        )}
      </div>

      {error && (
        <div className="px-4 py-3 rounded-xl bg-[var(--color-premium-claro)] text-[var(--color-premium)] text-base">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={enviando}
        className="w-full py-3.5 text-base font-medium rounded-xl bg-[var(--color-principal)] text-white hover:bg-[var(--color-principal-oscuro)] transition-colors disabled:opacity-60 cursor-pointer"
      >
        {enviando
          ? modo === "ingresar"
            ? "Entrando..."
            : "Creando cuenta..."
          : modo === "ingresar"
            ? "Entrar"
            : "Crear cuenta"}
      </button>
    </form>
  );
}
