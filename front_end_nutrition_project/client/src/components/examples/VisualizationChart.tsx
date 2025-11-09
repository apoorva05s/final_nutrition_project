import { VisualizationChart } from '../VisualizationChart';

export default function VisualizationChartExample() {
  const doughnutData = {
    labels: ['Protein', 'Carbs', 'Fat'],
    datasets: [{
      data: [35, 45, 20],
      backgroundColor: [
        'hsl(var(--chart-1))',
        'hsl(var(--chart-2))',
        'hsl(var(--chart-3))'
      ]
    }]
  };

  return (
    <div className="p-6 max-w-md">
      <VisualizationChart
        type="doughnut"
        title="Macro Breakdown"
        data={doughnutData}
      />
    </div>
  );
}
