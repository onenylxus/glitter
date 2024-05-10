'use client';

import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import { useMutation } from 'convex/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ConfirmModal } from '@/components/modals/confirm-modal';

export const Banner = ({ noteId }) => {
  const router = useRouter();
  const restore = useMutation(api.notes.restore);
  const remove = useMutation(api.notes.remove);

  const onRemove = () => {
    const promise = remove({ id: noteId });
    toast.promise(promise, {
      loading: 'Deleting note...',
      success: 'Note deleted from trash',
      error: 'Failed to delete note',
    });

    router.push('/notes');
  };

  const onRestore = () => {
    const promise = restore({ id: noteId });
    toast.promise(promise, {
      loading: 'Restoring note...',
      success: 'Note restored from trash',
      error: 'Failed to restore note',
    });
  };

  return (
    <div className="flex w-full items-center justify-center gap-x-2 bg-rose-500 p-2 text-center text-sm text-white">
      <p>This page is in trash.</p>
      <Button
        size="sm"
        onClick={onRestore}
        variant="outline"
        className="h-auto border-white bg-transparent p-1 px-2 font-normal text-white hover:bg-primary/5 hover:text-white"
      >
        Restore
      </Button>
      <ConfirmModal onConfirm={onRemove}>
        <Button
          size="sm"
          variant="outline"
          className="h-auto border-white bg-transparent p-1 px-2 font-normal text-white hover:bg-primary/5 hover:text-white"
        >
          Delete
        </Button>
      </ConfirmModal>
    </div>
  );
};
