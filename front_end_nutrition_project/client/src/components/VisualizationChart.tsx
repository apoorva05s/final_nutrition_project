import { Card } from '@/components/ui/card';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar, Doughnut, Bubble } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface VisualizationChartProps {
  type: 'line' | 'bar' | 'doughnut' | 'bubble';
  title: string;
  data: any;
  options?: any;
}

export function VisualizationChart({ type, title, data, options }: VisualizationChartProps) {
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
          padding: 15
        }
      },
      title: {
        display: false
      }
    },
    ...options
  };

  const ChartComponent = {
    line: Line,
    bar: Bar,
    doughnut: Doughnut,
    bubble: Bubble
  }[type];

  return (
    <Card className="p-6">
      <h3 className="font-semibold text-lg mb-4">{title}</h3>
      <div className="w-full">
        <ChartComponent data={data} options={defaultOptions} />
      </div>
    </Card>
  );
}
