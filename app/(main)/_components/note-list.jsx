'use client';

import { FileIcon } from 'lucide-react';
import { SidebarItem } from './sidebar-item';
import { api } from '@/convex/_generated/api';
import { cn } from '@/lib/utils';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from 'convex/react';
import { useState } from 'react';

export const NoteList = ({ parent, level = 0 }) => {
  const [expanded, setExpanded] = useState({});
  const params = useParams();
  const router = useRouter();
  const notes = useQuery(api.notes.read, { parent });

  const onExpand = (id) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [id]: !prevExpanded[id],
    }));
  };

  const onRedirect = (id) => {
    router.push(`/notes/${id}`);
  };

  if (notes === undefined) {
    return (
      <>
        <SidebarItem.Skeleton level={level} />
        {level === 0 && (
          <>
            <SidebarItem.Skeleton level={level} />
            <SidebarItem.Skeleton level={level} />
          </>
        )}
      </>
    );
  }

  return (
    <>
      <p
        style={{ paddingLeft: level ? `${level * 12 + 25}px` : undefined }}
        className={cn(
          'hidden text-sm font-medium text-muted-foreground/80',
          expanded && 'last:block',
          level === 0 && 'hidden'
        )}
      >
        No notes inside
      </p>
      {notes.map((note) => (
        <div key={note._id}>
          <SidebarItem
            id={note._id}
            label={note.title}
            icon={FileIcon}
            noteIcon={note.icon}
            isActive={params.id === note._id}
            isExpanded={expanded[note._id]}
            level={level}
            onClick={() => onRedirect(note._id)}
            onExpand={() => onExpand(note._id)}
          />
          {expanded[note._id] && (
            <NoteList parent={note._id} level={level + 1} />
          )}
        </div>
      ))}
    </>
  );
};
