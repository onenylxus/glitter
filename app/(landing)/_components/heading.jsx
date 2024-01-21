'use client'

import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SignInButton } from '@clerk/clerk-react';
import { useConvexAuth } from 'convex/react';
import Link from 'next/link';
import Spinner from '@/components/spinner';

const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="font-bold text-3xl sm:text-5xl md:text-6xl">
        Write notes<br />in a minimal style.
      </h1>
      <h3 className="font-medium text-base sm:text-xl md:text-2xl">
        Glitter is a minimal, flexible and personal note-taking application.
      </h3>
      {isLoading && (
        <div className="flex w-full justify-center items-center">
          <Spinner size="lg" />
        </div>
      )}
      {!isAuthenticated && !isLoading && (
        <SignInButton mode="modal">
          <Button variant="tint">
            Get Glitter free
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </SignInButton>
      )}
      {isAuthenticated && !isLoading && (
        <Button variant="tint" asChild>
          <Link href="/documents">
            Enter Glitter
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      )}
    </div>
  );
};

export default Heading;
