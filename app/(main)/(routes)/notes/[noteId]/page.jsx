'use client';

import { Cover } from '@/components/cover';
import { Skeleton } from '@/components/ui/skeleton';
import { Toolbar } from '@/components/toolbar';
import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';

const NoteIdPage = ({ params }) => {
  const note = useQuery(api.notes.getById, { id: params.noteId });

  if (note === undefined) {
    return <div>
      <Cover.Skeleton />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
        <div className="space-y-4 pl-8 pt-4">
          <Skeleton className="h-14 w-[50%]" />
          <Skeleton className="h-4 w-[80%]" />
          <Skeleton className="h-4 w-[40%]" />
          <Skeleton className="h-4 w-[60%]" />
        </div>
      </div>
    </div>;
  }
  if (note === null) {
    return <div>Not found</div>;
  }

  return (
    <div className="pb-40">
      <Cover url={note.coverImage} />
      <div className="mx-auto md:max-w-3xl lg:max-w-4xl">
        <Toolbar data={note} />
      </div>
    </div>
  );
};

export default NoteIdPage;
