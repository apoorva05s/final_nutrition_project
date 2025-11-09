import { MealPlanGenerator } from '../MealPlanGenerator';
import { UserProvider } from '@/context/UserContext';

export default function MealPlanGeneratorExample() {
  return (
    <UserProvider>
      <div className="p-6 min-h-screen bg-background">
        <MealPlanGenerator />
      </div>
    </UserProvider>
  );
}
