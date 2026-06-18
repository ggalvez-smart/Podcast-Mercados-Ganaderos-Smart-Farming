# El Podcast del Campo — Plataforma web

Plataforma para escuchar el podcast semanal, con catálogo de episodios,
reproductor de audio, login de usuarios, y (en fases siguientes) panel
de administración, gestión de suscriptores y métricas.

## En qué fase está el proyecto

**Fase 1 completa:** estructura base y catálogo (listado de episodios,
reproductor de audio).

**Fase 2 completa:** login de usuarios.
- Registro de cuenta nueva con email y contraseña.
- Inicio y cierre de sesión.
- Las contraseñas se guardan siempre encriptadas, nunca en texto plano.
- Estructura preparada para sumar más adelante "ingresar con Google"
  sin tener que rehacer nada.

Todavía NO incluye (vendrá en fases siguientes): que el login bloquee
contenido premium según el estado de pago (eso es la Fase 4), panel de
administración, feed RSS público, métricas.

Los episodios del catálogo siguen siendo datos de ejemplo
(`src/lib/episodios.ts`); todavía no salen de la base de datos real.
Eso se conecta cuando construyamos el panel de administración (Fase 3).

## Qué necesitás tener antes de instalar

A partir de esta fase, el proyecto ya necesita una base de datos
PostgreSQL real (antes alcanzaba con datos de ejemplo, ya no). Si
todavía no tenés una creada, las opciones gratuitas recomendadas son
[neon.tech](https://neon.tech) o [supabase.com](https://supabase.com).

## Cómo ver el sitio funcionando en tu computadora

### 1. Instalar las dependencias

Necesitás tener [Node.js](https://nodejs.org) instalado (versión 20 o
más nueva). Una vez instalado, abrí una terminal en esta carpeta y
corré:

```bash
npm install
```

Este paso, además de instalar las librerías del proyecto, genera
automáticamente el "cliente de Prisma" (el código que permite hablar
con la base de datos). Si en algún momento cambiamos el archivo
`prisma/schema.prisma`, hay que volver a correr `npm install` (o
`npx prisma generate`) para que los cambios se reflejen.

### 2. Configurar las variables de entorno

Copiá el archivo `.env.example` y renombrá la copia a `.env` (sin
".example"). Abrilo con cualquier editor de texto y completá:

- `DATABASE_URL`: la cadena de conexión de tu base de datos PostgreSQL
  (la que te da Neon o Supabase).
- `AUTH_SECRET`: una clave de seguridad. Para generar una válida, corré
  en la terminal: `npx auth secret` (esto te la genera y la agrega
  automáticamente a tu archivo `.env`).

### 3. Crear las tablas en la base de datos

La primera vez (y cada vez que cambiemos el esquema de datos), hay que
avisarle a la base de datos real cuáles son las tablas que necesita
tener. Corré:

```bash
npx prisma migrate dev --name inicial
```

Esto crea las tablas de episodios, usuarios y sesiones en tu base de
datos de Neon/Supabase. Te va a pedir confirmación, aceptá.

### 4. Levantar el sitio en modo de prueba

```bash
npm run dev
```

Esto va a mostrar un mensaje con una dirección, normalmente
`http://localhost:3000`. Abrí esa dirección en tu navegador y vas a
poder probar el catálogo, y también crear una cuenta nueva e ingresar.

## Cómo publicarlo en internet con un link real

### Paso 1: Subir el código a GitHub

Si ya tenés el repositorio conectado de la Fase 1, simplemente subí
los cambios nuevos (con GitHub Desktop: "Commit to main" y después
"Push origin").

### Paso 2: Variables de entorno en Vercel

En tu proyecto de Vercel, andá a Settings → Environment Variables y
asegurate de tener configuradas:

- `DATABASE_URL`: la misma cadena de conexión de tu base de datos.
- `AUTH_SECRET`: la misma clave que generaste en el paso 2 de arriba
  (tiene que ser la MISMA en tu computadora y en Vercel, sino las
  sesiones de un lado no van a ser válidas del otro).

Después de guardar las variables, Vercel va a volver a publicar el
sitio automáticamente con los cambios.

## Estructura del proyecto (por si querés explorar)

```
src/
  app/              → las páginas del sitio
    page.tsx        → página principal (catálogo)
    episodios/[id]/ → página de cada episodio individual
    ingresar/       → página de inicio de sesión
    registrarse/    → página de registro de cuenta nueva
    api/auth/       → ruta técnica que usa NextAuth internamente
    api/registro/   → ruta que crea cuentas nuevas
  components/       → piezas reutilizables (reproductor, tarjetas, formularios)
  lib/               → funciones, configuración de autenticación y datos compartidos
  proxy.ts          → controla qué páginas requieren estar logueado
prisma/
  schema.prisma     → descripción de las tablas de la base de datos
prisma.config.ts    → configuración de conexión de Prisma
```
