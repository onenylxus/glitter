'use client';

import { Button } from '@/components/ui/button';
import { IconPicker } from '@/components/icon-picker';
import { Smile, X } from 'lucide-react';

export const Toolbar = ({ data, preview }) => {
  return (
    <div className="pl-[54px] group relative">
      {!!data.icon && !preview && (
        <div className="flex items-center gap-x-2 group/icon pt-6">
          <IconPicker onChange={() => {}}>
            <p className="text-6xl hover:opacity-75 transition">{data.icon}</p>
          </IconPicker>
          <Button variant="outline" size="icon" onClick={() => {}} className="rounded-full opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground text-xs">
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      {!!data.icon && preview && (
        <p className="text-6xl pt-6">
          {data.icon}
        </p>
      )}
      <div className="opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-4">
        {!data.icon && !preview && (
          <IconPicker onChange={() => {}} asChild>
            <Button variant="outline" size="sm" className="text-muted-foreground text-xs">
              <Smile className="h-4 w-4 mr-2" />
              Add icon
            </Button>
          </IconPicker>
        )}
      </div>
    </div>
  );
};
