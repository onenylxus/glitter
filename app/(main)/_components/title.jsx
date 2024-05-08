'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/convex/_generated/api';
import { useRef, useState } from 'react';
import { useMutation } from 'convex/react';

export const Title = ({ data }) => {
  const inputRef = useRef(null);
  const update = useMutation(api.notes.update);

  const [title, setTitle] = useState(data.title || 'Untitled');
  const [editing, setEditing] = useState(false);

  const enableInput = () => {
    setTitle(data.title);
    setEditing(true);
    setTimeout(() => {
      if (inputRef) {
        inputRef.current.focus();
        inputRef.current.setSelectionRange(0, inputRef.current.value.length);
      }
    }, 0);
  };

  const disableInput = () => {
    setEditing(false);
  };

  const onChange = (e) => {
    setTitle(e.target.value);
    update({
      id: data._id,
      title: e.target.value || 'Untitled',
    });
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      disableInput();
    }
  };

  if (!data) {
    return null;
  }

  return (
    <div className="flex items-center gap-x-1">
      {!!data.icon && <p>{data.icon}</p>}
      {editing ? (
        <Input
          ref={inputRef}
          onClick={enableInput}
          onBlur={disableInput}
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={title}
          className="h-7 px-2 focus-visible:ring-transparent"
        />
      ) : (
        <Button
          onClick={enableInput}
          variant="ghost"
          className="h-auto p-1 font-normal"
        >
          <span className="truncate">{data.title}</span>
        </Button>
      )}
    </div>
  );
};

Title.Skeleton = function TitleSkeleton() {
  return <Skeleton className="h-9 w-20 rounded-md" />;
};
