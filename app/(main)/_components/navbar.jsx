'use client';

import { Banner } from './banner';
import { Menu } from './menu';
import { MenuIcon } from 'lucide-react';
import { Title } from './title';
import { api } from '@/convex/_generated/api';
import { useParams } from 'next/navigation';
import { useQuery } from 'convex/react';

export const Navbar = ({ isCollapsed, onResetWidth }) => {
  const params = useParams();

  const note = useQuery(api.notes.getById, { id: params.noteId });
  if (note === undefined) {
    return (
      <nav className="flex w-full items-center justify-between bg-background px-3 py-2 dark:bg-[#1f1f1f]">
        <Title.Skeleton />
        <div className="flex items-center gap-x-2">
          <Menu.Skeleton />
        </div>
      </nav>
    );
  }
  if (note === null) {
    return null;
  }

  return (
    <>
      <nav className="flex w-full items-center gap-x-4 bg-background px-3 py-2 dark:bg-[#1f1f1f]">
        {isCollapsed && (
          <MenuIcon
            role="button"
            onClick={onResetWidth}
            className="h-6 w-6 text-muted-foreground"
          />
        )}
        <div className="flex w-full items-center justify-between">
          <Title data={note} />
          <div className="flex items-center gap-x-2">
            <Menu noteId={note._id} />
          </div>
        </div>
      </nav>
      {note.isArchived && <Banner noteId={note._id} />}
    </>
  );
};
