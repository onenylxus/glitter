'use client';

import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export const SidebarItem = ({
  id,
  label,
  icon: Icon,
  noteIcon,
  active,
  expanded,
  isSearch,
  level = 0,
  onClick,
  onExpand,
}) => {
  const ChevronIcon = expanded ? ChevronDown : ChevronRight;

  return (
    <div
      onClick={onClick}
      role="button"
      style={{ paddingLeft: `${12 * (level + 1)}px` }}
      className={cn(
        'group flex min-h-[27px] w-full items-center py-1 pr-3 text-sm font-medium text-muted-foreground hover:bg-primary/5',
        active && 'bg-primary/5 text-primary'
      )}
    >
      {!!id && (
        <div
          role="button"
          className="hover:bg-netural-300 mr-1 h-full rounded-sm dark:bg-neutral-600"
          onClick={() => {}}
        >
          <ChevronIcon className="shrink-9 h-4 w-4 text-muted-foreground/50" />
        </div>
      )}
      {noteIcon ? (
        <div className="mr-2 shrink-0 text-[18px]">{noteIcon}</div>
      ) : (
        <Icon className="mr-2 h-[18px] shrink-0 text-muted-foreground" />
      )}
      <span className="truncate">{label}</span>
      {isSearch && (
        <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          Ctrl K
        </kbd>
      )}
    </div>
  );
};
