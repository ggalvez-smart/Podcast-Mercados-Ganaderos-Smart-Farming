"use client";

// ============================================================================
// Componente: Reproductor de audio
// ============================================================================
// Pensado para una audiencia que puede no tener mucha práctica con
// interfaces digitales. Por eso:
//   - El botón de play/pausa es grande (80px) y siempre está en el mismo
//     lugar (centro), nunca cambia de posición.
//   - Los controles de avance/retroceso son de 15 segundos, una unidad
//     fácil de entender ("un poquito más adelante / más atrás").
//   - La velocidad de reproducción usa palabras simples ("normal", "más
//     rápido") en vez de solo números como "1.5x".
//   - El progreso se guarda automáticamente en el navegador (localStorage)
//     para que si alguien cierra el sitio a la mitad de un episodio,
//     al volver continúe exactamente donde lo dejó.
//
// NOTA SOBRE "RECORDAR PUNTO DE ESCUCHA": en esta Fase 1 todavía no hay
// login, así que guardamos el progreso en el propio navegador del usuario
// (localStorage). Esto funciona bien mientras la persona use el mismo
// celular/computadora. En la Fase 2, cuando agreguemos cuentas de usuario,
// vamos a mejorar esto para que el progreso viaje con la cuenta y se pueda
// continuar incluso desde otro dispositivo.
// ============================================================================

import { useEffect, useRef, useState } from "react";
import { formatearDuracion } from "@/lib/formato";

interface ReproductorProps {
  episodioId: string;
  audioUrl: string;
  duracionSegundos: number;
}

// Opciones de velocidad, mostradas con palabras simples para que sea
// inmediatamente entendible sin tener que pensar qué significa "1.5x".
const OPCIONES_VELOCIDAD = [
  { valor: 1, etiqueta: "Normal" },
  { valor: 1.25, etiqueta: "Un poco más rápido" },
  { valor: 1.5, etiqueta: "Más rápido" },
];

// Cuántos segundos salta cada toque de avance/retroceso.
const SALTO_SEGUNDOS = 15;

function claveDeProgreso(episodioId: string): string {
  return `progreso-episodio-${episodioId}`;
}

export default function Reproductor({
  episodioId,
  audioUrl,
  duracionSegundos,
}: ReproductorProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [estaReproduciendo, setEstaReproduciendo] = useState(false);
  const [tiempoActual, setTiempoActual] = useState(0);
  const [velocidad, setVelocidad] = useState(1);
  const [cargando, setCargando] = useState(true);

  // Al montar el componente, restauramos el punto de escucha guardado
  // (si existe) para que el usuario continúe donde lo dejó.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const progresoGuardado = window.localStorage.getItem(
      claveDeProgreso(episodioId)
    );

    function alPoderReproducir() {
      if (progresoGuardado) {
        const segundosGuardados = parseFloat(progresoGuardado);
        // Evitamos restaurar a un punto inválido (ej: si el episodio
        // cambió de duración o el dato guardado está corrupto).
        if (
          !Number.isNaN(segundosGuardados) &&
          segundosGuardados > 0 &&
          segundosGuardados < duracionSegundos
        ) {
          audio!.currentTime = segundosGuardados;
          setTiempoActual(segundosGuardados);
        }
      }
      setCargando(false);
    }

    audio.addEventListener("loadedmetadata", alPoderReproducir);
    return () => audio.removeEventListener("loadedmetadata", alPoderReproducir);
  }, [episodioId, duracionSegundos]);

  // Guardamos el progreso periódicamente mientras se reproduce, para no
  // perder el punto de escucha si el usuario cierra la pestaña de golpe.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    function alActualizarTiempo() {
      setTiempoActual(audio!.currentTime);
      window.localStorage.setItem(
        claveDeProgreso(episodioId),
        String(audio!.currentTime)
      );
    }

    audio.addEventListener("timeupdate", alActualizarTiempo);
    return () => audio.removeEventListener("timeupdate", alActualizarTiempo);
  }, [episodioId]);

  function alternarReproduccion() {
    const audio = audioRef.current;
    if (!audio) return;

    if (estaReproduciendo) {
      audio.pause();
    } else {
      audio.play();
    }
    setEstaReproduciendo(!estaReproduciendo);
  }

  function saltar(segundos: number) {
    const audio = audioRef.current;
    if (!audio) return;
    const nuevoTiempo = Math.min(
      Math.max(audio.currentTime + segundos, 0),
      duracionSegundos
    );
    audio.currentTime = nuevoTiempo;
    setTiempoActual(nuevoTiempo);
  }

  function cambiarVelocidad(nuevaVelocidad: number) {
    const audio = audioRef.current;
    if (!audio) return;
    audio.playbackRate = nuevaVelocidad;
    setVelocidad(nuevaVelocidad);
  }

  function alMoverBarraProgreso(nuevoTiempo: number) {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = nuevoTiempo;
    setTiempoActual(nuevoTiempo);
  }

  const porcentajeProgreso =
    duracionSegundos > 0 ? (tiempoActual / duracionSegundos) * 100 : 0;

  return (
    <div className="rounded-2xl bg-white border border-[var(--color-borde)] p-6 sm:p-8 shadow-sm">
      {/* Elemento de audio nativo del navegador, oculto: nosotros dibujamos
          nuestros propios controles encima para que sean más grandes y
          simples que los controles estándar del navegador. */}
      <audio
        ref={audioRef}
        src={audioUrl}
        onEnded={() => setEstaReproduciendo(false)}
        preload="metadata"
      />

      {/* Barra de progreso: se puede arrastrar para saltar a cualquier
          punto del episodio. */}
      <div className="mb-6">
        <input
          type="range"
          min={0}
          max={duracionSegundos || 0}
          value={tiempoActual}
          onChange={(evento) => alMoverBarraProgreso(Number(evento.target.value))}
          className="w-full h-3 rounded-full appearance-none cursor-pointer accent-[var(--color-principal)]"
          style={{
            background: `linear-gradient(to right, var(--color-principal) ${porcentajeProgreso}%, var(--color-borde) ${porcentajeProgreso}%)`,
          }}
          aria-label="Avanzar o retroceder en el episodio"
        />
        <div className="flex justify-between mt-2 text-base text-[var(--color-texto-secundario)]">
          <span>{formatearDuracion(tiempoActual)}</span>
          <span>{formatearDuracion(duracionSegundos)}</span>
        </div>
      </div>

      {/* Controles principales: retroceder, play/pausa, avanzar.
          Todos son botones grandes y con etiquetas accesibles claras. */}
      <div className="flex items-center justify-center gap-6 sm:gap-10">
        <button
          onClick={() => saltar(-SALTO_SEGUNDOS)}
          aria-label={`Retroceder ${SALTO_SEGUNDOS} segundos`}
          className="flex flex-col items-center justify-center w-16 h-16 rounded-full border-2 border-[var(--color-borde)] text-[var(--color-texto)] hover:bg-[var(--color-principal-claro)] transition-colors cursor-pointer"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path
              d="M11 5L4 12L11 19M19 5L12 12L19 19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-xs mt-0.5">15s</span>
        </button>

        <button
          onClick={alternarReproduccion}
          disabled={cargando}
          aria-label={estaReproduciendo ? "Pausar" : "Reproducir"}
          className="flex items-center justify-center w-20 h-20 rounded-full bg-[var(--color-principal)] text-white hover:bg-[var(--color-principal-oscuro)] transition-colors disabled:opacity-50 cursor-pointer shadow-md"
        >
          {cargando ? (
            <span className="text-sm">...</span>
          ) : estaReproduciendo ? (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 4L20 12L7 20V4Z" />
            </svg>
          )}
        </button>

        <button
          onClick={() => saltar(SALTO_SEGUNDOS)}
          aria-label={`Avanzar ${SALTO_SEGUNDOS} segundos`}
          className="flex flex-col items-center justify-center w-16 h-16 rounded-full border-2 border-[var(--color-borde)] text-[var(--color-texto)] hover:bg-[var(--color-principal-claro)] transition-colors cursor-pointer"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path
              d="M13 5L20 12L13 19M5 5L12 12L5 19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-xs mt-0.5">15s</span>
        </button>
      </div>

      {/* Selector de velocidad, con palabras en vez de solo números */}
      <div className="mt-6 flex items-center justify-center gap-2 flex-wrap">
        <span className="text-sm text-[var(--color-texto-secundario)] mr-1">
          Velocidad:
        </span>
        {OPCIONES_VELOCIDAD.map((opcion) => (
          <button
            key={opcion.valor}
            onClick={() => cambiarVelocidad(opcion.valor)}
            className={`px-3 py-1.5 rounded-full text-sm border transition-colors cursor-pointer ${
              velocidad === opcion.valor
                ? "bg-[var(--color-principal)] text-white border-[var(--color-principal)]"
                : "bg-transparent text-[var(--color-texto)] border-[var(--color-borde)] hover:bg-[var(--color-principal-claro)]"
            }`}
          >
            {opcion.etiqueta}
          </button>
        ))}
      </div>
    </div>
  );
}
