'use client';

import { cn } from '@/lib/utils';
import useScrollTop from '@/hooks/useScrollTop';
import Logo from './logo';

const Navbar = () => {
  const scrolled = useScrollTop();

  return (
    <div className={cn('flex fixed w-full top-0 p-6 items-center bg-background z-50', scrolled && 'border-b shadow-sm')}>
      <Logo />
      <div className="flex w-full md:ml-auto items-center justify-between md:justify-end gap-x-2">
        Login
      </div>
    </div>
  );
};

export default Navbar;
