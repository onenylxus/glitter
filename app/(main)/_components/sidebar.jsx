'use client'

import { ChevronsLeft, MenuIcon } from 'lucide-react';
import { useMediaQuery } from '@uidotdev/usehooks';
import { usePathname } from 'next/navigation';
import { useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  const pathname = usePathname();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isResizingRef = useRef(false);
  const sidebarRef = useRef(null);
  const navbarRef = useRef(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  return (
    <>
      <aside ref={sidebarRef} className={cn('group/sidebar flex relative w-60 h-full flex-col bg-secondary overflow-y-auto z-[99999]', isResetting && 'transtion-all ease-in-out duration-300', isMobile && 'w-0')}>
        <div role="button" className={cn('absolute right-2 top-3 w-6 h-6 rounded-sm text-muted-foreground hover:bg-neutral-300 dark:hover:bg-neutral-600 opacity-0 group-hover/sidebar:opacity-100 transition', isMobile && 'opacity-100')}>
          <ChevronsLeft className="w-6 h-6" />
        </div>
        <div>
          <p>Actions</p>
        </div>
        <div className="mt-4">
          <p>Notes</p>
        </div>
        <div className="absolute right-0 top-0 w-1 h-full bg-primary/10 opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize"></div>
      </aside>
      <div ref={navbarRef} className={cn('absolute left-60 top-0 w-[calc(100%-240px)] z-[99999]', isResetting && 'transition-all ease-in-out duration-300', isMobile && 'left-0 w-full')}>
        <nav className="w-full px-3 py-2 bg-transparent">
          {isCollapsed && <MenuIcon role="button" className="w-6 h-6 text-muted-foreground" />}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
