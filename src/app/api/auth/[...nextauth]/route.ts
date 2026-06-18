// ============================================================================
// Ruta de API de autenticación
// ============================================================================
// NextAuth necesita esta ruta para manejar internamente todo el proceso
// de login y logout. No hace falta escribir lógica acá: simplemente
// conectamos los manejadores que ya vienen armados desde auth.ts.
// ============================================================================

import { handlers } from "@/lib/auth";

export const { GET, POST } = handlers;
