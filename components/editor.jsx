'use client';

import { BlockNoteView } from '@blocknote/mantine';
import { useCreateBlockNote } from '@blocknote/react';
import { useEdgeStore } from '@/lib/edgestore';
import { useTheme } from 'next-themes';
import '@blocknote/core/fonts/inter.css';
import '@blocknote/mantine/style.css';

const Editor = ({ data, onChange, editable = true }) => {
  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();

  const handleUpload = async (file) => {
    const res = await edgestore.publicFiles.upload({ file });
    return res.url;
  };

  const editor = useCreateBlockNote({
    initialContent: data ? JSON.parse(data) : undefined,
    uploadFile: handleUpload,
  });

  const onEdit = () => {
    onChange(JSON.stringify(editor.document, null, 2));
  };

  return (
    <div>
      <BlockNoteView
        editor={editor}
        theme={resolvedTheme}
        editable={editable}
        onChange={onEdit}
      />
    </div>
  );
};

export default Editor;
