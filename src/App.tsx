import { useMemo, useState } from 'react';
import { usePokemonData } from './hooks/usePokemonData';
import { countByType, countByTypeSlots } from './utils/pokemonData';
import LoadingSpinner from './components/LoadingSpinner';
import SearchFilter from './components/SearchFilter';
import TypeDistributionChart from './components/TypeDistributionChart';
import TypeSlotChart from './components/TypeSlotChart';

export default function App() {
  const { pokemon, loading, error } = usePokemonData();
  const [search, setSearch] = useState('');

  const filtered = useMemo(
    () =>
      search.trim()
        ? pokemon.filter((p) => p.name.toLowerCase().includes(search.trim().toLowerCase()))
        : pokemon,
    [pokemon, search]
  );

  const typeCounts = useMemo(() => countByType(filtered), [filtered]);
  const slotCounts = useMemo(() => countByTypeSlots(filtered), [filtered]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 py-5 px-4 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          <span className="text-red-500">Pokémon</span> Type Distribution
        </h1>
        <p className="mt-1 text-slate-400 text-sm">Generation 1 — first 151 Pokémon</p>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        {loading && <LoadingSpinner />}

        {error && (
          <div className="rounded-lg bg-red-900/40 border border-red-700 p-4 text-red-300 text-sm">
            Failed to load data: {error}
          </div>
        )}

        {!loading && !error && (
          <>
            <SearchFilter
              value={search}
              onChange={setSearch}
              total={pokemon.length}
              filtered={filtered.length}
            />

            {/* Bar chart */}
            <section className="bg-slate-800 rounded-xl p-5 shadow">
              <TypeDistributionChart counts={typeCounts} />
            </section>

            {/* Doughnut chart */}
            <section className="bg-slate-800 rounded-xl p-5 shadow max-w-sm mx-auto">
              <TypeSlotChart single={slotCounts.single} dual={slotCounts.dual} />
            </section>
          </>
        )}
      </main>
    </div>
  );
}
