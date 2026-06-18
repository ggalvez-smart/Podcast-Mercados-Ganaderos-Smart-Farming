import TarjetaEpisodio from "@/components/TarjetaEpisodio";
import { obtenerEpisodios } from "@/lib/episodios";

export default function PaginaInicio() {
  const episodios = obtenerEpisodios();

  return (
    <main className="flex-1 max-w-2xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-14">
      <header className="mb-10">
        <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-semibold text-[var(--color-texto)]">
          El Podcast del Campo
        </h1>
        <p className="mt-2 text-base text-[var(--color-texto-secundario)]">
          Un episodio nuevo cada semana sobre lo que pasa en el campo.
        </p>
      </header>

      <div className="flex flex-col gap-3">
        {episodios.map((episodio) => (
          <TarjetaEpisodio key={episodio.id} episodio={episodio} />
        ))}
      </div>
    </main>
  );
}
