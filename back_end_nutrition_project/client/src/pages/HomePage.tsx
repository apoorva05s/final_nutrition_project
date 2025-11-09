import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { OnboardingForm } from '@/components/OnboardingForm';
import { useUser } from '@/context/UserContext';
import { useLocation } from 'wouter';
import { Sparkles, Leaf, DollarSign, TrendingDown } from 'lucide-react';
import heroImage from '@assets/generated_images/Fresh_ingredients_hero_image_2dc62a6e.png';

export default function HomePage() {
  const { hasCompletedOnboarding, setHasCompletedOnboarding } = useUser();
  const [, setLocation] = useLocation();
  const [showOnboarding, setShowOnboarding] = useState(false);

  const handleOnboardingComplete = () => {
    setHasCompletedOnboarding(true);
    setShowOnboarding(false);
    setLocation('/dashboard');
  };

  if (showOnboarding || !hasCompletedOnboarding) {
    return (
      <div className="min-h-screen py-12 px-4">
        <OnboardingForm onComplete={handleOnboardingComplete} />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Fresh ingredients"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
            Your Personalized Meal Planning Assistant
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            AI-powered recipes optimized for nutrition, budget, and sustainability
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => setShowOnboarding(true)}
              className="text-lg gap-2"
              data-testid="button-get-started"
            >
              <Sparkles className="w-5 h-5" />
              Get Started
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setLocation('/recipes')}
              className="text-lg bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
              data-testid="button-browse-recipes"
            >
              Browse Recipes
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-center mb-12">
            Why Choose RecipeGen?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="inline-flex p-4 bg-primary/10 rounded-full">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">AI-Powered Plans</h3>
              <p className="text-muted-foreground">
                Generate personalized meal plans tailored to your dietary preferences and nutrition goals
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="inline-flex p-4 bg-chart-2/10 rounded-full">
                <DollarSign className="w-8 h-8 text-chart-2" />
              </div>
              <h3 className="text-xl font-semibold">Budget-Friendly</h3>
              <p className="text-muted-foreground">
                Optimize your grocery spending with cost-effective recipes that don't compromise on taste
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="inline-flex p-4 bg-chart-3/10 rounded-full">
                <Leaf className="w-8 h-8 text-chart-3" />
              </div>
              <h3 className="text-xl font-semibold">Eco-Conscious</h3>
              <p className="text-muted-foreground">
                Reduce your carbon footprint and minimize food waste with sustainable meal choices
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-center mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-xl">
                1
              </div>
              <h3 className="font-semibold text-lg">Set Preferences</h3>
              <p className="text-sm text-muted-foreground">
                Tell us about your diet, allergens, and goals
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-xl">
                2
              </div>
              <h3 className="font-semibold text-lg">Manage Pantry</h3>
              <p className="text-sm text-muted-foreground">
                Track ingredients and expiry dates
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-xl">
                3
              </div>
              <h3 className="font-semibold text-lg">Generate Plans</h3>
              <p className="text-sm text-muted-foreground">
                Get AI-optimized meal plans instantly
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-xl">
                4
              </div>
              <h3 className="font-semibold text-lg">Cook & Enjoy</h3>
              <p className="text-sm text-muted-foreground">
                Follow easy recipes and reduce waste
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
