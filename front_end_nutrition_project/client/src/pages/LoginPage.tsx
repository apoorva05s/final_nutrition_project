import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLocation } from "wouter";
import { AlertCircle, LogIn } from "lucide-react";
import { useUser } from "@/context/UserContext";

// A simple component to show error messages
function AuthError({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <div className="bg-destructive/10 border border-destructive/30 text-destructive p-3 rounded-md flex items-center gap-2 text-sm">
      <AlertCircle className="w-4 h-4" />
      <p>{message}</p>
    </div>
  );
}

export default function LoginPage() {
  // We still use setLocation for manual navigation when clicking the logo / anchor.
  const [, setLocation] = useLocation();
  const { login, register } = useUser();

  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState(""); // For registration
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // --- FORM VALIDATION ---
    if (!email || !password) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }
    if (!isLoginView && !fullName) {
      setError("Please enter your full name.");
      setLoading(false);
      return;
    }

    try {
      if (isLoginView) {
        await login(email.trim(), password);
      } else {
        await register(email.trim(), password, fullName.trim() || undefined);
      }
      // DO NOT call setLocation here to navigate to dashboard.
      // App will respond to auth state changes and redirect appropriately.
    } catch (err: any) {
      // Firebase errors include a `code` and a `message`.
      setError(err?.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const toggleView = () => {
    setIsLoginView(!isLoginView);
    setError(null);
    setEmail("");
    setPassword("");
    setFullName("");
  };

  return (
    <div className="min-h-screen w-full bg-muted/30 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-6">
          {/* Make the logo a clickable link back to the homepage */}
          <a
            href="#/"
            onClick={(e) => {
              e.preventDefault();
              // Use hash-based path for navigation
              setLocation("#/");
            }}
            className="inline-flex items-center gap-2 text-primary font-serif font-bold text-3xl"
          >
            <LogIn className="w-8 h-8" />
            RecipeGen
          </a>
        </div>

        {/* Auth Card */}
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-serif">
              {isLoginView ? "Welcome Back!" : "Create Your Account"}
            </CardTitle>
            <CardDescription>
              {isLoginView
                ? "Sign in to access your meal plans."
                : "Get started with AI-powered nutrition."}
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {/* Error Message */}
              <AuthError message={error} />

              {/* Full Name (Register only) */}
              {!isLoginView && (
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    placeholder="Jane Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    disabled={loading}
                  />
                </div>
              )}

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="jane@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading
                  ? "Please wait..."
                  : isLoginView
                  ? "Login"
                  : "Create Account"}
              </Button>

              <Button
                type="button"
                variant="link"
                className="text-muted-foreground"
                onClick={toggleView}
                disabled={loading}
              >
                {isLoginView
                  ? "Don't have an account? Register"
                  : "Already have an account? Login"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}

