import { Button } from '@/components/ui/button';
import { Logo } from './logo';
import { ModeToggle } from '@/components/mode-toggle';
import { SignInButton, UserButton } from '@clerk/clerk-react';
import { Spinner } from '@/components/spinner';
import { cn } from '@/lib/utils';
import { useConvexAuth } from 'convex/react';
import Link from 'next/link';
import useScrollTop from '@/hooks/use-scroll-top';

export const Navbar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const scrolled = useScrollTop();

  return (
    <div
      className={cn(
        'fixed top-0 z-50 flex w-full items-center bg-background p-6',
        scrolled && 'border-b shadow-sm'
      )}
    >
      <Logo />
      <div className="flex w-full items-center justify-between gap-x-2 md:ml-auto md:justify-end">
        {isLoading && <Spinner />}
        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton mode="modal">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </SignInButton>
            <SignInButton variant="tint" mode="modal">
              <Button size="sm">Get Glitter free</Button>
            </SignInButton>
          </>
        )}
        {isAuthenticated && !isLoading && (
          <>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/notes">Enter Glitter</Link>
            </Button>
            <UserButton afterSignOutUrl="/" />
          </>
        )}
        <ModeToggle />
      </div>
    </div>
  );
};
