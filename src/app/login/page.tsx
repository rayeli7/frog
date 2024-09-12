// pages/login.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { UserAuthForm } from "./components/user-auth-forms";

export default function LoginPage() {
  return (
    <>
      {/* Mobile view images */}
      <div className="md:hidden relative w-screen h-screen">
        {/* Light mode image for mobile */}
        <Image
          src="/Authentication/authentication-light.png"
          alt="Authentication"
          className="absolute inset-0 object-cover"
          layout="fill"
        />
        {/* Dark mode image for mobile, hidden by default */}
        <Image
          src="/Authentication/authentication-dark.png"
          alt="Authentication"
          className="absolute inset-0 object-cover hidden dark:block"
          layout="fill"
        />
      </div>

      {/* Desktop view */}
      <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        {/* Sign Up link */}
        <Link
          href="/signup"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8",
          )}
        >
          Click here to Sign Up
        </Link>
        {/* Left column for desktop view */}
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          {/* App name or logo */}
          <div className="relative z-20 flex items-center text-lg font-medium">
            Frog
          </div>
          {/* Footer section */}
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <footer className="text-sm">2024</footer>
            </blockquote>
          </div>
        </div>
        {/* Right column for desktop view */}
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            {/* Login form header */}
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Log in to your account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to sign into your account
              </p>
            </div>
            {/* User authentication form component */}
            <UserAuthForm />
            {/* Terms of Service and Privacy Policy links */}
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
