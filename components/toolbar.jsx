'use client';

import { Button } from '@/components/ui/button';
import { IconPicker } from '@/components/icon-picker';
import { ImageIcon, Smile, X } from 'lucide-react';
import { api } from '@/convex/_generated/api';
import { useCoverImage } from '@/hooks/use-cover-image';
import { useMutation } from 'convex/react';
import { useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

export const Toolbar = ({ data, preview }) => {
  const inputRef = useRef(null);
  const update = useMutation(api.notes.update);
  const removeIcon = useMutation(api.notes.removeIcon);
  const coverImage = useCoverImage();
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(data.title);

  const enableInput = () => {
    if (preview || !inputRef) {
      return;
    }

    setEditing(true);
    setTimeout(() => {
      setValue(data.title);
      inputRef.current.focus();
    }, 0);
  };

  const disableInput = () => {
    setEditing(false);
  };

  const onInput = (value) => {
    setValue(value);
    update({
      id: data._id,
      title: value || 'Untitled',
    });
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      disableInput();
    }
  };

  const onIconSelect = (icon) => {
    update({
      id: data._id,
      icon,
    });
  };

  const onIconRemove = () => {
    removeIcon({
      id: data._id,
    });
  };

  return (
    <div className="group relative pl-[54px]">
      {!!data.icon && !preview && (
        <div className="group/icon flex items-center gap-x-2 pt-6">
          <IconPicker onChange={onIconSelect}>
            <p className="text-6xl transition hover:opacity-75">{data.icon}</p>
          </IconPicker>
          <Button
            variant="outline"
            size="icon"
            onClick={onIconRemove}
            className="rounded-full text-xs text-muted-foreground opacity-0 transition group-hover/icon:opacity-100"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      {!!data.icon && preview && <p className="pt-6 text-6xl">{data.icon}</p>}
      <div className="flex items-center gap-x-1 py-4 opacity-0 group-hover:opacity-100">
        {!data.icon && !preview && (
          <IconPicker onChange={onIconSelect} asChild>
            <Button
              variant="outline"
              size="sm"
              className="text-xs text-muted-foreground"
            >
              <Smile className="mr-2 h-4 w-4" />
              Add icon
            </Button>
          </IconPicker>
        )}
        {!data.coverImage && !preview && (
          <Button
            onClick={coverImage.onOpen}
            variant="outline"
            size="sm"
            className="text-xs text-muted-foreground"
          >
            <ImageIcon className="mr-2 h-4 w-4" />
            Add cover
          </Button>
        )}
      </div>
      {editing && !preview ? (
        <TextareaAutosize
          ref={inputRef}
          onBlur={disableInput}
          onKeyDown={onKeyDown}
          onChange={(e) => onInput(e.target.value)}
          value={value}
          className="resize-none break-words bg-transparent text-5xl font-bold text-[#3f3f3f] outline-none dark:text-[#cfcfcf]"
        />
      ) : (
        <div
          onClick={enableInput}
          className="break-words pb-[11.5px] text-5xl font-bold text-[#3f3f3f] outline-none dark:text-[#cfcfcf]"
        >
          {data.title}
        </div>
      )}
    </div>
  );
};
