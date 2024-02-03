'use client'

import { ChevronsLeft, MenuIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@uidotdev/usehooks';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import UserItem from './user-item';

const Sidebar = () => {
  const pathname = usePathname();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isResizingRef = useRef(false);
  const sidebarRef = useRef(null);
  const navbarRef = useRef(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  const handleMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();

    isResizingRef.current = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (event) => {
    if (!isResizingRef.current) {
      return;
    }

    let newWidth = event.clientX;
    if (newWidth < 240) {
      newWidth = 240;
    }
    if (newWidth > 480) {
      newWidth = 480;
    }
    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty('left', `${newWidth}px`);
      navbarRef.current.style.setProperty('width', `calc(100% - ${newWidth}px)`);
    }
  };

  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);

      sidebarRef.current.style.width = isMobile ? '100%' : '240px';
      navbarRef.current.style.setProperty('left', isMobile ? '100%' : '240px');
      navbarRef.current.style.setProperty('width', isMobile ? '0' : 'calc(100% - 240px)');

      setTimeout(() => setIsResetting(false), 300);
    }
  };

  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);

      sidebarRef.current.style.width = '0';
      navbarRef.current.style.setProperty('left', '0');
      navbarRef.current.style.setProperty('width', '100%');
    }
  };

  useEffect(() => {
    isMobile ? collapse() : resetWidth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  useEffect(() => {
    isMobile && collapse();
  }, [isMobile, pathname]);

  return (
    <>
      <aside ref={sidebarRef} className={cn('group/sidebar flex relative w-60 h-full flex-col bg-secondary overflow-y-auto z-top', isResetting && 'transtion-all ease-in-out duration-300', isMobile && 'w-0')}>
        <div onClick={collapse} role="button" className={cn('absolute right-2 top-3 w-6 h-6 rounded-sm text-muted-foreground hover:bg-neutral-300 dark:hover:bg-neutral-600 opacity-0 group-hover/sidebar:opacity-100 transition', isMobile && 'opacity-100')}>
          <ChevronsLeft className="w-6 h-6" />
        </div>
        <div>
          <UserItem />
        </div>
        <div className="mt-4">
          <p>Notes</p>
        </div>
        <div onMouseDown={handleMouseDown} onClick={resetWidth} className="absolute right-0 top-0 w-1 h-full bg-primary/10 opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize" />
      </aside>
      <div ref={navbarRef} className={cn('absolute left-60 top-0 w-[calc(100%-240px)] z-top', isResetting && 'transition-all ease-in-out duration-300', isMobile && 'left-0 w-full')}>
        <nav className="w-full px-3 py-2 bg-transparent">
          {isCollapsed && <MenuIcon onClick={resetWidth} role="button" className="w-6 h-6 text-muted-foreground" />}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
