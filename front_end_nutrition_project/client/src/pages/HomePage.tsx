import {
  BrainCircuit,
  LayoutGrid,
  Leaf,
  Library,
  DollarSign,
  PieChart,
  LogIn,
} from 'lucide-react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';

// --- IMAGE PATH ---
// This path will work correctly once the `attached_assets`
// folder is moved inside the `client/public` folder.
const heroImage = '/attached_assets/generated_images/Fresh_ingredients_hero_image_2dc62a6e.png';


/**
 * A reusable component for your feature cards
 * @param {object} props
 * @param {React.ReactNode} props.icon - The icon component
 * @param {string} props.title - The title of the feature
 * @param {string} props.description - The description of the feature
 */
function FeatureCard({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-3">
      <div className="inline-flex p-3 bg-primary/10 rounded-full">
        {icon}
      </div>
      <h3 className="text-xl font-serif font-semibold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

/**
 * A reusable component for the "How it Works" steps
 * @param {object} props
 * @param {string} props.number - The step number
 * @param {string} props.title - The title of the step
 * @param {string} props.description - The description of the step
 */
function Step({ number, title, description }: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="space-y-3 text-center md:text-left">
      <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-xl mx-auto md:mx-0">
        {number}
      </div>
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

// Your new Homepage
export default function HomePage() {
  const [, setLocation] = useLocation();

  // Use hash-based navigation
  const navigateToLogin = () => setLocation('#/login');

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Navbar */}
      <nav className="absolute top-0 left-0 right-0 z-20 py-4 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-serif font-bold text-white">
            RecipeGen
          </h1>
          <Button
            variant="outline"
            className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
            onClick={navigateToLogin}
          >
            <LogIn className="w-4 h-4 mr-2" />
            Login / Register
          </Button>
        </div>
      </nav>

      {/* 2. Hero Section (with dark overlay) */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Fresh ingredients"
            className="w-full h-full object-cover"
          />
          {/* --- THIS IS THE DARK OVERLAY --- */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
            Your Nutrition Journey, Powered by AI
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            AI-powered meal plans and recipes optimized for your nutrition,
            budget, and sustainability goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={navigateToLogin}
              className="text-lg gap-2"
            >
              Get Started Free
            </Button>
          </div>
        </div>
      </section>

      {/* 3. Features Section (Inspired by the "IVF" design) */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-center mb-12">
            Revolutionary Nutrition Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<BrainCircuit className="w-8 h-8 text-primary" />}
              title="AI Meal Plan Generator"
              description="Get personalized meal plans tailored to your diet, budget, and nutritional targets."
            />
            <FeatureCard
              icon={<LayoutGrid className="w-8 h-8 text-primary" />}
              title="Smart Pantry Manager"
              description="Track your inventory, reduce food waste, and get recipes that use what you already have."
            />
            <FeatureCard
              icon={<PieChart className="w-8 h-8 text-primary" />}
              title="Analytics & Insights"
              description="Visualize your spending, nutritional breakdown, and sustainability score over time."
            />
            <FeatureCard
              icon={<Library className="w-8 h-8 text-primary" />}
              title="Personalized Recipe Library"
              description="Discover thousands of recipes that fit your unique preferences and dietary needs."
            />
            <FeatureCard
              icon={<DollarSign className="w-8 h-8 text-primary" />}
              title="Budget Optimization"
              description="Our AI finds the best recipes to help you meet your goals while saving money."
            />
            <FeatureCard
              icon={<Leaf className="w-8 h-8 text-primary" />}
              title="Sustainability Tracking"
              description="Understand the carbon footprint of your meals and make eco-friendly choices."
            />
          </div>
        </div>
      </section>

      {/* 4. How It Works Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-center mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-10">
            <Step
              number="1"
              title="Personalize"
              description="Create your profile with your diet, allergies, budget, and goals."
            />
            <Step
              number="2"
              title="Track"
              description="Log the ingredients you have in your smart pantry."
            />
            <Step
              number="3"
              title="Generate"
              description="Our AI instantly builds an optimal meal plan just for you."
            />
            <Step
              number="4"
              title="Analyze"
              description="Track your progress and discover insights into your habits."
            />
          </div>
        </div>
      </section>

      {/* 5. Call-to-Action (CTA) Section */}
      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8">
            Join thousands of users optimizing their nutrition, budget, and
            lifestyle with AI.
          </p>
          <Button
            size="lg"
            variant="outline"
            onClick={navigateToLogin}
            className="text-lg bg-white text-primary hover:bg-white/90"
          >
            Start Free Today
          </Button>
        </div>
      </section>

      {/* 6. Footer */}
      <footer className="py-8 px-4 bg-gray-800 text-gray-400">
        <div className="max-w-6xl mx-auto text-center text-sm">
          <p>&copy; 2025 RecipeGen. All rights reserved.</p>
          <p className="mt-2">
            AI-powered insights are for informational purposes and should not
            replace professional medical advice.
          </p>
        </div>
      </footer>
    </div>
  );
}
