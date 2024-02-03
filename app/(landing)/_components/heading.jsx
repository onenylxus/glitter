'use client';

import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SignInButton } from '@clerk/clerk-react';
import { Spinner } from '@/components/spinner';
import { useConvexAuth } from 'convex/react';
import Link from 'next/link';

export const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl font-bold sm:text-5xl md:text-6xl">
        Write notes
        <br />
        in a minimal style.
      </h1>
      <h3 className="text-base font-medium sm:text-xl md:text-2xl">
        Glitter is a minimal, flexible and personal note-taking application.
      </h3>
      {isLoading && (
        <div className="flex w-full items-center justify-center">
          <Spinner size="lg" />
        </div>
      )}
      {!isAuthenticated && !isLoading && (
        <SignInButton mode="modal">
          <Button variant="tint">
            Get Glitter free
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </SignInButton>
      )}
      {isAuthenticated && !isLoading && (
        <Button variant="tint" asChild>
          <Link href="/notes">
            Enter Glitter
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      )}
    </div>
  );
};
