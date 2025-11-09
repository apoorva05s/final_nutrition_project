import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, DollarSign, Leaf } from 'lucide-react';
import { Recipe } from '@/utils/mockData';

interface RecipeCardProps {
  recipe: Recipe;
  onClick?: () => void;
}

export function RecipeCard({ recipe, onClick }: RecipeCardProps) {
  return (
    <Card
      className="overflow-hidden cursor-pointer hover-elevate transition-all"
      onClick={onClick}
      data-testid={`card-recipe-${recipe.id}`}
    >
      <div className="aspect-square relative overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          {recipe.diet.map(tag => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      
      <div className="p-4 space-y-3">
        <h3 className="font-serif font-semibold text-lg line-clamp-1" data-testid={`text-recipe-name-${recipe.id}`}>
          {recipe.name}
        </h3>
        
        <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{recipe.cookTime} min</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{recipe.servings} servings</span>
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="w-4 h-4" />
            <span>${recipe.cost.toFixed(2)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Leaf className="w-4 h-4 text-chart-3" />
            <span>{recipe.wasteReduction}%</span>
          </div>
        </div>
        
        <div className="pt-2 border-t">
          <div className="flex justify-between text-xs font-mono">
            <span>{recipe.calories} cal</span>
            <span>P:{recipe.protein}g C:{recipe.carbs}g F:{recipe.fat}g</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
