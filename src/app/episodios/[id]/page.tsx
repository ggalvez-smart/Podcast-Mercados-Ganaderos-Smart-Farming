import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reproductor from "@/components/Reproductor";
import { obtenerEpisodioPorId, obtenerEpisodios } from "@/lib/episodios";
import { formatearFecha } from "@/lib/formato";

interface PaginaEpisodioProps {
  params: Promise<{ id: string }>;
}

// Genera las rutas de cada episodio de antemano en el momento de
// compilar el sitio, para que carguen más rápido (esto es una
// optimización estándar de Next.js, no afecta el contenido).
export function generateStaticParams() {
  return obtenerEpisodios().map((episodio) => ({ id: episodio.id }));
}

export default async function PaginaEpisodio({
  params,
}: PaginaEpisodioProps) {
  const { id } = await params;
  const episodio = obtenerEpisodioPorId(id);

  // Si alguien entra a una dirección de episodio que no existe,
  // mostramos la página de "no encontrado" estándar de Next.js.
  if (!episodio) {
    notFound();
  }

  return (
    <main className="flex-1 max-w-2xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-14">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-[var(--color-texto-secundario)] hover:text-[var(--color-principal)] transition-colors mb-6"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path
            d="M19 12H5M5 12L12 19M5 12L12 5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Volver a todos los episodios
      </Link>

      <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 mb-6">
        <div className="relative w-full sm:w-48 h-48 flex-shrink-0 rounded-2xl overflow-hidden bg-[var(--color-principal-claro)]">
          <Image
            src={episodio.imagenPortadaUrl}
            alt={`Portada del episodio: ${episodio.titulo}`}
            fill
            className="object-cover"
            sizes="192px"
            priority
          />
        </div>

        <div className="flex flex-col justify-center">
          {episodio.esPremium && (
            <span className="inline-block w-fit mb-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--color-premium-claro)] text-[var(--color-premium)]">
              Solo para suscriptores
            </span>
          )}
          <h1 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-semibold text-[var(--color-texto)] leading-snug">
            {episodio.titulo}
          </h1>
          <p className="mt-2 text-sm text-[var(--color-texto-secundario)]">
            {formatearFecha(episodio.fechaPublicacion)}
          </p>
        </div>
      </div>

      <Reproductor
        episodioId={episodio.id}
        audioUrl={episodio.audioUrl}
        duracionSegundos={episodio.duracionSegundos}
      />

      <div className="mt-8">
        <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-texto)] mb-2">
          Sobre este episodio
        </h2>
        <p className="text-base text-[var(--color-texto)] leading-relaxed">
          {episodio.descripcion}
        </p>
      </div>
    </main>
  );
}
