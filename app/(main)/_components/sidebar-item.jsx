'use client';

import {
  ChevronDown,
  ChevronRight,
  MoreHorizontal,
  Plus,
  Trash,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/convex/_generated/api';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useMutation } from 'convex/react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/clerk-react';

export const SidebarItem = ({
  id,
  label,
  icon: Icon,
  noteIcon,
  isActive,
  isExpanded,
  isSearch,
  level = 0,
  onClick,
  onExpand,
}) => {
  const { user } = useUser();
  const router = useRouter();
  const archive = useMutation(api.notes.archive);
  const create = useMutation(api.notes.create);

  const ChevronIcon = isExpanded ? ChevronDown : ChevronRight;

  const handleExpand = (e) => {
    e.stopPropagation();
    if (onExpand) {
      onExpand();
    }
  };

  const onArchive = (e) => {
    e.stopPropagation();
    if (!id) {
      return;
    }

    const promise = archive({ id }).then(() => {
      router.push('/notes');
    });
    toast.promise(promise, {
      loading: 'Moving to trash...',
      success: 'Note moved to trash',
      error: 'Failed to archive note',
    });
  };

  const onCreate = (e) => {
    e.stopPropagation();
    if (!id) {
      return;
    }

    const promise = create({ title: 'Untitled', parent: id }).then(
      (childId) => {
        if (onExpand && !isExpanded) {
          onExpand();
        }
        router.push(`/notes/${childId}`);
      }
    );
    toast.promise(promise, {
      loading: 'Creaing a new note...',
      success: 'Created new note',
      error: 'Failed to create note',
    });
  };

  return (
    <div
      onClick={onClick}
      role="button"
      style={{ paddingLeft: `${level * 12 + 12}px` }}
      className={cn(
        'group flex min-h-[27px] w-full items-center py-1 pr-3 text-sm font-medium text-muted-foreground hover:bg-primary/5',
        isActive && 'bg-primary/5 text-primary'
      )}
    >
      {!!id && (
        <div
          role="button"
          className="mr-1 h-full rounded-sm hover:bg-zinc-300 dark:hover:bg-zinc-600"
          onClick={handleExpand}
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
      {!!id && (
        <div className="ml-auto flex items-center gap-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger onClick={(e) => e.stopPropagation()} asChild>
              <div
                role="button"
                className="ml-auto h-full rounded-sm opacity-0 hover:bg-zinc-300 group-hover:opacity-100 dark:hover:bg-zinc-600"
              >
                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-60"
              align="start"
              side="right"
              forceMount
            >
              <DropdownMenuItem onClick={onArchive}>
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <div className="p-2 text-xs text-muted-foreground">
                Last edited by: {user.fullName}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="ml-auto flex items-center gap-x-2">
            <div
              role="button"
              onClick={onCreate}
              className="ml-auto h-full rounded-sm opacity-0 hover:bg-zinc-300 group-hover:opacity-100 dark:hover:bg-zinc-600"
            >
              <Plus className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const SidebarItemSkeleton = ({ level = 0 }) => {
  return (
    <div
      style={{ paddingLeft: level ? `${level * 12 + 25}px` : '12px' }}
      className="flex gap-x-2 py-[3px]"
    >
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-4 w-[30%]" />
    </div>
  );
};

SidebarItem.Skeleton = SidebarItemSkeleton;
