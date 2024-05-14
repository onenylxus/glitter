'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

const Error = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Image src="undraw/not_found.svg" height="300" width="300" alt="Error" />
      <h2 className="text-xl font-medium">Something went wrong</h2>
      <Button asChild><Link href="/notes">Go back</Link></Button>
    </div>
  );
};

export default Error;
