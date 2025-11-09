import { useState } from 'react';
import { RecipeCard } from '@/components/RecipeCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockRecipes } from '@/utils/mockData';
import { Search, X } from 'lucide-react';

export default function RecipesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDiets, setSelectedDiets] = useState<string[]>([]);
  const [timeFilter, setTimeFilter] = useState<number | null>(null);

  const dietTags = ['vegan', 'vegetarian', 'pescatarian', 'gluten-free'];
  const timeFilters = [
    { label: 'Under 20 min', value: 20 },
    { label: 'Under 30 min', value: 30 },
    { label: 'Under 45 min', value: 45 }
  ];

  const filteredRecipes = mockRecipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          recipe.ingredients.some(ing => ing.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesDiet = selectedDiets.length === 0 ||
                        selectedDiets.some(diet => recipe.diet.includes(diet));
    const matchesTime = timeFilter === null || recipe.cookTime <= timeFilter;
    
    return matchesSearch && matchesDiet && matchesTime;
  });

  const toggleDiet = (diet: string) => {
    setSelectedDiets(prev =>
      prev.includes(diet)
        ? prev.filter(d => d !== diet)
        : [...prev, diet]
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-serif font-semibold mb-2">Recipe Library</h1>
          <p className="text-muted-foreground">
            Discover delicious recipes tailored to your preferences
          </p>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search recipes or ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
              data-testid="input-search-recipes"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">Diet:</span>
              {dietTags.map(diet => (
                <Badge
                  key={diet}
                  variant={selectedDiets.includes(diet) ? 'default' : 'outline'}
                  className="cursor-pointer hover-elevate"
                  onClick={() => toggleDiet(diet)}
                  data-testid={`filter-diet-${diet}`}
                >
                  {diet}
                  {selectedDiets.includes(diet) && <X className="w-3 h-3 ml-1" />}
                </Badge>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">Time:</span>
              {timeFilters.map(filter => (
                <Badge
                  key={filter.value}
                  variant={timeFilter === filter.value ? 'default' : 'outline'}
                  className="cursor-pointer hover-elevate"
                  onClick={() => setTimeFilter(timeFilter === filter.value ? null : filter.value)}
                  data-testid={`filter-time-${filter.value}`}
                >
                  {filter.label}
                  {timeFilter === filter.value && <X className="w-3 h-3 ml-1" />}
                </Badge>
              ))}
            </div>

            {(selectedDiets.length > 0 || timeFilter !== null || searchQuery) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedDiets([]);
                  setTimeFilter(null);
                  setSearchQuery('');
                }}
                data-testid="button-clear-filters"
              >
                Clear All
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRecipes.map(recipe => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onClick={() => console.log('View recipe:', recipe.name)}
            />
          ))}
        </div>

        {filteredRecipes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No recipes found. Try adjusting your filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
