'use client'

import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';
import Image from 'next/image';

const NotesPage = () => {
  const { user } = useUser();

  return (
    <div className="flex h-full space-y-4 flex-col justify-center items-center">
      <Image src="undraw/add_notes.svg" width="300" height="300" alt="Add Notes" />
      <h2 className="font-medium text-lg">Welcome back, {user.firstName}.</h2>
      <Button variant="tint">
        <PlusCircle className="w-4 h-4 mr-2" />
        Create a note
      </Button>
    </div>
  );
};

export default NotesPage;
