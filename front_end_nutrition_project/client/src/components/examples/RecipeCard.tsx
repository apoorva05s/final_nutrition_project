import { RecipeCard } from '../RecipeCard';
import { mockRecipes } from '@/utils/mockData';

export default function RecipeCardExample() {
  return (
    <div className="p-6 max-w-sm">
      <RecipeCard
        recipe={mockRecipes[0]}
        onClick={() => console.log('Recipe clicked')}
      />
    </div>
  );
}
