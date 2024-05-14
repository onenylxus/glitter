'use client';

import { ConfirmModal } from '@/components/modals/confirm-modal';
import { Input } from '@/components/ui/input';
import { Search, Trash, Undo } from 'lucide-react';
import { Spinner } from '@/components/spinner';
import { api } from '@/convex/_generated/api';
import { useMutation, useQuery } from 'convex/react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

export const TrashBox = () => {
  const router = useRouter();
  const params = useParams();
  const notes = useQuery(api.notes.getTrash);
  const restore = useMutation(api.notes.restore);
  const remove = useMutation(api.notes.remove);
  const [search, setSearch] = useState('');

  const filteredNotes = notes
    ? notes.filter((note) => {
        return note.title.toLowerCase().includes(search.toLowerCase());
      })
    : undefined;

  const onClick = (noteId) => {
    router.push(`/notes/${noteId}`);
  };

  const onRestore = (e, id) => {
    e.stopPropagation();

    const promise = restore({ id });
    toast.promise(promise, {
      loading: 'Restoring note...',
      success: 'Note restored from trash',
      error: 'Failed to restore note',
    });
  };

  const onRemove = (id) => {
    const promise = remove({ id });
    toast.promise(promise, {
      loading: 'Deleting note...',
      success: 'Note deleted from trash',
      error: 'Failed to delete note',
    });

    if (params.noteId === id) {
      router.push('/notes');
    }
  };

  if (!notes) {
    return (
      <div className="flex h-full items-center justify-center p-4">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="text-sm">
      <div className="flex items-center gap-x-1 p-2">
        <Search className="h-4 w-4" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-7 bg-secondary px-2 focus-visible:ring-transparent"
          placeholder="Filter by page title..."
        />
      </div>
      <div className="mt-2 px-1 pb-1">
        <p className="hidden pb-2 text-center text-xs text-muted-foreground last:block">
          No notes found.
        </p>
        {filteredNotes &&
          filteredNotes.map((note) => (
            <div
              key={note._id}
              role="button"
              onClick={() => onClick(note._id)}
              className="flex w-full items-center justify-between rounded-sm text-sm text-primary hover:bg-primary/5"
            >
              <span className="truncate pl-2">{note.title}</span>
              <div className="flex items-center">
                <div
                  onClick={(e) => onRestore(e, note._id)}
                  role="button"
                  className="rounded-sm p-2 hover:bg-zinc-200 dark:hover:bg-zinc-600"
                >
                  <Undo className="h-4 w-4 text-muted-foreground" />
                </div>
                <ConfirmModal onConfirm={() => onRemove(note._id)}>
                  <div
                    role="button"
                    className="rounded-sm p-2 hover:bg-zinc-200 dark:hover:bg-zinc-600"
                  >
                    <Trash className="h-4 w-4 text-muted-foreground" />
                  </div>
                </ConfirmModal>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
