import { Link, useLocation } from 'wouter';
import { Home, LayoutDashboard, Package, CalendarDays, BookOpen, BarChart3, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/pantry', label: 'Pantry', icon: Package },
  { path: '/meal-planner', label: 'Meal Planner', icon: CalendarDays },
  { path: '/recipes', label: 'Recipes', icon: BookOpen },
  { path: '/analytics', label: 'Analytics', icon: BarChart3 }
];

export function Navbar() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2" data-testid="link-home">
            <span className="text-2xl font-serif font-bold text-primary">RecipeGen</span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                href={path}
                className={cn(
                  "flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors hover-elevate",
                  location === path
                    ? "bg-primary/10 text-primary"
                    : "text-foreground"
                )}
                data-testid={`link-${label.toLowerCase().replace(' ', '-')}`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </Link>
            ))}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-menu"
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                href={path}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium",
                  location === path
                    ? "bg-primary/10 text-primary"
                    : "text-foreground hover-elevate"
                )}
                onClick={() => setMobileMenuOpen(false)}
                data-testid={`link-mobile-${label.toLowerCase().replace(' ', '-')}`}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
