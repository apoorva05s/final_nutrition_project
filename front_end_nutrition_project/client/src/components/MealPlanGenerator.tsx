import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { mockMealPlans, MealPlan } from '@/utils/mockData';
import {
  Sparkles,
  DollarSign,
  Leaf,
  TrendingDown,
  Check,
  Lightbulb,
  HeartPulse,
  Stethoscope,
} from 'lucide-react';
import { useUser } from '@/context/UserContext';

export function MealPlanGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const [prompt, setPrompt] = useState('');
  const [healthConstraints, setHealthConstraints] = useState('');
  const [medicalConditions, setMedicalConditions] = useState('');
  const { setActiveMealPlan, activeMealPlan } = useUser();

  const handleGenerate = () => {
    setIsGenerating(true);

    // Combine everything into a single AI prompt (later you’ll send this to API)
    const fullPrompt = `
Health Constraints: ${healthConstraints || 'None'}
Medical Conditions: ${medicalConditions || 'None'}
Meal Plan Request: ${prompt}
`;
    console.log('🧠 Final AI Prompt:', fullPrompt);

    // Simulated AI response (mock)
    setTimeout(() => {
      setMealPlans(mockMealPlans);
      setIsGenerating(false);
    }, 1500);
  };

  const handleSelectPlan = (plan: MealPlan) => {
    setActiveMealPlan(plan);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="text-center">
          <h2 className="text-3xl font-serif font-semibold">AI Meal Plan Generator</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-2">
            Generate personalized meal plans optimized for nutrition, cost, and sustainability
          </p>
        </div>

        <Card className="max-w-3xl mx-auto p-6 space-y-5">
          {/* 🩺 Health Constraints */}
          <div className="space-y-2">
            <Label htmlFor="health" className="text-base font-semibold flex items-center gap-2">
              <HeartPulse className="w-5 h-5 text-primary" />
              Health Constraints
            </Label>
            <Input
              id="health"
              placeholder="e.g., Vegan, low sugar, lactose-free"
              value={healthConstraints}
              onChange={(e) => setHealthConstraints(e.target.value)}
              className="w-full"
            />
          </div>

          {/* ⚕️ Medical Conditions */}
          <div className="space-y-2">
            <Label htmlFor="medical" className="text-base font-semibold flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-primary" />
              Medical Conditions
            </Label>
            <Input
              id="medical"
              placeholder="e.g., Diabetes, high blood pressure, thyroid issues"
              value={medicalConditions}
              onChange={(e) => setMedicalConditions(e.target.value)}
              className="w-full"
            />
          </div>

          {/* 💡 AI Prompt */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Lightbulb className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <Label htmlFor="prompt" className="text-base font-semibold">
                  Describe Your Ideal Meal Plan
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Use natural language to tell us what you're looking for. For example:
                  "I need a week of high-protein vegetarian meals under $40" or
                  "Give me quick dinners using ingredients from my pantry."
                </p>
              </div>
            </div>

            <Textarea
              id="prompt"
              placeholder="Example: I want healthy breakfast and lunch ideas that are quick to prepare, use seasonal vegetables, and fit my gluten-free diet. Budget: around $50 for the week."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[120px] resize-none"
              data-testid="textarea-prompt"
            />
          </div>

          {/* 🚀 Generate Button */}
          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            size="lg"
            className="w-full gap-2"
            data-testid="button-generate-plans"
          >
            <Sparkles className="w-5 h-5" />
            {isGenerating ? 'Generating Plans...' : 'Generate Meal Plans'}
          </Button>
        </Card>
      </div>

      {/* 🍽 Meal Plans Display */}
      {mealPlans.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mealPlans.map((plan) => {
            const isActive = activeMealPlan?.id === plan.id;

            return (
              <Card
                key={plan.id}
                className={`p-6 space-y-4 transition-all hover-elevate ${
                  isActive ? 'ring-2 ring-primary' : ''
                }`}
                data-testid={`card-meal-plan-${plan.id}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-serif font-semibold text-lg">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {plan.recipes.length} recipes
                    </p>
                  </div>
                  {isActive && (
                    <Badge variant="default" className="gap-1">
                      <Check className="w-3 h-3" />
                      Active
                    </Badge>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Total Calories</span>
                    <span className="font-mono font-medium">{plan.totalCalories}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Macros</span>
                    <span className="font-mono text-xs">
                      P:{plan.totalProtein}g C:{plan.totalCarbs}g F:{plan.totalFat}g
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-chart-2">
                      <DollarSign className="w-4 h-4" />
                      <span className="text-xs font-medium">Cost</span>
                    </div>
                    <p className="text-lg font-semibold">${plan.totalCost.toFixed(2)}</p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-chart-3">
                      <Leaf className="w-4 h-4" />
                      <span className="text-xs font-medium">CO₂</span>
                    </div>
                    <p className="text-lg font-semibold">{plan.avgCo2Impact.toFixed(1)}kg</p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-chart-4">
                      <TrendingDown className="w-4 h-4" />
                      <span className="text-xs font-medium">Waste</span>
                    </div>
                    <p className="text-lg font-semibold">{plan.wasteReduction}%</p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-primary">
                      <Sparkles className="w-4 h-4" />
                      <span className="text-xs font-medium">Score</span>
                    </div>
                    <p className="text-lg font-semibold">{plan.sustainabilityScore}/100</p>
                  </div>
                </div>

                <Button
                  className="w-full"
                  variant={isActive ? 'outline' : 'default'}
                  onClick={() => handleSelectPlan(plan)}
                  data-testid={`button-select-plan-${plan.id}`}
                >
                  {isActive ? 'Selected' : 'Select Plan'}
                </Button>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

