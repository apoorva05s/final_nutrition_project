import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useUser } from '@/context/UserContext';
import { Package, AlertTriangle, TrendingUp, ChevronRight } from 'lucide-react';
import { Link } from 'wouter';

export function DashboardOverview() {
  const { activeMealPlan, pantryItems } = useUser();
  
  const expiringItems = pantryItems.filter(item => {
    const today = new Date();
    const expiry = new Date(item.expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays >= 0;
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-serif font-semibold mb-2">Dashboard</h2>
        <p className="text-muted-foreground">Your meal planning overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold">Active Plan</h3>
            </div>
          </div>
          
          {activeMealPlan ? (
            <div className="space-y-2">
              <p className="font-serif text-lg">{activeMealPlan.name}</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{activeMealPlan.recipes.length} recipes</span>
                <span>•</span>
                <span>${activeMealPlan.totalCost.toFixed(2)}</span>
              </div>
              <div className="pt-2">
                <Badge variant="secondary">Score: {activeMealPlan.sustainabilityScore}/100</Badge>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-muted-foreground">No active meal plan</p>
              <Link href="/meal-planner">
                <Button size="sm" data-testid="button-create-plan">
                  Create Plan
                </Button>
              </Link>
            </div>
          )}
        </Card>

        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-chart-3/10 rounded-lg">
                <Package className="w-5 h-5 text-chart-3" />
              </div>
              <h3 className="font-semibold">Pantry Stats</h3>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Total Items</span>
              <span className="text-2xl font-semibold font-mono">{pantryItems.length}</span>
            </div>
            <Link href="/pantry">
              <Button variant="outline" size="sm" className="w-full gap-2" data-testid="button-manage-pantry">
                Manage Pantry
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-destructive/10 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-destructive" />
              </div>
              <h3 className="font-semibold">Expiring Soon</h3>
            </div>
          </div>
          
          <div className="space-y-2">
            {expiringItems.length > 0 ? (
              <>
                <p className="text-3xl font-semibold font-mono">{expiringItems.length}</p>
                <p className="text-sm text-muted-foreground">
                  {expiringItems.length === 1 ? 'item expires' : 'items expire'} within 7 days
                </p>
                <ul className="space-y-1 pt-2">
                  {expiringItems.slice(0, 3).map(item => (
                    <li key={item.id} className="text-sm flex justify-between">
                      <span className="truncate">{item.name}</span>
                      <Badge variant="secondary" className="ml-2">{item.expiryDate}</Badge>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="text-muted-foreground">All items are fresh!</p>
            )}
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <Link href="/meal-planner">
            <Button variant="outline" className="w-full" data-testid="button-quick-generate">
              Generate Meal Plans
            </Button>
          </Link>
          <Link href="/recipes">
            <Button variant="outline" className="w-full" data-testid="button-quick-recipes">
              Browse Recipes
            </Button>
          </Link>
          <Link href="/pantry">
            <Button variant="outline" className="w-full" data-testid="button-quick-pantry">
              Update Pantry
            </Button>
          </Link>
          <Link href="/analytics">
            <Button variant="outline" className="w-full" data-testid="button-quick-analytics">
              View Analytics
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
