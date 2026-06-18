// ============================================================================
// Componente: Tarjeta de episodio
// ============================================================================
// Representa un episodio dentro del listado principal (catálogo). Diseño
// pensado para ser clara incluso en una pantalla chica de celular: la
// imagen es grande y reconocible, el título tiene buen contraste, y si
// el episodio es premium se indica con una etiqueta clara (no con un
// candado pequeño difícil de notar).
// ============================================================================

import Image from "next/image";
import Link from "next/link";
import { Episodio } from "@/lib/tipos";
import { formatearDuracion, formatearFecha } from "@/lib/formato";

interface TarjetaEpisodioProps {
  episodio: Episodio;
}

export default function TarjetaEpisodio({ episodio }: TarjetaEpisodioProps) {
  return (
    <Link
      href={`/episodios/${episodio.id}`}
      className="flex gap-4 sm:gap-5 p-4 sm:p-5 rounded-2xl bg-white border border-[var(--color-borde)] hover:border-[var(--color-principal)] transition-colors group"
    >
      <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 rounded-xl overflow-hidden bg-[var(--color-principal-claro)]">
        <Image
          src={episodio.imagenPortadaUrl}
          alt={`Portada del episodio: ${episodio.titulo}`}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 96px, 128px"
        />
      </div>

      <div className="flex flex-col justify-center min-w-0">
        {episodio.esPremium && (
          <span className="inline-block w-fit mb-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--color-premium-claro)] text-[var(--color-premium)]">
            Solo para suscriptores
          </span>
        )}
        <h3 className="font-[family-name:var(--font-display)] text-lg sm:text-xl font-semibold text-[var(--color-texto)] leading-snug group-hover:text-[var(--color-principal-oscuro)] transition-colors">
          {episodio.titulo}
        </h3>
        <p className="mt-1.5 text-sm text-[var(--color-texto-secundario)]">
          {formatearFecha(episodio.fechaPublicacion)} ·{" "}
          {formatearDuracion(episodio.duracionSegundos)}
        </p>
      </div>
    </Link>
  );
}
