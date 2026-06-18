// ============================================================================
// DATOS DE EJEMPLO (temporal)
// ============================================================================
// Este archivo simula lo que en el futuro va a venir de la base de datos
// PostgreSQL real a través de Prisma. Lo usamos ahora para poder construir
// y probar el catálogo y el reproductor sin depender todavía de tener la
// base de datos conectada.
//
// CUANDO CONECTEMOS LA BASE DE DATOS REAL (más adelante en este mismo
// proyecto): esta función se va a reemplazar por una consulta a Prisma,
// pero el resto del código (las páginas, el reproductor) NO necesita
// cambiar, porque ya está escrito contra el tipo "Episodio" que coincide
// con la tabla real.
//
// Las imágenes de portada de acá son de un servicio de fotos temporales
// (picsum.photos) sólo para esta demo. Las fotos reales de cada episodio
// se van a subir desde el panel de administración (Fase 3).
// ============================================================================

import { Episodio } from "./tipos";

const episodiosDeEjemplo: Episodio[] = [
  {
    id: "1",
    titulo: "La sequía y el futuro de la cosecha gruesa",
    descripcion:
      "Hablamos con productores de la zona núcleo sobre cómo se viene preparando la campaña de soja y maíz después de un año complicado en lluvias, y qué esperan los especialistas para los próximos meses.",
    imagenPortadaUrl: "https://picsum.photos/seed/campo1/800/800",
    audioUrl: "https://example.com/audio/episodio-1.mp3",
    duracionSegundos: 2730, // 45:30
    fechaPublicacion: "2026-06-10",
    esPremium: false,
  },
  {
    id: "2",
    titulo: "Maquinaria agrícola: lo que viene para la próxima siembra",
    descripcion:
      "Repasamos las novedades en sembradoras y pulverizadoras que se mostraron en la última exposición, con foco en lo que realmente le sirve al productor chico y mediano.",
    imagenPortadaUrl: "https://picsum.photos/seed/campo2/800/800",
    audioUrl: "https://example.com/audio/episodio-2.mp3",
    duracionSegundos: 3120, // 52:00
    fechaPublicacion: "2026-06-03",
    esPremium: false,
  },
  {
    id: "3",
    titulo: "Mercados internacionales: cómo nos afecta la guerra comercial",
    descripcion:
      "Análisis en profundidad sobre los precios internacionales de granos y cómo las tensiones comerciales entre las grandes potencias impactan directamente en el bolsillo del productor argentino. Episodio exclusivo para suscriptores.",
    imagenPortadaUrl: "https://picsum.photos/seed/campo3/800/800",
    audioUrl: "https://example.com/audio/episodio-3.mp3",
    duracionSegundos: 2940, // 49:00
    fechaPublicacion: "2026-05-27",
    esPremium: true,
  },
  {
    id: "4",
    titulo: "Ganadería: el momento del mercado de la hacienda",
    descripcion:
      "Charlamos con un consignatario sobre cómo está el mercado de hacienda esta semana, qué categorías se mueven mejor y qué conviene hacer si estás pensando en vender o retener.",
    imagenPortadaUrl: "https://picsum.photos/seed/campo4/800/800",
    audioUrl: "https://example.com/audio/episodio-4.mp3",
    duracionSegundos: 2580, // 43:00
    fechaPublicacion: "2026-05-20",
    esPremium: true,
  },
];

/**
 * Devuelve todos los episodios, ordenados del más nuevo al más viejo.
 * Más adelante esta función va a hacer una consulta real a la base de
 * datos con Prisma, pero la forma de usarla desde el resto del código
 * no cambia.
 */
export function obtenerEpisodios(): Episodio[] {
  return [...episodiosDeEjemplo].sort(
    (a, b) =>
      new Date(b.fechaPublicacion).getTime() -
      new Date(a.fechaPublicacion).getTime()
  );
}

/**
 * Busca un episodio puntual por su id. Devuelve undefined si no existe.
 */
export function obtenerEpisodioPorId(id: string): Episodio | undefined {
  return episodiosDeEjemplo.find((episodio) => episodio.id === id);
}
