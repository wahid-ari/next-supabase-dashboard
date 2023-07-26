import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  AlertCircle,
  ChevronRight,
  Loader2,
  Mail,
  Terminal,
  ChevronsUpDown,
  Cloud,
  CreditCard,
  Github,
  LogOut,
  PlusCircle,
  User,
  UserPlus,
  Users,
  CalendarDays,
} from 'lucide-react';

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
import { Checkbox } from '@/components/ui/Checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/Collapsible';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuCheckboxItem,
} from '@/components/ui/DropdownMenu';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/HoverCard';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from '@/components/ui/Menubar';
import { NavigationMenuDemo } from '@/components/ui/NavigationMenuDemo';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover';
import { Progress } from '@/components/ui/Progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/RadioGroup';
import Text from '@/components/systems/Text';

export default function Ui() {
  const tocClass = 'px-1 py-0.5 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none rounded';

  const [checkboxValue, setCheckboxValue] = useState(true);
  function handleChangeCheckbox() {
    checkboxValue == true ? setCheckboxValue(false) : setCheckboxValue(true);
  }

  const [isOpenCollapsible, setIsOpenCollapsible] = useState(false);

  const [showStatusBar, setShowStatusBar] = useState(true);
  const [showActivityBar, setShowActivityBar] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [position, setPosition] = useState('bottom');

  const [progress, setProgress] = useState(20);
  useEffect(() => {
    const timer = setTimeout(() => setProgress(70), 1000);
    return () => clearTimeout(timer);
  }, []);

  const [radiogroupValue, setRadiogroupValue] = useState('default');

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
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#checkbox'>
              Checkbox
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#collapsible'>
              Collapsible
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#dialog'>
              Dialog
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#dropdownmenu'>
              DropdownMenu
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#hovercard'>
              HoverCard
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#input'>
              Input
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#label'>
              Label
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#menubar'>
              Menubar
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#navigationmenu'>
              NavigationMenu
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#popover'>
              Popover
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#progress'>
              Progress
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#radiogroup'>
              RadioGroup
            </Link>
          </span>
        </div>
      </Wrapper>

      <Wrapper
        id='accordion'
        name='Accordion'
        props={['type', 'collapsible', 'defaultValue']}
        docs='https://ui.shadcn.com/docs/components/accordion'
      >
        <Accordion type='single' collapsible defaultValue='item-1' className='w-full'>
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

      <Wrapper
        id='checkbox'
        name='Checkbox'
        props={['checked', 'onCheckedChange', 'disabled']}
        docs='https://ui.shadcn.com/docs/components/checkbox'
      >
        <div className='flex items-center space-x-2'>
          <Checkbox
            id='terms'
            checked={checkboxValue}
            onCheckedChange={() => setCheckboxValue(checkboxValue ? false : true)}
          />
          <label
            htmlFor='terms'
            className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            Accept terms and conditions
          </label>
        </div>
        <div className='mt-4 flex items-center space-x-2'>
          <Checkbox id='checkbox-disabled' disabled />
          <label
            htmlFor='checkbox-disabled'
            className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            Disabled
          </label>
        </div>
        <div className='items-top mt-4 flex space-x-2'>
          <Checkbox id='terms1' />
          <div className='grid gap-1.5 leading-none'>
            <label
              htmlFor='terms1'
              className='text-[15px] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
            >
              Accept terms and conditions
            </label>
            <p className='text-sm text-neutral-400'>You agree to our Terms of Service and Privacy Policy.</p>
          </div>
        </div>
        <br />
        <Text>{checkboxValue ? 'true' : 'false'}</Text>
      </Wrapper>

      <Wrapper
        id='collapsible'
        name='Collapsible'
        props={['open', 'onOpenChange']}
        docs='https://ui.shadcn.com/docs/components/collapsible'
      >
        <Collapsible open={isOpenCollapsible} onOpenChange={setIsOpenCollapsible} className='w-[350px] space-y-2'>
          <div className='flex items-center justify-between space-x-4 px-4'>
            <h4 className='text-sm font-semibold'>@peduarte starred 3 repositories</h4>
            <CollapsibleTrigger asChild>
              <Button variant='outline' size='icon'>
                <ChevronsUpDown className='h-4 w-4' />
                <span className='sr-only'>Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <div className='rounded-md border px-4 py-3 font-mono text-sm dark:border-neutral-800'>
            @radix-ui/primitives
          </div>
          <CollapsibleContent className='space-y-2'>
            <div className='rounded-md border px-4 py-3 font-mono text-sm dark:border-neutral-800'>
              @radix-ui/colors
            </div>
            <div className='rounded-md border px-4 py-3 font-mono text-sm dark:border-neutral-800'>@stitches/react</div>
          </CollapsibleContent>
        </Collapsible>
      </Wrapper>

      <Wrapper
        id='dialog'
        name='Dialog'
        props={['open', 'onOpenChange']}
        docs='https://ui.shadcn.com/docs/components/dialog'
      >
        <Dialog>
          <DialogTrigger asChild>
            <Button variant='outline'>Edit Profile</Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>Make changes to your profile here. Click save when you done.</DialogDescription>
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='name' className='text-right'>
                  Name
                </Label>
                <Input id='name' value='Pedro Duarte' className='col-span-3' />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='username' className='text-right'>
                  Username
                </Label>
                <Input id='username' value='@peduarte' className='col-span-3' />
              </div>
            </div>
            <DialogFooter>
              <Button type='submit'>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Wrapper>

      <Wrapper
        id='dropdownmenu'
        name='DropdownMenu'
        props={['open', 'onOpenChange']}
        docs='https://ui.shadcn.com/docs/components/dropdown-menu'
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline'>Open</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-56'>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User className='mr-2 h-4 w-4' />
                <span>Profile</span>
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard className='mr-2 h-4 w-4' />
                <span>Billing</span>
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Users className='mr-2 h-4 w-4' />
                <span>Team</span>
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <UserPlus className='mr-2 h-4 w-4' />
                  <span>Invite users</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>
                      <Mail className='mr-2 h-4 w-4' />
                      <span>Email</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <PlusCircle className='mr-2 h-4 w-4' />
                      <span>More...</span>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Github className='mr-2 h-4 w-4' />
              <span>GitHub</span>
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
              <Cloud className='mr-2 h-4 w-4' />
              <span>API</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className='mr-2 h-4 w-4' />
              <span>Log out</span>
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <br />
        <br />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline'>Open Checkbox</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-56'>
            <DropdownMenuLabel>Appearance</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem checked={showStatusBar} onCheckedChange={setShowStatusBar}>
              Status Bar
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked={showActivityBar} onCheckedChange={setShowActivityBar} disabled>
              Activity Bar
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked={showPanel} onCheckedChange={setShowPanel}>
              Panel
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <br />
        <br />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline'>Open Radio</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-56'>
            <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
              <DropdownMenuRadioItem value='top'>Top</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value='bottom'>Bottom</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value='right'>Right</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </Wrapper>

      <Wrapper
        id='hovercard'
        name='HoverCard'
        props={['open', 'onOpenChange']}
        docs='https://ui.shadcn.com/docs/components/hover-card'
      >
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant='link'>@nextjs</Button>
          </HoverCardTrigger>
          <HoverCardContent className='w-80'>
            <div className='flex justify-between space-x-4'>
              <Avatar>
                <AvatarImage src='https://github.com/vercel.png' />
                <AvatarFallback>VC</AvatarFallback>
              </Avatar>
              <div className='space-y-1'>
                <h4 className='text-base font-medium'>@nextjs</h4>
                <p className='text-sm'>The React Framework – created and maintained by @vercel.</p>
                <div className='flex items-center pt-2'>
                  <CalendarDays className='mr-2 h-4 w-4 opacity-70' />{' '}
                  <span className='text-xs text-neutral-500 dark:text-neutral-400'>Joined December 2021</span>
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </Wrapper>

      <Wrapper id='input' name='Input' props={['type']} docs='https://ui.shadcn.com/docs/components/input'>
        <Input type='email' placeholder='Email' />
      </Wrapper>

      <Wrapper id='label' name='Label' docs='https://ui.shadcn.com/docs/components/label'>
        <div>
          <div className='flex items-center space-x-2'>
            <Checkbox id='terms2' />
            <Label htmlFor='terms2'>Accept terms and conditions</Label>
          </div>
        </div>
      </Wrapper>

      <Wrapper id='menubar' name='Menubar' docs='https://ui.shadcn.com/docs/components/menubar'>
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                New Tab <MenubarShortcut>⌘T</MenubarShortcut>
              </MenubarItem>
              <MenubarItem disabled>New Incognito Window</MenubarItem>
              <MenubarSeparator />
              <MenubarSub>
                <MenubarSubTrigger>Share</MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem>Email link</MenubarItem>
                  <MenubarItem>Messages</MenubarItem>
                  <MenubarItem>Notes</MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
              <MenubarSeparator />
              <MenubarItem>
                Print... <MenubarShortcut>⌘P</MenubarShortcut>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Edit</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                Undo <MenubarShortcut>⌘Z</MenubarShortcut>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarSub>
                <MenubarSubTrigger>Find</MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem>Search the web</MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>Find...</MenubarItem>
                  <MenubarItem>Find Next</MenubarItem>
                  <MenubarItem>Find Previous</MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
              <MenubarSeparator />
              <MenubarItem>Cut</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>View</MenubarTrigger>
            <MenubarContent>
              <MenubarCheckboxItem>Always Show Bookmarks Bar</MenubarCheckboxItem>
              <MenubarCheckboxItem checked>Always Show Full URLs</MenubarCheckboxItem>
              <MenubarSeparator />
              <MenubarItem inset>
                Reload <MenubarShortcut>⌘R</MenubarShortcut>
              </MenubarItem>
              <MenubarItem disabled inset>
                Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem inset>Toggle Fullscreen</MenubarItem>
              <MenubarSeparator />
              <MenubarItem inset>Hide Sidebar</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Profiles</MenubarTrigger>
            <MenubarContent>
              <MenubarRadioGroup value='benoit'>
                <MenubarRadioItem value='andy'>Andy</MenubarRadioItem>
                <MenubarRadioItem value='benoit'>Benoit</MenubarRadioItem>
                <MenubarRadioItem value='Luis'>Luis</MenubarRadioItem>
              </MenubarRadioGroup>
              <MenubarSeparator />
              <MenubarItem inset>Edit...</MenubarItem>
              <MenubarSeparator />
              <MenubarItem inset>Add Profile...</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </Wrapper>

      <Wrapper id='navigationmenu' name='NavigationMenu' docs='https://ui.shadcn.com/docs/components/navigation-menu'>
        <NavigationMenuDemo />
      </Wrapper>

      <Wrapper
        id='popover'
        name='Popover'
        props={['open', 'onOpenChange']}
        docs='https://ui.shadcn.com/docs/components/popover'
      >
        <Popover>
          <PopoverTrigger asChild>
            <Button variant='outline'>Open popover</Button>
          </PopoverTrigger>
          <PopoverContent className='w-80'>
            <div className='grid gap-4'>
              <div className='space-y-2'>
                <h4 className='font-medium leading-none'>Dimensions</h4>
                <p className='text-muted-foreground text-sm'>Set the dimensions for the layer.</p>
              </div>
              <div className='grid gap-4'>
                <div className='grid grid-cols-3 items-center gap-4'>
                  <Label htmlFor='width'>Width</Label>
                  <Input id='width' defaultValue='100%' className='col-span-2 h-8' />
                </div>
                <div className='grid grid-cols-3 items-center gap-4'>
                  <Label htmlFor='height'>Height</Label>
                  <Input id='height' defaultValue='25px' className='col-span-2 h-8' />
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </Wrapper>

      <Wrapper
        id='progress'
        name='Progress'
        props={['value', 'color', 'showValue']}
        docs='https://ui.shadcn.com/docs/components/progress'
      >
        <Progress value={progress} className='w-[60%]' showValue />
        <br />
        <Progress value={progress} color='bg-emerald-600' className='h-2' />
        <br />
        <Progress value={0} className='h-3' />
        <br />
        <Progress value={0} showValue />
      </Wrapper>

      <Wrapper
        id='radiogroup'
        name='RadioGroup'
        props={['name', 'value', 'defaultValue', 'onValueChange', 'disabled']}
        docs='https://ui.shadcn.com/docs/components/radio-group'
      >
        <RadioGroup defaultValue={radiogroupValue} onValueChange={setRadiogroupValue}>
          <div className='mb-2 flex items-center space-x-2'>
            <RadioGroupItem value='default' id='r1' />
            <Label htmlFor='r1'>Default</Label>
          </div>
          <div className='mb-2 flex items-center space-x-2'>
            <RadioGroupItem value='comfortable' id='r2' />
            <Label htmlFor='r2'>Comfortable</Label>
          </div>
          <div className='mb-2 flex items-center space-x-2'>
            <RadioGroupItem value='compact' id='r3' disabled />
            <Label htmlFor='r3'>Compact</Label>
          </div>
        </RadioGroup>
        <br />
        <Text>{radiogroupValue}</Text>
      </Wrapper>

      <Wrapper id='' name='' props={['']} docs='https://ui.shadcn.com/docs/components/'></Wrapper>
      <Wrapper id='' name='' props={['']} docs='https://ui.shadcn.com/docs/components/'></Wrapper>
    </Layout>
  );
}
