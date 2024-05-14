'use client';

import { Button } from '@/components/ui/button';
import { Check, Copy, Globe } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { api } from '@/convex/_generated/api';
import { useMutation } from 'convex/react';
import { useOrigin } from '@/hooks/use-origin';
import { useState } from 'react';
import { toast } from 'sonner';

export const Publish = ({ data }) => {
  const origin = useOrigin();
  const update = useMutation(api.notes.update);
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const url = `${origin}/preview/${data._id}`;

  const onPublish = () => {
    setSubmitting(true);

    const promise = update({
      id: data._id,
      isPublished: true,
    }).finally(() => setSubmitting(false));

    toast.promise(promise, {
      loading: 'Publishing note...',
      success: 'Published note',
      error: 'Failed to publish note',
    });
  };

  const onUnpublish = () => {
    setSubmitting(true);

    const promise = update({
      id: data._id,
      isPublished: false,
    }).finally(() => setSubmitting(false));

    toast.promise(promise, {
      loading: 'Unpublishing note...',
      success: 'Unpublished note',
      error: 'Failed to unpublish note',
    });
  };

  const onCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm">
          Publish
          {data.isPublished && <Globe className="ml-2 h-4 w-4 text-sky-500" />}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72" align="end" alignOffset={8} forceMount>
        {data.isPublished ? (
          <div className="space-y-4">
            <div className="flex items-center gap-x-2">
              <Globe className="h-4 w-4 animate-pulse text-sky-500" />
              <p className="text-xs font-medium text-sky-500">
                This note is published
              </p>
            </div>
            <div className="flex items-center">
              <input className="flex-1 px-2 text-xs border rounded-l-md h-8 bg-muted truncate" value={url} disabled />
              <Button onClick={onCopy} disabled={copied} className="rounded-l-none">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <Button size="sm" disabled={submitting} onClick={onUnpublish} className="w-full text-xs">
              Unpublish
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Globe className="mb-2 h-8 w-8 text-muted-foreground" />
            <p className="mb-2 text-sm font-medium">Publish this note</p>
            <span className="mb-4 text-xs text-muted-foreground">
              Share your work with others
            </span>
            <Button
              size="sm"
              disabled={submitting}
              onClick={onPublish}
              className="w-full text-xs"
            >
              Publish
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
