'use client';

import { Cover } from '@/components/cover';
import { Skeleton } from '@/components/ui/skeleton';
import { Toolbar } from '@/components/toolbar';
import { api } from '@/convex/_generated/api';
import { useMemo } from 'react';
import { useMutation, useQuery } from 'convex/react';
import dynamic from 'next/dynamic';

const PreviewNoteIdPage = ({ params }) => {
  const Editor = useMemo(
    () => dynamic(() => import('@/components/editor'), { ssr: false }),
    []
  );

  const note = useQuery(api.notes.getById, { id: params.noteId });
  const update = useMutation(api.notes.update);

  const onChange = (content) => {
    update({ id: params.noteId, content });
  };

  if (note === undefined) {
    return (
      <div>
        <Cover.Skeleton />
        <div className="mx-auto mt-10 md:max-w-3xl lg:max-w-4xl">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-14 w-[50%]" />
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[40%]" />
            <Skeleton className="h-4 w-[60%]" />
          </div>
        </div>
      </div>
    );
  }
  if (note === null) {
    return <div>Not found</div>;
  }

  return (
    <div className="pb-40">
      <Cover preview url={note.coverImage} />
      <div className="mx-auto md:max-w-3xl lg:max-w-4xl">
        <Toolbar preview data={note} />
        <Editor editable={false} data={note.content} onChange={onChange} />
      </div>
    </div>
  );
};

export default PreviewNoteIdPage;
