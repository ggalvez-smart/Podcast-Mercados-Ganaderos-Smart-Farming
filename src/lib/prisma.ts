// ============================================================================
// Cliente de Prisma (conexión a la base de datos)
// ============================================================================
// Este archivo crea UNA sola conexión a la base de datos y la reutiliza
// en toda la aplicación. Sin este patrón, en desarrollo Next.js podría
// llegar a crear una conexión nueva cada vez que se guarda un archivo,
// agotando rápidamente el límite de conexiones de la base de datos.
//
// NOTA TÉCNICA (Prisma 7): a partir de esta versión, Prisma ya no se
// conecta solo —hay que entregarle explícitamente un "adaptador" que
// sabe cómo hablar con PostgreSQL en particular (@prisma/adapter-pg).
// Es un cambio respecto a versiones anteriores, pero no afecta en nada
// cómo usamos "prisma" en el resto del código de la aplicación.
// ============================================================================

import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const prismaClientGlobal = global as typeof global & {
  prisma?: PrismaClient;
};

const adaptador = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

export const prisma =
  prismaClientGlobal.prisma ?? new PrismaClient({ adapter: adaptador });

if (process.env.NODE_ENV !== "production") {
  prismaClientGlobal.prisma = prisma;
}
