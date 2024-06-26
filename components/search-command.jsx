'use client';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { File } from 'lucide-react';
import { api } from '@/convex/_generated/api';
import { useEffect, useState } from 'react';
import { useQuery } from 'convex/react';
import { useRouter } from 'next/navigation';
import { useSearch } from '@/hooks/use-search';
import { useUser } from '@clerk/clerk-react';

export const SearchCommand = () => {
  const { user } = useUser();
  const router = useRouter();
  const notes = useQuery(api.notes.getSearch);
  const search = useSearch();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const keydown = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        search.toggle();
      }
    };

    document.addEventListener('keydown', keydown);
    return () => document.removeEventListener('keydown', keydown);
  }, [search]);

  const onSelect = (id) => {
    router.push(`/notes/${id}`);
    search.onClose();
  };

  if (!mounted) {
    return null;
  }

  return (
    <CommandDialog open={search.isOpen} onOpenChange={search.onClose}>
      <CommandInput placeholder={`Search ${user.fullName}'s Notebook...`} />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {notes && notes.length > 0 && (
          <CommandGroup heading="Notes">
            {notes.map((note) => (
              <CommandItem
                key={note._id}
                value={`${note._id}-${note.title}`}
                title={note.title}
                onSelect={onSelect}
              >
                {note.icon ? (
                  <p className="mr-2 text-[18px]">{note.icon}</p>
                ) : (
                  <File className="mr-2 h-4 w-4" />
                )}
                <span>{note.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  );
};
