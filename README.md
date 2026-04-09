# Pokémon Type Distribution Visualizer

A React + TypeScript application that visualizes the type distribution of the original 151 Pokémon (Generation 1) using data from the PokéAPI.

## Features

- **Bar chart** — Pokémon count per type, sorted in descending order, each type coloured with its canonical game colour
- **Doughnut chart** — single-type vs dual-type breakdown
- **Search filter** — type a Pokémon name to narrow the data; both charts update live
- **Loading spinner** — shown while the 151 detail requests are in flight
- Responsive, dark-themed layout (Tailwind CSS)

## Tech Stack

| Tool | Purpose |
|---|---|
| [Vite](https://vite.dev/) | Build tool / dev server |
| React 19 + TypeScript | UI framework |
| [Chart.js](https://www.chartjs.org/) / react-chartjs-2 | Charts |
| [Tailwind CSS v4](https://tailwindcss.com/) | Styling |

## Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/ako-hk/pokemon-type-visualizer.git
cd pokemon-type-visualizer

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
src/
├── hooks/
│   └── usePokemonData.ts      # Fetch list + 151 detail requests via Promise.all
├── components/
│   ├── LoadingSpinner.tsx
│   ├── SearchFilter.tsx
│   ├── TypeDistributionChart.tsx  # Bar chart
│   └── TypeSlotChart.tsx          # Doughnut chart
├── utils/
│   ├── pokemonData.ts         # countByType, countByTypeSlots, sortedTypeData
│   └── typeColors.ts          # Canonical type → hex colour map
├── types.ts                   # Shared TypeScript interfaces
└── App.tsx                    # Root component — wires everything together
```

## Approach

1. **Data fetching** — `usePokemonData` first fetches the list endpoint, then fires all 151 detail requests concurrently with `Promise.all`. A `cancelled` flag in the effect cleanup prevents stale state updates.
2. **Data transformation** — `countByType` iterates every Pokémon's `types` array; dual-type Pokémon are counted once per type. `countByTypeSlots` counts single vs dual type Pokémon. `sortedTypeData` sorts the resulting map in descending order before charting.
3. **Visualisation** — Chart.js renders a `Bar` chart and a `Doughnut` chart. Options are typed inline to satisfy TypeScript's strict generics.
4. **Search** — The input filters the Pokémon array; `useMemo` re-derives both type-count maps from the filtered list, so the charts update without any extra fetches.
5. **Componentisation** — Each concern is isolated: one hook, four components, two pure utility modules.

### Challenges

- The PokéAPI exposes type data only on individual Pokémon endpoints, requiring 151 parallel requests. `Promise.all` keeps total latency roughly equal to the slowest single request.
- Chart.js tooltip callback types require matching the exact generic chart type (`'bar'`, `'doughnut'`). The `parsed.y` field is typed `number | null`, requiring a null-coalescing guard.
