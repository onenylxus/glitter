'use client';

import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';
import Image from 'next/image';

const NotesPage = () => {
  const { user } = useUser();

  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4">
      <Image
        src="undraw/add_notes.svg"
        width="300"
        height="300"
        alt="Add Notes"
      />
      <h2 className="text-lg font-medium">
        Welcome to {user.firstName}&apos;s Notebook.
      </h2>
      <Button variant="tint">
        <PlusCircle className="mr-2 h-4 w-4" />
        Create a note
      </Button>
    </div>
  );
};

export default NotesPage;
