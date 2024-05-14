'use client';

import { Button } from '@/components/ui/button';
import { ImageIcon, X } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/convex/_generated/api';
import { cn } from '@/lib/utils';
import { useEdgeStore } from '@/lib/edgestore';
import { useCoverImage } from '@/hooks/use-cover-image';
import { useMutation } from 'convex/react';
import { useParams } from 'next/navigation';
import Image from 'next/image';

export const Cover = ({ url, preview }) => {
  const { edgestore } = useEdgeStore();
  const params = useParams();
  const coverImage = useCoverImage();
  const removeCover = useMutation(api.notes.removeCover);

  const onRemove = async () => {
    if (url) {
      await edgestore.publicFiles.delete({ url });
    }
    removeCover({
      id: params.noteId,
    });
  };

  return (
    <div
      className={cn(
        'group relative h-[35vh] w-full',
        !url && 'h-[12vh]',
        url && 'bg-muted'
      )}
    >
      {url && <Image src={url} fill alt="Cover" className="object-cover" />}
      {url && !preview && (
        <div className="absolute bottom-5 right-5 flex items-center gap-x-2 opacity-0 group-hover:opacity-100">
          <Button
            variant="outline"
            size="sm"
            onClick={() => coverImage.onReplace(url)}
            className="text-xs text-muted-foreground"
          >
            <ImageIcon className="mr-2 h-4 w-4" />
            Change cover
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onRemove}
            className="text-xs text-muted-foreground"
          >
            <X className="mr-2 h-4 w-4" />
            Remove cover
          </Button>
        </div>
      )}
    </div>
  );
};

Cover.Skeleton = function CoverSkeleton() {
  return <Skeleton className="h-[12vh] w-full" />;
};
