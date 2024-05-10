'use client';

import EmojiPicker from 'emoji-picker-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useTheme } from 'next-themes';

export const IconPicker = ({ onChange, children, asChild }) => {
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme || 'light';

  return (
    <Popover>
      <PopoverTrigger asChild={asChild}>
        {children}
      </PopoverTrigger>
      <PopoverContent className="p-0 w-full border-none shadow-none">
        <EmojiPicker height={350} theme={theme} onEmojiClick={(data) => onChange(data.emoji)}/>
      </PopoverContent>
    </Popover>
  );
};
