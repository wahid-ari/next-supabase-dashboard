import Link from 'next/link';
import Image from 'next/image';
import { AlertCircle, ChevronRight, Loader2, Mail, Terminal } from 'lucide-react';

import Layout from '@components/layout/Layout';
import Wrapper from '@components/systems/Wrapper';
import Title from '@components/systems/Title';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/Accordion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/Alert';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/AlertDialog';
import { AspectRatio } from '@/components/ui/AspectRatio';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { Badge, badgeVariants } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function Ui() {
  const tocClass = 'px-1 py-0.5 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none rounded';

  return (
    <Layout title='Design System - MyBook'>
      <div className='relative'>
        <Title>UI</Title>
        <span className='absolute left-[30px] top-1 flex h-5 w-5 animate-bounce items-center justify-center'>
          <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75' />
          <span className='relative inline-flex h-3 w-3 rounded-full bg-sky-500' />
        </span>
      </div>

      <Wrapper id='tableofcontent' name='Table of Content' noChildren noClassName noProps>
        <div className='columns-2 text-sky-600 dark:text-sky-500 sm:columns-3'>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#accordion'>
              Accordion
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#alert'>
              Alert
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#alertdialog'>
              AlertDialog
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#aspectratio'>
              AspectRatio
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#avatar'>
              Avatar
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#badge'>
              Badge
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#button'>
              Button
            </Link>
          </span>
        </div>
      </Wrapper>

      <Wrapper
        id='accordion'
        name='Accordion'
        props={['type', 'collapsible']}
        docs='https://ui.shadcn.com/docs/components/accordion'
      >
        <Accordion type='single' collapsible className='w-full'>
          <AccordionItem value='item-1'>
            <AccordionTrigger className='text-base'>Is it accessible?</AccordionTrigger>
            <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
          </AccordionItem>
          <AccordionItem value='item-2'>
            <AccordionTrigger className='text-base'>Is it styled?</AccordionTrigger>
            <AccordionContent>
              Yes. It comes with default styles that matches the other components&apos; aesthetic.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='item-3'>
            <AccordionTrigger className='text-base'>Is it animated?</AccordionTrigger>
            <AccordionContent>
              Yes. It&apos;s animated by default, but you can disable it if you prefer.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Wrapper>

      <Wrapper id='alert' name='Alert' props={['variant']} docs='https://ui.shadcn.com/docs/components/alert'>
        <Alert>
          <Terminal className='h-4 w-4' />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>You can add components to your app using the cli.</AlertDescription>
        </Alert>
        <br />
        <Alert variant='destructive'>
          <AlertCircle className='h-4 w-4' />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
        </Alert>
        <br />
        <Alert variant='warning'>
          <AlertCircle className='h-4 w-4' />
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
        </Alert>
        <br />
        <Alert variant='success'>
          <AlertCircle className='h-4 w-4' />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
        </Alert>
      </Wrapper>

      <Wrapper
        id='alertdialog'
        name='AlertDialog'
        docs='https://ui.shadcn.com/docs/components/alert-dialog'
        noClassName
      >
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant='outline'>Show Dialog</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your account and remove your data from our
                servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Wrapper>

      <Wrapper
        id='aspectratio'
        name='AspectRatio'
        props={['ratio']}
        docs='https://ui.shadcn.com/docs/components/aspect-ratio'
        noClassName
        noProps
      >
        <div className='max-w-sm'>
          <AspectRatio ratio={16 / 9}>
            <Image src='/og.png' fill alt='Image' className='rounded-md object-cover' />
          </AspectRatio>
        </div>
      </Wrapper>

      <Wrapper id='avatar' name='Avatar' docs='https://ui.shadcn.com/docs/components/avatar'>
        <Avatar>
          <AvatarImage src='https://github.com/vercel.png' alt='@vercel' />
          <AvatarFallback>VC</AvatarFallback>
        </Avatar>
        <br />
        <Avatar>
          <AvatarImage src='wrong source' alt='@vercel' />
          <AvatarFallback>VC</AvatarFallback>
        </Avatar>
      </Wrapper>

      <Wrapper id='badge' name='Badge' props={['variant']} docs='https://ui.shadcn.com/docs/components/badge'>
        <div className='flex flex-wrap gap-2'>
          <Badge>Badge</Badge>
          <Badge variant='secondary'>Secondary</Badge>
          <Badge variant='destructive'>Destructive</Badge>
          <Badge variant='outline'>Outline</Badge>
          <Link href='/design/ui#badge' className={badgeVariants({ variant: 'link' })}>
            Link as Badge
          </Link>
        </div>
      </Wrapper>

      <Wrapper
        id='button'
        name='Button'
        props={['variant', 'size']}
        docs='https://ui.shadcn.com/docs/components/button'
      >
        <div className='flex flex-wrap gap-2'>
          <Button>Default</Button>
          <Button size='sm'>Small</Button>
          <Button size='lg'>Large</Button>
          <Button variant='destructive'>Destructive</Button>
          <Button variant='secondary'>Secondary</Button>
          <Button variant='outline'>Outline</Button>
          <Button variant='ghost'>Ghost</Button>
          <Button variant='link'>Link Variant</Button>
          <Button variant='outline' size='icon'>
            <ChevronRight className='h-4 w-4' />
          </Button>
          <Button>
            <Mail className='mr-2 h-4 w-4' /> Login with Email
          </Button>
          <Button disabled>
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            Please wait
          </Button>
          <Button asChild>
            <Link href='/login'>As Link</Link>
          </Button>
        </div>
      </Wrapper>

      <Wrapper id='' name='' props={['']} docs='https://ui.shadcn.com/docs/components/'></Wrapper>
    </Layout>
  );
}
