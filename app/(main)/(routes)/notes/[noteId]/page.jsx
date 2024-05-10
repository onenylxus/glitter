'use client';

import { Toolbar } from '@/components/toolbar';
import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';

const NoteIdPage = ({ params }) => {
  const note = useQuery(api.notes.getById, { id: params.noteId });

  if (note === undefined) {
    return <div>Loading</div>;
  }
  if (note === null) {
    return <div>Not found</div>;
  }

  return (
    <div className="pb-40">
      <div className="h-[35vh]" />
      <div className="mx-auto md:max-w-3xl lg:max-w-4xl">
        <Toolbar data={note} />
      </div>
    </div>
  );
};

export default NoteIdPage;
