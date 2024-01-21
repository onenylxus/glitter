import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { SignInButton, UserButton } from '@clerk/clerk-react';
import { cn } from '@/lib/utils';
import { useConvexAuth } from 'convex/react';
import Link from 'next/link';
import Logo from './logo';
import Spinner from '@/components/spinner';
import useScrollTop from '@/hooks/use-scroll-top';

const Navbar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const scrolled = useScrollTop();

  return (
    <div className={cn('flex fixed w-full top-0 p-6 items-center bg-background z-50', scrolled && 'border-b shadow-sm')}>
      <Logo />
      <div className="flex w-full md:ml-auto items-center justify-between md:justify-end gap-x-2">
        {isLoading && (
          <Spinner />
        )}
        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton mode="modal">
              <Button variant="ghost" size="sm">Login</Button>
            </SignInButton>
            <SignInButton variant="tint" mode="modal">
              <Button size="sm">Get Glitter free</Button>
            </SignInButton>
          </>
        )}
        {isAuthenticated && !isLoading && (
          <>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/documents">Enter Glitter</Link>
            </Button>
            <UserButton afterSignOutUrl="/" />
          </>
        )}
        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
