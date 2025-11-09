import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FormInput } from './Reusable/FormInput';
import { CheckboxGroup } from './Reusable/CheckboxGroup';
import { SelectDropdown } from './Reusable/SelectDropdown';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useUser } from '@/context/UserContext';
import { DIETARY_PREFERENCES, ALLERGENS, NUTRITION_GOALS } from '@/utils/mockData';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface OnboardingFormProps {
  onComplete: () => void;
}

export function OnboardingForm({ onComplete }: OnboardingFormProps) {
  const { setPreferences } = useUser();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    dietaryPreference: '',
    allergens: [] as string[],
    nutritionGoal: '',
    budget: 50,
    sustainability: 50
  });

  const handleSubmit = () => {
    setPreferences(formData);
    onComplete();
  };

  const totalSteps = 3;

  return (
    <Card className="max-w-2xl mx-auto p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-serif font-semibold mb-2">Welcome to RecipeGen</h2>
        <p className="text-muted-foreground">
          Let's personalize your meal planning experience
        </p>
        <div className="flex gap-2 mt-4">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`h-2 flex-1 rounded-full ${
                i + 1 <= step ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {step === 1 && (
          <div className="space-y-6">
            <SelectDropdown
              id="diet"
              label="Dietary Preference"
              options={DIETARY_PREFERENCES}
              value={formData.dietaryPreference}
              onChange={(value) => setFormData({ ...formData, dietaryPreference: value })}
              placeholder="Select your diet"
              required
            />
            
            <CheckboxGroup
              label="Allergens (select all that apply)"
              options={ALLERGENS}
              selected={formData.allergens}
              onChange={(allergens) => setFormData({ ...formData, allergens })}
            />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Nutrition Goal</Label>
              <div className="grid grid-cols-1 gap-2">
                {NUTRITION_GOALS.map((goal) => (
                  <button
                    key={goal}
                    onClick={() => setFormData({ ...formData, nutritionGoal: goal })}
                    className={`p-4 rounded-lg border-2 text-left transition-all hover-elevate ${
                      formData.nutritionGoal === goal
                        ? 'border-primary bg-primary/5'
                        : 'border-border'
                    }`}
                    data-testid={`button-goal-${goal.toLowerCase().replace(' ', '-')}`}
                  >
                    <span className="font-medium">{goal}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="space-y-3">
              <Label className="text-sm font-medium">
                Weekly Budget: ${formData.budget}
              </Label>
              <Slider
                value={[formData.budget]}
                onValueChange={([value]) => setFormData({ ...formData, budget: value })}
                min={20}
                max={200}
                step={10}
                data-testid="slider-budget"
              />
              <p className="text-xs text-muted-foreground">
                Adjust your weekly meal budget
              </p>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium">
                Sustainability Priority: {formData.sustainability}%
              </Label>
              <Slider
                value={[formData.sustainability]}
                onValueChange={([value]) => setFormData({ ...formData, sustainability: value })}
                min={0}
                max={100}
                step={5}
                data-testid="slider-sustainability"
              />
              <p className="text-xs text-muted-foreground">
                How important is environmental impact?
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between mt-8">
        {step > 1 ? (
          <Button
            variant="outline"
            onClick={() => setStep(step - 1)}
            data-testid="button-back"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
        ) : (
          <div />
        )}

        {step < totalSteps ? (
          <Button
            onClick={() => setStep(step + 1)}
            data-testid="button-next"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            data-testid="button-complete"
          >
            Complete Setup
          </Button>
        )}
      </div>
    </Card>
  );
}
