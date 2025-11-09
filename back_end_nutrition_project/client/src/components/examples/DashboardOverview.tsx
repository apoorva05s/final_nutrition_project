import { DashboardOverview } from '../DashboardOverview';
import { UserProvider } from '@/context/UserContext';

export default function DashboardOverviewExample() {
  return (
    <UserProvider>
      <div className="p-6 max-w-7xl mx-auto">
        <DashboardOverview />
      </div>
    </UserProvider>
  );
}
