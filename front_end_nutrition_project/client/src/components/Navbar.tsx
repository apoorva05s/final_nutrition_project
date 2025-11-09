import { Link, useLocation } from "wouter";
import {
  Home,
  LayoutDashboard,
  Package,
  CalendarDays,
  BookOpen,
  BarChart3,
  LogOut,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useUser } from "@/context/UserContext";

export function Navbar() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useUser();

  const handleLogout = async () => {
    try {
      await logout();
      window.location.hash = "#/login"; // hash routing
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // Base nav items
  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/pantry", label: "Pantry", icon: Package },
    { path: "/meal-planner", label: "Meal Planner", icon: CalendarDays },
    { path: "/recipes", label: "Recipes", icon: BookOpen },
    { path: "/analytics", label: "Analytics", icon: BarChart3 },
  ];

  // Hide Home and show Logout if logged in
  const filteredNavItems = isAuthenticated
    ? navItems.filter((item) => item.label !== "Home")
    : navItems;

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href={isAuthenticated ? "/dashboard" : "/"}>
            <a className="flex items-center space-x-2">
              <span className="text-2xl font-serif font-bold text-primary">
                RecipeGen
              </span>
            </a>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {filteredNavItems.map(({ path, label, icon: Icon }) => (
              <Link key={path} href={path}>
                <a
                  className={cn(
                    "flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors hover-elevate",
                    location === path
                      ? "bg-primary/10 text-primary"
                      : "text-foreground"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </a>
              </Link>
            ))}

            {/* Logout styled like nav items */}
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors text-foreground hover-elevate"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {filteredNavItems.map(({ path, label, icon: Icon }) => (
              <Link key={path} href={path}>
                <a
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium",
                    location === path
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover-elevate"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Icon className="w-5 h-5" />
                  <span>{label}</span>
                </a>
              </Link>
            ))}

            {isAuthenticated && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-foreground hover-elevate"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
