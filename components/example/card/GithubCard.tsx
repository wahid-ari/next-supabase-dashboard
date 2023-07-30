'use client';

import { useState } from 'react';
import { ChevronDownIcon, CircleIcon, PlusIcon, StarIcon } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { Separator } from '@/components/ui/Separator';
import { Toggle } from '@/components/ui/Toggle';

export function DemoGithub() {
  const [starred, setStarred] = useState(false);

  return (
    <Card>
      <CardHeader className='flex flex-row items-start justify-between space-y-0'>
        <div className='space-y-1'>
          <CardTitle>shadcn/ui</CardTitle>
          <CardDescription>Beautifully designed components built with Radix UI and Tailwind CSS.</CardDescription>
        </div>
        <div className='bg-secondary text-secondary-foreground flex items-center space-x-1 rounded-md'>
          <Toggle pressed={starred} onPressedChange={setStarred} aria-label='Star'>
            {starred ? (
              <>
                <StarIcon className='mr-2 h-4 w-4 fill-yellow-500 text-yellow-500' />
                Starred
              </>
            ) : (
              <>
                <StarIcon className='mr-2 h-4 w-4' />
                Star
              </>
            )}
          </Toggle>
          <Separator orientation='vertical' className='h-[20px]' />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='secondary' className='px-2 shadow-none'>
                <ChevronDownIcon className='text-secondary-foreground h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' alignOffset={-5} className='w-[200px]' forceMount>
              <DropdownMenuLabel>Suggested Lists</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>Future Ideas</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>My Stack</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Inspiration</DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <PlusIcon className='mr-2 h-4 w-4' /> Create List
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className='text-muted-foreground flex space-x-4 text-sm'>
          <div className='flex items-center'>
            <CircleIcon className='mr-1 h-3 w-3 fill-sky-400 text-sky-400' />
            TypeScript
          </div>
          <div className='flex items-center'>
            <StarIcon className='mr-1 h-3 w-3' />
            20k
          </div>
          <div>Updated April 2023</div>
        </div>
      </CardContent>
    </Card>
  );
}
