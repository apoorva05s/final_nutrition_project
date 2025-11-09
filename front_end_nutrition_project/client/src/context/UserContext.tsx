import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { PantryItem, MealPlan } from "@/utils/mockData";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  User as FirebaseUser,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

interface UserPreferences {
  dietaryPreference: string;
  allergens: string[];
  nutritionGoal: string;
  budget: number;
  sustainability: number;
}

/** App-level user object exposed by context (simplified) */
export type AppUser = {
  uid: string;
  email: string | null;
  displayName: string | null;
} | null;

interface UserContextType {
  // existing app state
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

  // auth-related
  user: AppUser;
  loading: boolean; // true until firebase determines auth state
  login: (email: string, password: string) => Promise<FirebaseUser>;
  register: (email: string, password: string, fullName?: string) => Promise<FirebaseUser>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  // --- existing app state ---
  const [preferences, setPreferences] = useState<UserPreferences>({
    dietaryPreference: "No restrictions",
    allergens: [],
    nutritionGoal: "Balanced",
    budget: 50,
    sustainability: 50,
  });

  const [pantryItems, setPantryItems] = useState<PantryItem[]>([]);
  const [activeMealPlan, setActiveMealPlan] = useState<MealPlan | null>(null);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  const addPantryItem = (item: PantryItem) => {
    setPantryItems((prev) => [...prev, item]);
  };

  const updatePantryItem = (id: string, item: PantryItem) => {
    setPantryItems((prev) => prev.map((i) => (i.id === id ? item : i)));
  };

  const deletePantryItem = (id: string) => {
    setPantryItems((prev) => prev.filter((i) => i.id !== id));
  };

  // --- auth state ---
  const [user, setUser] = useState<AppUser>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser) => {
        if (firebaseUser) {
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
          });
        } else {
          setUser(null);
        }
        // after first callback, loading should be false
        setLoading(false);
      },
      (err) => {
        console.error("onAuthStateChanged error:", err);
        setUser(null);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // auth functions
  const login = async (email: string, password: string) => {
    const resp = await signInWithEmailAndPassword(auth, email, password);
    // onAuthStateChanged will update context.user
    return resp.user;
  };

  const register = async (email: string, password: string, fullName?: string) => {
    const resp = await createUserWithEmailAndPassword(auth, email, password);
    if (fullName) {
      try {
        await updateProfile(resp.user, { displayName: fullName });
        // onAuthStateChanged will update displayName in context
      } catch (err) {
        console.warn("Failed to set displayName:", err);
      }
    }
    return resp.user;
  };

  const logout = async () => {
    await signOut(auth);
    // onAuthStateChanged will set user to null
  };

  const isAuthenticated = !!user;

  const value = useMemo(
    () => ({
      // existing app state
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
      setHasCompletedOnboarding,

      // auth
      user,
      loading,
      login,
      register,
      logout,
      isAuthenticated,
    }),
    [
      preferences,
      pantryItems,
      activeMealPlan,
      hasCompletedOnboarding,
      user,
      loading,
    ]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error("useUser must be used within UserProvider");
  }
  return ctx;
}

