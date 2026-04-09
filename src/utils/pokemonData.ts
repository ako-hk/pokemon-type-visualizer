import type { Pokemon, TypeCounts } from '../types';

/**
 * Count how many Pokémon belong to each type.
 * Dual-type Pokémon are counted once per type.
 */
export function countByType(pokemon: Pokemon[]): TypeCounts {
  const counts: TypeCounts = {};
  for (const p of pokemon) {
    for (const t of p.types) {
      const name = t.type.name;
      counts[name] = (counts[name] ?? 0) + 1;
    }
  }
  return counts;
}

/**
 * Count single-type vs dual-type Pokémon.
 */
export function countByTypeSlots(pokemon: Pokemon[]): { single: number; dual: number } {
  let single = 0;
  let dual = 0;
  for (const p of pokemon) {
    if (p.types.length === 1) single++;
    else dual++;
  }
  return { single, dual };
}

/**
 * Sort a TypeCounts record in descending order and return
 * parallel arrays of labels and values.
 */
export function sortedTypeData(counts: TypeCounts): { labels: string[]; values: number[] } {
  const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  return {
    labels: entries.map(([k]) => k),
    values: entries.map(([, v]) => v),
  };
}
