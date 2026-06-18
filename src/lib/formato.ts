// ============================================================================
// Funciones auxiliares de formato
// ============================================================================
// Funciones chicas y reutilizables para mostrar duración y fechas de forma
// legible en español. Las concentramos aquí para no repetir la misma
// lógica en distintas páginas.
// ============================================================================

/**
 * Convierte una cantidad de segundos en un texto tipo "45:30".
 * Si dura una hora o más, muestra el formato "1:05:30".
 */
export function formatearDuracion(segundosTotales: number): string {
  const horas = Math.floor(segundosTotales / 3600);
  const minutos = Math.floor((segundosTotales % 3600) / 60);
  const segundos = Math.floor(segundosTotales % 60);

  const minutosTexto = String(minutos).padStart(horas > 0 ? 2 : 1, "0");
  const segundosTexto = String(segundos).padStart(2, "0");

  if (horas > 0) {
    return `${horas}:${minutosTexto}:${segundosTexto}`;
  }
  return `${minutosTexto}:${segundosTexto}`;
}

/**
 * Convierte una fecha ISO ("2026-06-10") en un texto legible en español,
 * por ejemplo "10 de junio de 2026".
 */
export function formatearFecha(fechaIso: string): string {
  const fecha = new Date(fechaIso + "T00:00:00");
  return fecha.toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
