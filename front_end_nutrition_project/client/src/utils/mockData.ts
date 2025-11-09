export interface Recipe {
  id: string;
  name: string;
  image: string;
  cookTime: number;
  servings: number;
  diet: string[];
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  cost: number;
  co2Impact: number;
  wasteReduction: number;
  ingredients: string[];
  instructions: string[];
}

export interface PantryItem {
  id: string;
  name: string;
  quantity: string;
  expiryDate: string;
  category: string;
}

export interface MealPlan {
  id: string;
  name: string;
  recipes: Recipe[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  totalCost: number;
  avgCo2Impact: number;
  wasteReduction: number;
  sustainabilityScore: number;
}

export const mockRecipes: Recipe[] = [
  {
    id: '1',
    name: 'Grilled Salmon with Quinoa',
    image: '/generated_images/Healthy_salmon_meal_cbacdb21.png',
    cookTime: 30,
    servings: 2,
    diet: ['pescatarian', 'gluten-free'],
    calories: 520,
    protein: 42,
    carbs: 38,
    fat: 22,
    cost: 8.50,
    co2Impact: 2.8,
    wasteReduction: 85,
    ingredients: ['Salmon fillet', 'Quinoa', 'Broccoli', 'Lemon', 'Olive oil'],
    instructions: ['Cook quinoa', 'Grill salmon', 'Steam broccoli', 'Serve with lemon']
  },
  {
    id: '2',
    name: 'Buddha Bowl',
    image: '/generated_images/Vegetarian_Buddha_bowl_0c5fc906.png',
    cookTime: 25,
    servings: 2,
    diet: ['vegan', 'gluten-free'],
    calories: 480,
    protein: 18,
    carbs: 62,
    fat: 16,
    cost: 6.20,
    co2Impact: 1.2,
    wasteReduction: 92,
    ingredients: ['Quinoa', 'Chickpeas', 'Sweet potato', 'Avocado', 'Tahini'],
    instructions: ['Cook quinoa', 'Roast chickpeas and sweet potato', 'Assemble bowl']
  },
  {
    id: '3',
    name: 'Pasta Primavera',
    image: '/generated_images/Pasta_primavera_dish_3249869d.png',
    cookTime: 20,
    servings: 4,
    diet: ['vegetarian'],
    calories: 420,
    protein: 14,
    carbs: 58,
    fat: 12,
    cost: 5.80,
    co2Impact: 1.8,
    wasteReduction: 88,
    ingredients: ['Pasta', 'Cherry tomatoes', 'Zucchini', 'Bell peppers', 'Basil'],
    instructions: ['Boil pasta', 'Sauté vegetables', 'Toss together']
  },
  {
    id: '4',
    name: 'Asian Tofu Stir-Fry',
    image: '/generated_images/Asian_tofu_stir-fry_31800a83.png',
    cookTime: 15,
    servings: 3,
    diet: ['vegan', 'gluten-free'],
    calories: 380,
    protein: 22,
    carbs: 42,
    fat: 14,
    cost: 4.90,
    co2Impact: 0.9,
    wasteReduction: 94,
    ingredients: ['Tofu', 'Broccoli', 'Snap peas', 'Carrots', 'Soy sauce'],
    instructions: ['Press tofu', 'Stir-fry vegetables', 'Add tofu and sauce']
  },
  {
    id: '5',
    name: 'Mexican Burrito Bowl',
    image: '/generated_images/Mexican_burrito_bowl_8467ba24.png',
    cookTime: 35,
    servings: 4,
    diet: ['gluten-free'],
    calories: 550,
    protein: 35,
    carbs: 48,
    fat: 20,
    cost: 7.40,
    co2Impact: 3.2,
    wasteReduction: 80,
    ingredients: ['Chicken', 'Black beans', 'Corn', 'Salsa', 'Guacamole'],
    instructions: ['Season and cook chicken', 'Prepare beans', 'Assemble bowl']
  }
];

export const mockPantryItems: PantryItem[] = [
  { id: '1', name: 'Quinoa', quantity: '500g', expiryDate: '2025-12-15', category: 'Grains' },
  { id: '2', name: 'Chickpeas', quantity: '2 cans', expiryDate: '2026-03-20', category: 'Legumes' },
  { id: '3', name: 'Olive Oil', quantity: '500ml', expiryDate: '2026-01-10', category: 'Oils' },
  { id: '4', name: 'Salmon Fillet', quantity: '400g', expiryDate: '2025-10-25', category: 'Protein' },
  { id: '5', name: 'Sweet Potato', quantity: '3 pieces', expiryDate: '2025-10-28', category: 'Vegetables' },
  { id: '6', name: 'Avocado', quantity: '2 pieces', expiryDate: '2025-10-22', category: 'Vegetables' },
  { id: '7', name: 'Cherry Tomatoes', quantity: '250g', expiryDate: '2025-10-20', category: 'Vegetables' }
];

export const mockMealPlans: MealPlan[] = [
  {
    id: '1',
    name: 'Balanced & Budget-Friendly',
    recipes: [mockRecipes[1], mockRecipes[2], mockRecipes[3]],
    totalCalories: 1280,
    totalProtein: 54,
    totalCarbs: 168,
    totalFat: 40,
    totalCost: 18.00,
    avgCo2Impact: 1.6,
    wasteReduction: 89,
    sustainabilityScore: 88
  },
  {
    id: '2',
    name: 'High Protein Plan',
    recipes: [mockRecipes[0], mockRecipes[4], mockRecipes[3]],
    totalCalories: 1490,
    totalProtein: 91,
    totalCarbs: 144,
    totalFat: 54,
    totalCost: 21.70,
    avgCo2Impact: 2.6,
    wasteReduction: 84,
    sustainabilityScore: 76
  },
  {
    id: '3',
    name: 'Eco-Warrior Vegan',
    recipes: [mockRecipes[1], mockRecipes[3], mockRecipes[2]],
    totalCalories: 1280,
    totalProtein: 54,
    totalCarbs: 168,
    totalFat: 40,
    totalCost: 16.90,
    avgCo2Impact: 1.4,
    wasteReduction: 91,
    sustainabilityScore: 92
  }
];

export const DIETARY_PREFERENCES = [
  'No restrictions',
  'Vegetarian',
  'Vegan',
  'Pescatarian',
  'Paleo',
  'Keto',
  'Low-carb'
];

export const ALLERGENS = [
  'Dairy',
  'Eggs',
  'Gluten',
  'Nuts',
  'Soy',
  'Shellfish',
  'Fish'
];

export const NUTRITION_GOALS = [
  'Balanced',
  'High protein',
  'Low carb',
  'Weight loss',
  'Muscle gain'
];
