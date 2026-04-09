import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import type { TypeCounts } from '../types';
import { sortedTypeData } from '../utils/pokemonData';
import { typeColor } from '../utils/typeColors';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Props {
  counts: TypeCounts;
}

export default function TypeDistributionChart({ counts }: Props) {
  const { labels, values } = sortedTypeData(counts);

  const data = {
    labels,
    datasets: [
      {
        label: 'Pokémon count',
        data: values,
        backgroundColor: labels.map(typeColor),
        borderColor: labels.map((l) => typeColor(l) + 'cc'),
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Pokémon Count by Type',
        color: '#e2e8f0',
        font: { size: 16 },
      },
      tooltip: {
        callbacks: {
          label: (ctx: { parsed: { y: number | null } }) =>
            ` ${ctx.parsed.y ?? 0} Pokémon`,
        },
      },
    },
    scales: {
      x: {
        ticks: { color: '#94a3b8' },
        grid: { color: '#1e293b' },
      },
      y: {
        ticks: { color: '#94a3b8' },
        grid: { color: '#334155' },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="relative h-80 sm:h-96">
      <Bar data={data} options={options} />
    </div>
  );
}
