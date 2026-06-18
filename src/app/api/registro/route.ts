// ============================================================================
// Ruta de API: Registro de cuenta nueva
// ============================================================================
// Recibe email y contraseña desde el formulario de registro, valida que
// los datos tengan sentido, encripta la contraseña (nunca se guarda en
// texto plano) y crea el usuario en la base de datos.
// ============================================================================

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

// Cantidad de "rondas" de encriptación para bcrypt. Cuanto más alto,
// más seguro pero más lento. 12 es el valor recomendado actualmente
// como buen equilibrio entre seguridad y velocidad.
const RONDAS_ENCRIPTACION = 12;

export async function POST(request: Request) {
  const cuerpo = await request.json();
  const { email, contrasena } = cuerpo;

  // --- Validaciones básicas ---
  if (typeof email !== "string" || typeof contrasena !== "string") {
    return NextResponse.json(
      { error: "Faltan datos en el formulario." },
      { status: 400 }
    );
  }

  const emailNormalizado = email.trim().toLowerCase();

  // Validación simple de formato de email (no exhaustiva, pero
  // suficiente para detectar errores de tipeo evidentes).
  const formatoEmailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    emailNormalizado
  );
  if (!formatoEmailValido) {
    return NextResponse.json(
      { error: "El email no parece válido." },
      { status: 400 }
    );
  }

  if (contrasena.length < 8) {
    return NextResponse.json(
      { error: "La contraseña debe tener al menos 8 caracteres." },
      { status: 400 }
    );
  }

  // --- Verificar que el email no esté ya registrado ---
  const usuarioExistente = await prisma.user.findUnique({
    where: { email: emailNormalizado },
  });

  if (usuarioExistente) {
    return NextResponse.json(
      { error: "Ya existe una cuenta con ese email." },
      { status: 409 }
    );
  }

  // --- Crear el usuario, con la contraseña ya encriptada ---
  const contrasenaHash = await bcrypt.hash(contrasena, RONDAS_ENCRIPTACION);

  await prisma.user.create({
    data: {
      email: emailNormalizado,
      contrasenaHash,
    },
  });

  return NextResponse.json({ exito: true });
}
