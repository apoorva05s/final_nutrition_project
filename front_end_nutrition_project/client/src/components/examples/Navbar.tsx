import { Link, useLocation } from "wouter";
import { useUser } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export function Navbar(): JSX.Element {
  const { user, isAuthenticated, logout } = useUser();
  const [location, setLocation] = useLocation();

  // Log only once for debugging
  useEffect(() => {
    console.log("Navbar user context:", { user, isAuthenticated });
  }, [user, isAuthenticated]);

  const handleLogout = async () => {
    try {
      await logout();
      setLocation("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // Navbar links
  const navLinks = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/pantry", label: "Pantry" },
    { path: "/meal-planner", label: "Meal Planner" },
    { path: "/recipes", label: "Recipes" },
    { path: "/analytics", label: "Analytics" },
  ];

  return (
    <nav className="flex justify-between items-center px-6 py-3 bg-card shadow-sm">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-semibold text-primary">RecipeRealm</h1>
        <div className="flex gap-4">
          {/* Show Home only when NOT logged in */}
          {!isAuthenticated && (
            <Link href="/">
              <span
                className={`${
                  location === "/" ? "text-primary font-semibold" : "text-muted-foreground"
                } hover:text-primary transition`}
              >
                Home
              </span>
            </Link>
          )}
          {/* Show protected links only when logged in */}
          {isAuthenticated &&
            navLinks.map((link) => (
              <Link key={link.path} href={link.path}>
                <span
                  className={`${
                    location === link.path
                      ? "text-primary font-semibold"
                      : "text-muted-foreground"
                  } hover:text-primary transition`}
                >
                  {link.label}
                </span>
              </Link>
            ))}
        </div>
      </div>

      {/* Right side: login or logout button */}
      <div>
        {isAuthenticated ? (
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <Link href="/login">
            <Button variant="default">Login</Button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;



