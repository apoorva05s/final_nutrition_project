import { OnboardingForm } from '../OnboardingForm';
import { UserProvider } from '@/context/UserContext';

export default function OnboardingFormExample() {
  return (
    <UserProvider>
      <div className="p-6 min-h-screen bg-background">
        <OnboardingForm onComplete={() => console.log('Onboarding completed')} />
      </div>
    </UserProvider>
  );
}
