'use client';

import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { SingleImageDropzone } from '@/components/single-image-dropzone';
import { api } from '@/convex/_generated/api';
import { useCoverImage } from '@/hooks/use-cover-image';
import { useEdgeStore } from '@/lib/edgestore';
import { useMutation } from 'convex/react';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export const CoverImageModal = () => {
  const { edgestore } = useEdgeStore();
  const params = useParams();
  const coverImage = useCoverImage();
  const update = useMutation(api.notes.update);
  const [file, setFile] = useState();
  const [submitting, setSubmitting] = useState(false);

  const onClose = () => {
    setFile(undefined);
    setSubmitting(false);
    coverImage.onClose();
  };

  const onChange = async (file) => {
    if (file) {
      setSubmitting(true);
      setFile(file);

      const res = await edgestore.publicFiles.upload({ file });
      await update({
        id: params.noteId,
        coverImage: res.url,
      });

      onClose();
    }
  };

  return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-center text-lg font-semibold">Cover image</h2>
        </DialogHeader>
        <SingleImageDropzone
          className="w-full outline-none"
          disabled={submitting}
          value={file}
          onChange={onChange}
        />
      </DialogContent>
    </Dialog>
  );
};
