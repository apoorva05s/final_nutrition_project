import { createContext, useContext, useState, ReactNode } from 'react';
import { PantryItem, MealPlan } from '@/utils/mockData';

interface UserPreferences {
  dietaryPreference: string;
  allergens: string[];
  nutritionGoal: string;
  budget: number;
  sustainability: number;
}

interface UserContextType {
  preferences: UserPreferences;
  setPreferences: (prefs: UserPreferences) => void;
  pantryItems: PantryItem[];
  setPantryItems: (items: PantryItem[]) => void;
  addPantryItem: (item: PantryItem) => void;
  updatePantryItem: (id: string, item: PantryItem) => void;
  deletePantryItem: (id: string) => void;
  activeMealPlan: MealPlan | null;
  setActiveMealPlan: (plan: MealPlan | null) => void;
  hasCompletedOnboarding: boolean;
  setHasCompletedOnboarding: (completed: boolean) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<UserPreferences>({
    dietaryPreference: 'No restrictions',
    allergens: [],
    nutritionGoal: 'Balanced',
    budget: 50,
    sustainability: 50
  });

  const [pantryItems, setPantryItems] = useState<PantryItem[]>([]);
  const [activeMealPlan, setActiveMealPlan] = useState<MealPlan | null>(null);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  const addPantryItem = (item: PantryItem) => {
    setPantryItems(prev => [...prev, item]);
  };

  const updatePantryItem = (id: string, item: PantryItem) => {
    setPantryItems(prev => prev.map(i => i.id === id ? item : i));
  };

  const deletePantryItem = (id: string) => {
    setPantryItems(prev => prev.filter(i => i.id !== id));
  };

  return (
    <UserContext.Provider value={{
      preferences,
      setPreferences,
      pantryItems,
      setPantryItems,
      addPantryItem,
      updatePantryItem,
      deletePantryItem,
      activeMealPlan,
      setActiveMealPlan,
      hasCompletedOnboarding,
      setHasCompletedOnboarding
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
}
