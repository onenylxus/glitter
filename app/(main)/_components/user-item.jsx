'use client'

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { ChevronsLeftRight } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { SignOutButton, useUser } from '@clerk/clerk-react';

const UserItem = () => {
  const { user } = useUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div role="button" className="flex w-full p-3 items-center text-sm hover:bg-primary/5">
          <div className="flex max-w-[150px] gap-x-2 items-center">
            <Avatar className="w-5 h-5">
              <AvatarImage src={user.imageUrl} />
            </Avatar>
            <span className="font-medium text-start line-clamp-1">
              {user.fullName}&apos;s Notebook
            </span>
          </div>
          <ChevronsLeftRight className="w-4 h-4 ml-2 text-muted-foreground rotate-90" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="start" alignOffset={11} forceMount>
        <div className="flex flex-col space-y-4 p-2">
          <p className="font-medium text-xs leading-none text-muted-foreground">
            {user.emailAddresses[0].emailAddress}
          </p>
          <div className="flex items-center gap-x-2">
            <div className="rounded-md p-1 bg-secondary">
              <Avatar className="w-8 h-8">
                <AvatarImage src={user.imageUrl} />
              </Avatar>
            </div>
            <div className="space-y-1">
              <p className="text-sm line-clamp-1">
                {user.fullName}&apos;s Notebook
              </p>
            </div>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <SignOutButton asChild className="w-full text-start text-muted-foreground cursor-pointer">
            Logout
          </SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserItem;
