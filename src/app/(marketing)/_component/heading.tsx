"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { SignInButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    <>
      <div className="max-w-3xl space-y-4">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-black text-center max-w-3xl">
          Your Ideas Documents Plans. Unified. Welcome to{" "}
          <span className="underline">Jotion</span>
        </h1>
        <h3 className="text-base sm:text-xl md:text-2xl font-medium">
          Jotion is the connected workspace where <br />
          Better, faster work happen
        </h3>
        {isLoading && (
          <div className="w-full flex justify-center items-center">
            <Spinner size="lg" />
          </div>
        )}
        {isAuthenticated && !isLoading && (
          <>
            <Button>
              <Link href="/document">Enter Jotion</Link>
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </>
        )}
        {!isAuthenticated && !isLoading && (
          <SignInButton mode="modal">
            <Button>
              Get Jotion free
              <ArrowRight />
            </Button>
          </SignInButton>
        )}
      </div>
    </>
  );
};

export default Heading;
