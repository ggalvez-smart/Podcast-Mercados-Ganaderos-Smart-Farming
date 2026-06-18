// ============================================================================
// Tipos de datos compartidos
// ============================================================================
// Este archivo define la "forma" que tienen nuestros datos en el código.
// El tipo Episodio acá representa EXACTAMENTE lo mismo que la tabla
// "episodios" que definimos en prisma/schema.prisma. Cuando conectemos
// la base de datos real, estos campos van a coincidir 1 a 1.
// ============================================================================

export interface Episodio {
  id: string;
  titulo: string;
  descripcion: string;
  imagenPortadaUrl: string;
  audioUrl: string;
  duracionSegundos: number;
  fechaPublicacion: string; // formato ISO, ej: "2026-06-10"
  esPremium: boolean;
}
