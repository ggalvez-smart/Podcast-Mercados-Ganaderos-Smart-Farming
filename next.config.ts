import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // NOTA: "picsum.photos" se usa solo en esta demo para tener imágenes
    // de ejemplo. En producción esto se va a reemplazar por el dominio
    // de Cloudflare R2 donde van a vivir las fotos reales de los episodios.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
};

export default nextConfig;
