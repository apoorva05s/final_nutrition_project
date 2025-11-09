import { Card } from '@/components/ui/card';
import { VisualizationChart } from './VisualizationChart';
import { mockMealPlans } from '@/utils/mockData';
import { Info } from 'lucide-react';

export function AnalyticsPanel() {
  const paretoData = {
    datasets: [{
      label: 'Meal Plans',
      data: mockMealPlans.map(plan => ({
        x: plan.totalCost,
        y: plan.sustainabilityScore,
        r: plan.totalCalories / 50
      })),
      backgroundColor: 'hsl(var(--primary) / 0.6)',
      borderColor: 'hsl(var(--primary))',
      borderWidth: 2
    }]
  };

  const paretoOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Total Cost ($)'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Sustainability Score'
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `Cost: $${context.parsed.x.toFixed(2)}, Score: ${context.parsed.y}`;
          }
        }
      }
    }
  };

  const costComparisonData = {
    labels: mockMealPlans.map(plan => plan.name),
    datasets: [{
      label: 'Total Cost',
      data: mockMealPlans.map(plan => plan.totalCost),
      backgroundColor: 'hsl(var(--chart-2))',
    }]
  };

  const nutritionData = {
    labels: ['Protein', 'Carbs', 'Fat'],
    datasets: mockMealPlans.map((plan, index) => ({
      label: plan.name,
      data: [plan.totalProtein, plan.totalCarbs, plan.totalFat],
      backgroundColor: `hsl(var(--chart-${index + 1}))`,
      borderWidth: 2,
      borderColor: 'hsl(var(--background))'
    }))
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-serif font-semibold mb-2">Analytics & Insights</h2>
        <p className="text-muted-foreground">
          Visualize trade-offs and compare meal plan performance
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <VisualizationChart
          type="bubble"
          title="Cost vs. Sustainability (Pareto Front)"
          data={paretoData}
          options={paretoOptions}
        />
        
        <VisualizationChart
          type="bar"
          title="Cost Comparison"
          data={costComparisonData}
        />
      </div>

      <VisualizationChart
        type="bar"
        title="Nutrition Comparison"
        data={nutritionData}
        options={{
          scales: {
            x: { stacked: false },
            y: { stacked: false, title: { display: true, text: 'Grams' } }
          }
        }}
      />

      <Card className="p-6">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Info className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold mb-2">Explainable AI Insights</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                <strong className="text-foreground">Why "Eco-Warrior Vegan"?</strong>
                <br />
                This plan was recommended because it minimizes carbon footprint (1.4kg CO₂) 
                while maintaining excellent nutrition balance and staying within your budget.
                The plant-based recipes reduce environmental impact by 45% compared to meat-heavy alternatives.
              </p>
              <p>
                <strong className="text-foreground">Cost Optimization:</strong>
                <br />
                By selecting seasonal vegetables and bulk grains, this plan achieves a 12% cost 
                reduction compared to the average meal plan while maintaining high nutritional value.
              </p>
              <p>
                <strong className="text-foreground">Sustainability Score:</strong>
                <br />
                The 92/100 sustainability score reflects minimal packaging waste, locally-sourced 
                ingredients where possible, and recipes designed to use whole ingredients efficiently.
              </p>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-sm">Plan Name</th>
                <th className="text-left py-3 px-4 font-semibold text-sm">Calories</th>
                <th className="text-left py-3 px-4 font-semibold text-sm">Cost</th>
                <th className="text-left py-3 px-4 font-semibold text-sm">CO₂ (kg)</th>
                <th className="text-left py-3 px-4 font-semibold text-sm">Waste Reduction</th>
                <th className="text-left py-3 px-4 font-semibold text-sm">Score</th>
              </tr>
            </thead>
            <tbody>
              {mockMealPlans.map((plan) => (
                <tr key={plan.id} className="border-b hover-elevate">
                  <td className="py-4 px-4 font-medium">{plan.name}</td>
                  <td className="py-4 px-4 font-mono">{plan.totalCalories}</td>
                  <td className="py-4 px-4 font-mono">${plan.totalCost.toFixed(2)}</td>
                  <td className="py-4 px-4 font-mono">{plan.avgCo2Impact.toFixed(1)}</td>
                  <td className="py-4 px-4 font-mono">{plan.wasteReduction}%</td>
                  <td className="py-4 px-4 font-mono font-semibold text-primary">
                    {plan.sustainabilityScore}/100
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
