"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation"; // Next.js routing and path helpers
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Firebase Auth imports
import { Icons } from "@/components/ui/icons"; // Custom icons for loading spinner

// AuthWrapper Component to handle authentication flow
export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  // Managing the authentication state: 'loading', 'authenticated', or 'unauthenticated'
  const [authState, setAuthState] = useState<
    "loading" | "authenticated" | "unauthenticated"
  >("loading");

  const router = useRouter(); // Next.js router for redirection
  const pathname = usePathname(); // Current route path
  const auth = getAuth(); // Firebase Auth instance

  useEffect(() => {
    // Listen for authentication state changes from Firebase
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is authenticated
        setAuthState("authenticated");
      } else if (pathname !== "/login" && pathname !== "/signup") {
        // If unauthenticated and not on login/signup page, redirect to login
        setAuthState("unauthenticated");
        router.push("/login");
      } else {
        // If unauthenticated but on login/signup, no need for redirection
        setAuthState("unauthenticated");
      }
    });

    // Cleanup the Firebase Auth listener on unmount
    return unsubscribe;
  }, [auth, router, pathname]);

  // Allow users to access login and signup pages without authentication
  if (pathname === "/login" || pathname === "/signup") {
    return <>{children}</>; // Render content without authentication check
  }

  // Show a loading spinner while Firebase checks authentication state
  if (authState === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <Icons.spinner className="mr-2 h-6 w-6 animate-spin" />{" "}
        {/* Loading Spinner */}
        <span>Loading...</span>
      </div>
    );
  }

  // If user is not authenticated, return null (don't render anything)
  if (authState === "unauthenticated") {
    return null; // Redirecting to login, so nothing is shown
  }

  // If authenticated, render the children (main content)
  return <>{children}</>;
}
