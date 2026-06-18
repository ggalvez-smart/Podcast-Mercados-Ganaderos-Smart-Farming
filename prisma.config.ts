// ============================================================================
// Configuración de Prisma
// ============================================================================
// A partir de Prisma 7, la dirección de conexión a la base de datos se
// define acá (leyendo la variable de entorno DATABASE_URL) en vez de
// estar escrita directamente en el archivo prisma/schema.prisma.
// ============================================================================

import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
