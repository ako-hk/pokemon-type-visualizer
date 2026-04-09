import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  single: number;
  dual: number;
}

export default function TypeSlotChart({ single, dual }: Props) {
  const data = {
    labels: ['Single-type', 'Dual-type'],
    datasets: [
      {
        data: [single, dual],
        backgroundColor: ['#6890F0', '#F08030'],
        borderColor: ['#6890F0cc', '#F08030cc'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: { color: '#94a3b8' },
      },
      title: {
        display: true,
        text: 'Single-type vs Dual-type',
        color: '#e2e8f0',
        font: { size: 16 },
      },
      tooltip: {
        callbacks: {
          label: (ctx: { label: string; parsed: number }) =>
            ` ${ctx.label}: ${ctx.parsed} Pokémon`,
        },
      },
    },
  };

  return (
    <div className="relative h-72 sm:h-80">
      <Doughnut data={data} options={options} />
    </div>
  );
}
