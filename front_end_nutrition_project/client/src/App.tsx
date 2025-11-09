// import { Switch, Route, useLocation, Router as WouterRouter } from "wouter";
// import { useHashLocation } from "wouter/use-hash-location";
// import { queryClient } from "./lib/queryClient";
// import { QueryClientProvider } from "@tanstack/react-query";
// import { Toaster } from "@/components/ui/toaster";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { UserProvider } from "@/context/UserContext";
// import { ErrorBoundary } from "@/components/ErrorBoundary";
// import { Navbar } from "@/components/Navbar";
// import HomePage from "@/pages/HomePage";
// import DashboardPage from "@/pages/DashboardPage";
// import PantryPage from "@/pages/PantryPage";
// import MealPlannerPage from "@/pages/MealPlannerPage";
// import RecipesPage from "@/pages/RecipesPage";
// import AnalyticsPage from "@/pages/AnalyticsPage";
// import LoginPage from "@/pages/LoginPage";
// import NotFound from "@/pages/not-found";

// function AppRouter() {
//   const [location] = useLocation();
//   const showNavbar = location !== "/" && location !== "/login";

//   return (
//     <div className="min-h-screen bg-background">
//       {showNavbar && <Navbar />}
//       <Switch>
//         <Route path="/" component={HomePage} />
//         <Route path="/login" component={LoginPage} />
//         <Route path="/dashboard" component={DashboardPage} />
//         <Route path="/pantry" component={PantryPage} />
//         <Route path="/meal-planner" component={MealPlannerPage} />
//         <Route path="/recipes" component={RecipesPage} />
//         <Route path="/analytics" component={AnalyticsPage} />
//         <Route component={NotFound} />
//       </Switch>
//     </div>
//   );
// }

// function App() {
//   return (
//     <ErrorBoundary>
//       <QueryClientProvider client={queryClient}>
//         <TooltipProvider>
//           <UserProvider>
//             <WouterRouter hook={useHashLocation}>
//               <AppRouter />
//             </WouterRouter>
//             <Toaster />
//           </UserProvider>
//         </TooltipProvider>
//       </QueryClientProvider>
//     </ErrorBoundary>
//   );
// }

// export default App;

// import { Switch, Route, useLocation, Router as WouterRouter } from "wouter";
// import { useHashLocation } from "wouter/use-hash-location";
// import { queryClient } from "./lib/queryClient";
// import { QueryClientProvider } from "@tanstack/react-query";
// import { Toaster } from "@/components/ui/toaster";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { UserProvider, useUser } from "@/context/UserContext";
// import { ErrorBoundary } from "@/components/ErrorBoundary";
// import { Navbar } from "@/components/Navbar";
// import HomePage from "@/pages/HomePage";
// import DashboardPage from "@/pages/DashboardPage";
// import PantryPage from "@/pages/PantryPage";
// import MealPlannerPage from "@/pages/MealPlannerPage";
// import RecipesPage from "@/pages/RecipesPage";
// import AnalyticsPage from "@/pages/AnalyticsPage";
// import LoginPage from "@/pages/LoginPage";
// import NotFound from "@/pages/not-found";
// import { useEffect } from "react";
// import { useLocation as useWouterLocation } from "wouter";

// /**
//  * Small inline spinner component used while Firebase determines auth state.
//  * Replace with your app Spinner if you have one.
//  */
// function Spinner() {
//   return (
//     <div className="flex items-center justify-center">
//       <svg
//         className="animate-spin h-8 w-8"
//         xmlns="http://www.w3.org/2000/svg"
//         fill="none"
//         viewBox="0 0 24 24"
//       >
//         <circle
//           className="opacity-25"
//           cx="12"
//           cy="12"
//           r="10"
//           stroke="currentColor"
//           strokeWidth="4"
//         />
//         <path
//           className="opacity-75"
//           fill="currentColor"
//           d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
//         />
//       </svg>
//     </div>
//   );
// }

// function AppRouter() {
//   const [location] = useLocation();
//   const showNavbar = location !== "/" && location !== "/login";

//   // Use auth from context to decide redirect and to handle initial loading
//   const { user, loading, isAuthenticated } = useUser();
//   const [, setLocation] = useWouterLocation();

//   // Wait for firebase to finish initial auth check
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <Spinner />
//       </div>
//     );
//   }

//   // Redirect logic (use hash paths)
//   useEffect(() => {
//     if (!loading) {
//       if (isAuthenticated) {
//         // If at root or login, send to dashboard
//         if (location === "/" || location === "/login") {
//           // Use hash-based path
//           setLocation("#/dashboard");
//         }
//       } else {
//         // If not authenticated and trying to access protected pages, send to login
//         const protectedPaths = [
//           "/dashboard",
//           "/pantry",
//           "/meal-planner",
//           "/recipes",
//           "/analytics",
//         ];
//         if (protectedPaths.includes(location)) {
//           setLocation("#/login");
//         }
//       }
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [loading, isAuthenticated, location]);

//   return (
//     <div className="min-h-screen bg-background">
//       {showNavbar && <Navbar />}
//       <Switch>
//         <Route path="/" component={HomePage} />
//         <Route path="/login" component={LoginPage} />
//         <Route path="/dashboard" component={DashboardPage} />
//         <Route path="/pantry" component={PantryPage} />
//         <Route path="/meal-planner" component={MealPlannerPage} />
//         <Route path="/recipes" component={RecipesPage} />
//         <Route path="/analytics" component={AnalyticsPage} />
//         <Route component={NotFound} />
//       </Switch>
//     </div>
//   );
// }

// function App() {
//   return (
//     <ErrorBoundary>
//       <QueryClientProvider client={queryClient}>
//         <TooltipProvider>
//           <UserProvider>
//             <WouterRouter hook={useHashLocation}>
//               <AppRouter />
//             </WouterRouter>
//             <Toaster />
//           </UserProvider>
//         </TooltipProvider>
//       </QueryClientProvider>
//     </ErrorBoundary>
//   );
// }

// export default App;


import { useEffect } from "react";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { UserProvider, useUser } from "@/context/UserContext";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Navbar } from "@/components/Navbar";
import HomePage from "@/pages/HomePage";
import DashboardPage from "@/pages/DashboardPage";
import PantryPage from "@/pages/PantryPage";
import MealPlannerPage from "@/pages/MealPlannerPage";
import RecipesPage from "@/pages/RecipesPage";
import AnalyticsPage from "@/pages/AnalyticsPage";
import LoginPage from "@/pages/LoginPage";
import NotFound from "@/pages/not-found";

/* --------------------------------------------------------
 * Small inline spinner used while Firebase determines auth state.
 * -------------------------------------------------------- */
function Spinner() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <svg
        className="animate-spin h-8 w-8 text-primary"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
    </div>
  );
}

/* --------------------------------------------------------
 * Router logic with hash-based auth redirects
 * -------------------------------------------------------- */
function AppRouter() {
  const [location, setLocation] = useLocation();
  const { user, loading, isAuthenticated } = useUser();

  const showNavbar = location !== "/" && location !== "/login";

  // ✅ Redirect logic — always runs in consistent hook order
  useEffect(() => {
    if (loading) return; // wait until Firebase initializes

    const protectedPaths = [
      "/dashboard",
      "/pantry",
      "/meal-planner",
      "/recipes",
      "/analytics",
    ];

    // --- If authenticated ---
    if (isAuthenticated) {
      if (location === "/" || location === "/login") {
        setLocation("#/dashboard");
      }
    }
    // --- If not authenticated and trying to access protected pages ---
    else if (protectedPaths.includes(location)) {
      setLocation("#/login");
    }
  }, [loading, isAuthenticated, location, setLocation]);

  // ✅ Show loading spinner during auth check
  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="min-h-screen bg-background">
      {showNavbar && <Navbar />}
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/dashboard" component={DashboardPage} />
        <Route path="/pantry" component={PantryPage} />
        <Route path="/meal-planner" component={MealPlannerPage} />
        <Route path="/recipes" component={RecipesPage} />
        <Route path="/analytics" component={AnalyticsPage} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

/* --------------------------------------------------------
 * Root Application with Providers
 * -------------------------------------------------------- */
function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <UserProvider>
            {/* ✅ Hash-based router for compatibility */}
            <WouterRouter hook={useHashLocation}>
              <AppRouter />
            </WouterRouter>
            <Toaster />
          </UserProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
