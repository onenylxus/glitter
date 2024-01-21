'use client';

import { ModeToggle } from '@/components/mode-toggle';
import { cn } from '@/lib/utils';
import useScrollTop from '@/hooks/use-scroll-top';
import Logo from './logo';

const Navbar = () => {
  const scrolled = useScrollTop();

  return (
    <div className={cn('flex fixed w-full top-0 p-6 items-center bg-background z-50', scrolled && 'border-b shadow-sm')}>
      <Logo />
      <div className="flex w-full md:ml-auto items-center justify-between md:justify-end gap-x-2">
        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
