# El Podcast del Campo — Plataforma web

Plataforma para escuchar el podcast semanal, con catálogo de episodios,
reproductor de audio, y (en fases siguientes) login, panel de
administración, gestión de suscriptores y métricas.

## En qué fase está el proyecto

**Fase 1 completa: estructura base y catálogo.**

Incluye:
- Listado de episodios con imagen de portada, título, fecha y duración.
- Página de cada episodio con reproductor de audio (play/pausa, avance
  y retroceso de 15 segundos, velocidad de reproducción, recuerda el
  punto de escucha).
- Diseño pensado para una audiencia de 45+ años: botones grandes,
  tipografía legible, sin necesidad de instrucciones.

Todavía NO incluye (vendrá en fases siguientes): login, panel de
administración, pagos y suscripciones, feed RSS público, métricas.

Los episodios que ves ahora son datos de ejemplo (`src/lib/episodios.ts`),
no vienen todavía de una base de datos real. Eso se conecta en la
próxima fase.

## Cómo ver el sitio funcionando en tu computadora

### 1. Instalar las dependencias

Necesitás tener [Node.js](https://nodejs.org) instalado (versión 20 o
más nueva). Una vez instalado, abrí una terminal en esta carpeta y
corré:

```bash
npm install
```

### 2. Levantar el sitio en modo de prueba

```bash
npm run dev
```

Esto va a mostrar un mensaje con una dirección, normalmente
`http://localhost:3000`. Abrí esa dirección en tu navegador (Chrome,
Safari, etc.) y vas a ver el catálogo de episodios funcionando.

Para verlo también desde tu celular mientras está corriendo en tu
computadora: asegurate de que el celular esté conectado al mismo WiFi,
y en la terminal vas a ver también una dirección de "Network" (algo
como `http://192.168.x.x:3000`) — abrí esa desde el navegador del
celular.

## Cómo publicarlo en internet con un link real (recomendado)

Esto lo vas a hacer una sola vez, y después cada cambio que hagamos se
publica solo. Son tres pasos:

### Paso 1: Subir el código a GitHub

1. Creá una cuenta gratuita en [github.com](https://github.com) si no
   tenés una.
2. Creá un repositorio nuevo (botón "New repository"), le podés poner
   de nombre `podcast-platform`. Dejalo como privado si preferís que
   no sea público.
3. Seguí las instrucciones que GitHub te muestra para "subir un
   proyecto existente" (son 3-4 comandos que te da la propia página).

### Paso 2: Conectar ese repositorio a Vercel

1. Creá una cuenta gratuita en [vercel.com](https://vercel.com),
   eligiendo "continuar con GitHub" para que queden conectados.
2. Una vez adentro, hacé clic en "Add New Project".
3. Elegí el repositorio `podcast-platform` que subiste en el paso 1.
4. Antes de darle a "Deploy", Vercel te va a pedir variables de
   entorno: ahí vas a tener que poner `DATABASE_URL` apuntando a tu
   base de datos PostgreSQL real (ver paso 3). Por ahora, si todavía
   no tenés la base de datos lista, podés dejarlo vacío — el catálogo
   va a funcionar igual porque todavía usa datos de ejemplo, no la
   base de datos real.
5. Hacé clic en "Deploy". En 1-2 minutos Vercel te va a dar un link
   público, algo como `podcast-platform-tuusuario.vercel.app`.

Ese link ya lo podés abrir desde cualquier celular, en cualquier red,
no solo en tu WiFi.

### Paso 3 (cuando lleguemos a esa fase): conectar la base de datos real

Cuando empecemos la fase de pagos/suscriptores vamos a necesitar una
base de datos PostgreSQL real. Las opciones gratuitas para empezar son
[neon.tech](https://neon.tech) o [supabase.com](https://supabase.com).
Cuando llegue el momento te voy a guiar paso a paso para crear la base
y conectarla.

## Estructura del proyecto (por si querés explorar)

```
src/
  app/              → las páginas del sitio
    page.tsx        → página principal (catálogo)
    episodios/[id]/ → página de cada episodio individual
  components/       → piezas reutilizables (el reproductor, las tarjetas)
  lib/              → funciones y datos compartidos
prisma/
  schema.prisma     → descripción de las tablas de la base de datos
```
