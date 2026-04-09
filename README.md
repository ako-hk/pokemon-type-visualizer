# Pokémon Type Distribution Visualizer

A React + TypeScript application that visualizes the type distribution of the original 151 Pokémon (Generation 1) using data from the PokéAPI.

## Features

- **Bar chart** showing Pokémon count per type, sorted in descending order
- **Doughnut chart** comparing single-type vs dual-type Pokémon
- **Search filter** to narrow results by Pokémon name — charts update live
- **Loading spinner** while data is fetched
- Responsive layout with a dark-themed UI

## Tech Stack

- **Vite** — build tool / dev server
- **React 19** + **TypeScript**
- **Chart.js** (via react-chartjs-2) — charting
- **Tailwind CSS v4** — styling

## Getting Started

```bash
# Clone the repo
git clone <repo-url>
cd pokemon-type-viz

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Approach & Notes

1. **Data fetching** — A custom `usePokemonData` hook fetches the list of 151 Pokémon, then uses `Promise.all` to fetch every Pokémon's details concurrently. A cleanup flag prevents state updates after unmount.
2. **Data transformation** — Pure utility functions (`countByType`, `countByTypeSlots`) derive the chart data from the flat Pokémon array. Dual-type Pokémon are counted once per type.
3. **Visualization** — Chart.js renders a bar chart (type counts, sorted descending) and a doughnut chart (single vs dual-type). Each type has a canonical colour drawn from the main-series games.
4. **Search** — The search input filters the Pokémon array; because the chart data is derived with `useMemo`, updating the filter instantly re-computes both charts.
5. **Componentization** — Each concern is its own component or hook: `usePokemonData`, `TypeDistributionChart`, `TypeSlotChart`, `SearchFilter`, `LoadingSpinner`.

### Challenges

- The PokéAPI returns type information only on individual Pokémon endpoints, requiring 151 parallel requests. `Promise.all` keeps latency manageable.
- Chart.js tooltip callback types require matching the exact generic chart type (`'bar'`, `'doughnut'`), which took a bit of care to satisfy TypeScript.
# pokemon-type-visualizer
