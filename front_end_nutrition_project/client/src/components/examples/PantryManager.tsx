import { PantryManager } from '../PantryManager';
import { UserProvider } from '@/context/UserContext';

export default function PantryManagerExample() {
  return (
    <UserProvider>
      <div className="p-6 max-w-6xl mx-auto">
        <PantryManager />
      </div>
    </UserProvider>
  );
}
