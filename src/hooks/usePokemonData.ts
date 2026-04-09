import { useState, useEffect } from 'react';
import type { Pokemon } from '../types';

const LIST_URL = 'https://pokeapi.co/api/v2/pokemon?limit=151';

export function usePokemonData() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchAll() {
      try {
        const listRes = await fetch(LIST_URL);
        if (!listRes.ok) throw new Error(`Failed to fetch list: ${listRes.status}`);
        const listData = await listRes.json();

        const detailRequests = listData.results.map((item: { url: string }) =>
          fetch(item.url).then((r) => {
            if (!r.ok) throw new Error(`Failed to fetch ${item.url}: ${r.status}`);
            return r.json();
          })
        );

        const details = await Promise.all(detailRequests);

        if (!cancelled) {
          setPokemon(
            details.map((d: Pokemon) => ({
              id: d.id,
              name: d.name,
              types: d.types,
            }))
          );
        }
      } catch (err) {
        console.error(err);
        if (!cancelled) setError(String(err));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchAll();
    return () => {
      cancelled = true;
    };
  }, []);

  return { pokemon, loading, error };
}
