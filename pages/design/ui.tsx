import { useState, useEffect, Fragment, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { format } from 'date-fns';
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
  Bold,
  Italic,
  Sun,
  Moon,
  Smile,
  Settings,
  SunIcon,
  MoonIcon,
  LaptopIcon,
  Check,
  CalendarIcon,
} from 'lucide-react';

import Layout from '@components/layout/Layout';
import Wrapper from '@components/systems/Wrapper';
import Title from '@components/systems/Title';
import Text from '@/components/systems/Text';

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
import { Calendar } from '@/components/ui/Calendar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { Checkbox } from '@/components/ui/Checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/Collapsible';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/Command';
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '@/components/ui/ContextMenu';
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
import { ScrollArea } from '@/components/ui/ScrollArea';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { Separator } from '@/components/ui/Separator';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/Sheet';
import { Skeleton } from '@/components/ui/Skeleton';
import { Slider } from '@/components/ui/Slider';
import { Switch } from '@/components/ui/Switch';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { Textarea } from '@/components/ui/Textarea';
import { ToastAction } from '@/components/ui/Toast';
import { useToast } from '@/components/ui/use-toast';
import { Toggle } from '@/components/ui/Toggle';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/Tooltip';
import { cn } from '@/libs/utils';
import DataTableDemo from '@/components/ui/DataTableDemo';

export default function Ui() {
  const router = useRouter();
  const tocClass = 'px-1 py-0.5 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none rounded';

  const [checkboxValue, setCheckboxValue] = useState(true);
  function handleCheckboxChange() {
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

  const tags = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`);

  const [selectValue, setSelectValue] = useState('banana');
  function handleSelectChange(e: any) {
    setSelectValue(e);
  }

  const [sliderValue, setSliderValue] = useState([50]);

  const [switchValue, setSwitchValue] = useState(false);

  const invoices = [
    {
      invoice: 'INV001',
      paymentStatus: 'Paid',
      totalAmount: '$250.00',
      paymentMethod: 'Credit Card',
    },
    {
      invoice: 'INV002',
      paymentStatus: 'Pending',
      totalAmount: '$150.00',
      paymentMethod: 'PayPal',
    },
    {
      invoice: 'INV003',
      paymentStatus: 'Unpaid',
      totalAmount: '$350.00',
      paymentMethod: 'Bank Transfer',
    },
    {
      invoice: 'INV004',
      paymentStatus: 'Paid',
      totalAmount: '$450.00',
      paymentMethod: 'Credit Card',
    },
    {
      invoice: 'INV005',
      paymentStatus: 'Paid',
      totalAmount: '$550.00',
      paymentMethod: 'PayPal',
    },
  ];

  const { theme, setTheme } = useTheme();

  const { toast } = useToast();

  const [toggleValue, setToggleValue] = useState(false);

  const [openCommand, setOpenCommand] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key?.toLowerCase() == 'k' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        setOpenCommand((openCommand) => !openCommand);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);
  const runCommand = useCallback((command: () => unknown) => {
    setOpenCommand(false);
    command();
  }, []);

  const [openCombobox, setOpenCombobox] = useState(false);
  const [comboboxValue, setComboboxValue] = useState('');
  const frameworks = [
    {
      value: 'next.js',
      label: 'Next.js',
    },
    {
      value: 'sveltekit',
      label: 'SvelteKit',
    },
    {
      value: 'nuxt.js',
      label: 'Nuxt.js',
    },
    {
      value: 'remix',
      label: 'Remix',
    },
    {
      value: 'astro',
      label: 'Astro',
    },
  ];

  const [date, setDate] = useState<Date | undefined>(new Date());

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
            <Link className={tocClass} href='#calendar'>
              Calendar
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#card'>
              Card
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
            <Link className={tocClass} href='#combobox'>
              Combobox
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#command'>
              Command
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#contextmenu'>
              ContextMenu
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#datatable'>
              DataTable
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#datepicker'>
              DatePicker
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
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#scrollarea'>
              ScrollArea
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#select'>
              Select
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#separator'>
              Separator
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#sheet'>
              Sheet
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#skeleton'>
              Skeleton
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#slider'>
              Slider
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#switch'>
              Switch
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#table'>
              Table
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#tabs'>
              Tabs
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#textarea'>
              Textarea
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#theme'>
              Theme
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#toast'>
              Toast
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#toggle'>
              Toggle
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#tooltip'>
              Tooltip
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
        id='calendar'
        name='Calendar'
        props={['mode', 'selected', 'onSelect']}
        docs='https://ui.shadcn.com/docs/components/calendar'
      >
        <div className='flex items-center'>
          <Calendar
            mode='single'
            selected={date}
            onSelect={setDate}
            className='rounded-md border dark:border-neutral-700'
          />
        </div>
        <br />
        <Text>{date ? format(date, 'PPP') : 'Select Date'}</Text>
      </Wrapper>

      <Wrapper id='card' name='Card' docs='https://ui.shadcn.com/docs/components/card'>
        <Card className='max-w-[350px]'>
          <CardHeader>
            <CardTitle>Create project</CardTitle>
            <CardDescription>Deploy your new project in one-click.</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className='grid w-full items-center gap-4'>
                <div className='flex flex-col space-y-2.5'>
                  <Label htmlFor='name'>Name</Label>
                  <Input id='name' placeholder='Name of your project' />
                </div>
                <div className='flex flex-col space-y-2.5'>
                  <Label htmlFor='framework'>Framework</Label>
                  <Select>
                    <SelectTrigger id='framework'>
                      <SelectValue placeholder='Select' />
                    </SelectTrigger>
                    <SelectContent position='popper'>
                      <SelectItem value='next'>Next.js</SelectItem>
                      <SelectItem value='sveltekit'>SvelteKit</SelectItem>
                      <SelectItem value='astro'>Astro</SelectItem>
                      <SelectItem value='nuxt'>Nuxt.js</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className='flex justify-between'>
            <Button variant='outline'>Cancel</Button>
            <Button>Deploy</Button>
          </CardFooter>
        </Card>
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
            // onCheckedChange={handleCheckboxChange}
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
        <Collapsible open={isOpenCollapsible} onOpenChange={setIsOpenCollapsible} className='max-w-[350px] space-y-2'>
          <div className='flex items-center justify-between space-x-4'>
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
        id='combobox'
        name='Combobox'
        props={['open', 'onOpenChange']}
        docs='https://ui.shadcn.com/docs/components/combobox'
      >
        <Popover open={openCombobox} onOpenChange={setOpenCombobox}>
          <PopoverTrigger asChild>
            <Button
              variant='outline'
              role='combobox'
              aria-expanded={openCombobox}
              className='w-[200px] justify-between'
            >
              {comboboxValue
                ? frameworks.find((framework) => framework.value === comboboxValue)?.label
                : 'Select framework...'}
              <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-[200px] p-0'>
            <Command>
              <CommandInput placeholder='Search framework...' />
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                {frameworks.map((framework) => (
                  <CommandItem
                    key={framework.value}
                    onSelect={(currentValue) => {
                      setComboboxValue(currentValue === comboboxValue ? '' : currentValue);
                      setOpenCombobox(false);
                    }}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4 text-emerald-600',
                        comboboxValue === framework.value ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                    {framework.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </Wrapper>

      <Wrapper
        id='command'
        name='Command'
        props={['open', 'onOpenChange']}
        docs='https://ui.shadcn.com/docs/components/command'
      >
        <Command className='rounded-lg border shadow-md dark:border-neutral-700'>
          <CommandInput placeholder='Type a command or search...' />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading='Suggestions'>
              <CommandItem>
                <CalendarDays className='mr-2 h-4 w-4' />
                <span>Calendar</span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading='Settings'>
              <CommandItem>
                <User className='mr-2 h-4 w-4' />
                <span>Profile</span>
                <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
        <br />
        <br />
        <>
          <p className='text-muted-foreground text-sm'>
            Press{' '}
            <kbd className='text-muted-foreground pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-neutral-300 bg-neutral-200 px-1.5 font-mono text-[10px] font-medium opacity-100 dark:border-neutral-700 dark:bg-neutral-800'>
              <span className='text-xs'>⌘</span>K
            </kbd>
            <kbd className='text-muted-foreground pointer-events-none ml-2 inline-flex h-5 select-none items-center gap-1 rounded border border-neutral-300 bg-neutral-200 px-1.5 font-mono text-[10px] font-medium opacity-100 dark:border-neutral-700 dark:bg-neutral-800'>
              <span className='text-xs'>Ctrl</span>K
            </kbd>
          </p>
          <CommandDialog open={openCommand} onOpenChange={setOpenCommand}>
            <CommandInput placeholder='Type a command or search...' />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading='Pages'>
                <CommandItem
                  onSelect={() => {
                    runCommand(() => router.push('/design'));
                  }}
                >
                  <CalendarDays className='mr-2 h-4 w-4' />
                  <span>Design</span>
                </CommandItem>
                <CommandItem
                  onSelect={() => {
                    runCommand(() => router.push('/design/layout'));
                  }}
                >
                  <Smile className='mr-2 h-4 w-4' />
                  <span>Layout</span>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading='Settings'>
                <CommandItem>
                  <User className='mr-2 h-4 w-4' />
                  <span>Profile</span>
                  <CommandShortcut>⌘P</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <CreditCard className='mr-2 h-4 w-4' />
                  <span>Billing</span>
                  <CommandShortcut>⌘B</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <Settings className='mr-2 h-4 w-4' />
                  <span>Settings</span>
                  <CommandShortcut>⌘S</CommandShortcut>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading='Theme'>
                <CommandItem onSelect={() => runCommand(() => setTheme('light'))}>
                  <SunIcon className='mr-2 h-4 w-4' />
                  Light
                </CommandItem>
                <CommandItem onSelect={() => runCommand(() => setTheme('dark'))}>
                  <MoonIcon className='mr-2 h-4 w-4' />
                  Dark
                </CommandItem>
                <CommandItem onSelect={() => runCommand(() => setTheme('system'))}>
                  <LaptopIcon className='mr-2 h-4 w-4' />
                  System
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </CommandDialog>
        </>
      </Wrapper>

      <Wrapper
        id='contextmenu'
        name='ContextMenu'
        props={['onOpenChange']}
        docs='https://ui.shadcn.com/docs/components/context-menu'
      >
        <ContextMenu>
          <ContextMenuTrigger className='flex h-[150px] max-w-[300px] items-center justify-center rounded-md border border-dashed border-neutral-300 text-sm dark:border-neutral-700'>
            Right click here
          </ContextMenuTrigger>
          <ContextMenuContent className='w-64'>
            <ContextMenuItem inset>
              Back
              <ContextMenuShortcut>⌘[</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem inset disabled>
              Forward
              <ContextMenuShortcut>⌘]</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuSub>
              <ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>
              <ContextMenuSubContent className='w-48'>
                <ContextMenuItem>
                  Save Page As...
                  <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem>Name Window...</ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem>Developer Tools</ContextMenuItem>
              </ContextMenuSubContent>
            </ContextMenuSub>
            <ContextMenuSeparator />
            <ContextMenuCheckboxItem checked>
              Show Bookmarks Bar
              <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
            </ContextMenuCheckboxItem>
            <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>
            <ContextMenuSeparator />
            <ContextMenuRadioGroup value='pedro'>
              <ContextMenuLabel inset>People</ContextMenuLabel>
              <ContextMenuSeparator />
              <ContextMenuRadioItem value='pedro'>Pedro Duarte</ContextMenuRadioItem>
              <ContextMenuRadioItem value='colm'>Colm Tuite</ContextMenuRadioItem>
            </ContextMenuRadioGroup>
          </ContextMenuContent>
        </ContextMenu>
      </Wrapper>

      <Wrapper id='datatable' name='DataTable' docs='https://ui.shadcn.com/docs/components/data-table'>
        <DataTableDemo />
      </Wrapper>

      <Wrapper id='datepicker' name='DatePicker' docs='https://ui.shadcn.com/docs/components/date-picker'>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={cn('justify-start text-left font-normal', !date && 'text-muted-foreground')}
            >
              <CalendarIcon className='mr-2 h-4 w-4' />
              {date ? format(date, 'PPP') : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-auto p-0'>
            <Calendar mode='single' selected={date} onSelect={setDate} initialFocus />
          </PopoverContent>
        </Popover>
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

      <Wrapper id='input' name='Input' props={['type']} docs='https://ui.shadcn.com/docs/components/input' noChildren>
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
        noChildren
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

      <Wrapper id='scrollarea' name='ScrollArea' docs='https://ui.shadcn.com/docs/components/scroll-area'>
        <ScrollArea className='h-72 w-48 rounded-md border dark:border-neutral-700'>
          <div className='p-4'>
            <h4 className='mb-4 text-sm font-medium leading-none'>Tags</h4>
            {tags.map((tag, i) => (
              <Fragment key={tag}>
                <div className='text-sm'>{tag}</div>
                {i < tags.length - 1 && <Separator className='my-2' />}
              </Fragment>
            ))}
          </div>
        </ScrollArea>
      </Wrapper>

      <Wrapper
        id='select'
        name='Select'
        props={['defaultValue', 'value', 'onValueChange', 'disabled']}
        docs='https://ui.shadcn.com/docs/components/select'
      >
        <Select
          value={selectValue}
          // onValueChange={handleSelectChange}
          // onValueChange={(e) => setSelectValue(e)}
          onValueChange={setSelectValue}
        >
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Select a fruit' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <Separator className='my-2' />
              <SelectItem value='apple'>Apple</SelectItem>
              <SelectItem value='banana'>Banana</SelectItem>
              <SelectItem value='blueberry'>Blueberry</SelectItem>
              <SelectItem value='grapes'>Grapes</SelectItem>
              <SelectItem value='pineapple' disabled>
                Pineapple
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <br />
        <Text>{selectValue}</Text>
      </Wrapper>

      <Wrapper
        id='separator'
        name='Separator'
        props={['orientation']}
        docs='https://ui.shadcn.com/docs/components/separator'
        noChildren
      >
        <div>
          <div className='space-y-1'>
            <h4 className='text-sm font-medium leading-none'>Radix Primitives</h4>
            <p className='text-muted-foreground text-sm'>An open-source UI component library.</p>
          </div>
          <Separator className='my-4' />
          <div className='flex h-5 items-center space-x-4 text-sm'>
            <div>Blog</div>
            <Separator orientation='vertical' />
            <div>Docs</div>
            <Separator orientation='vertical' />
            <div>Source</div>
          </div>
        </div>
      </Wrapper>

      <Wrapper
        id='sheet'
        name='Sheet'
        props={['side', 'defaultOpen', 'open', 'onOpenChange']}
        docs='https://ui.shadcn.com/docs/components/sheet'
        noChildren
      >
        <Sheet>
          <SheetTrigger asChild>
            <Button variant='outline'>Right</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>Make changes to your profile here. Click save when you are done.</SheetDescription>
            </SheetHeader>
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
            <SheetFooter>
              <SheetClose asChild>
                <Button type='submit'>Save changes</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
        <br />
        <br />
        <Sheet>
          <SheetTrigger asChild>
            <Button variant='outline'>Bottom</Button>
          </SheetTrigger>
          <SheetContent side='bottom'>
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>Make changes to your profile here. Click save when you are done.</SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </Wrapper>

      <Wrapper id='skeleton' name='Skeleton' docs='https://ui.shadcn.com/docs/components/skeleton' noChildren>
        <div className='flex items-center space-x-4'>
          <Skeleton className='h-12 w-12 rounded-full' />
          <div className='space-y-2'>
            <Skeleton className='h-4 w-[250px]' />
            <Skeleton className='h-4 w-[200px]' />
          </div>
        </div>
      </Wrapper>

      <Wrapper
        id='slider'
        name='Slider'
        props={['value', 'onValueChange', 'defaultValue', 'max', 'step']}
        docs='https://ui.shadcn.com/docs/components/slider'
      >
        <Slider
          defaultValue={[50]}
          value={sliderValue}
          // onValueChange={(e) => setSliderValue(e)}
          onValueChange={setSliderValue}
          max={100}
          step={1}
          className='w-[60%]'
        />
        <br />
        <Text>{sliderValue}</Text>
      </Wrapper>

      <Wrapper
        id='switch'
        name='Switch'
        props={['defaultChecked', 'checked', 'onCheckedChange', 'disabled', '']}
        docs='https://ui.shadcn.com/docs/components/switch'
      >
        <div className='flex items-center space-x-2'>
          <Switch id='airplane-mode' checked={switchValue} onCheckedChange={setSwitchValue} />
          <Label htmlFor='airplane-mode'>Airplane Mode</Label>
        </div>
        <br />
        <Text>{switchValue == true ? 'true' : 'false'}</Text>
      </Wrapper>

      <Wrapper id='table' name='Table' docs='https://ui.shadcn.com/docs/components/table'>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[100px]'>Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className='text-right'>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.invoice}>
                <TableCell className='font-medium'>{invoice.invoice}</TableCell>
                <TableCell>{invoice.paymentStatus}</TableCell>
                <TableCell>{invoice.paymentMethod}</TableCell>
                <TableCell className='text-right'>{invoice.totalAmount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Wrapper>

      <Wrapper
        id='tabs'
        name='Tabs'
        props={['defaultValue', 'value', 'onValueChange']}
        docs='https://ui.shadcn.com/docs/components/tabs'
      >
        <Tabs defaultValue='account' className='max-w-[400px]'>
          <TabsList className='grid w-full grid-cols-2'>
            <TabsTrigger value='account'>Account</TabsTrigger>
            <TabsTrigger value='password'>Password</TabsTrigger>
          </TabsList>
          <TabsContent value='account'>
            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>Make changes to your account here. Click save when you are done.</CardDescription>
              </CardHeader>
              <CardContent className='space-y-2'>
                <div className='space-y-2.5'>
                  <Label htmlFor='name'>Name</Label>
                  <Input id='name' defaultValue='Pedro Duarte' />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value='password'>
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>Change your password here. After saving, you will be logged out.</CardDescription>
              </CardHeader>
              <CardContent className='space-y-2'>
                <div className='space-y-2.5'>
                  <Label htmlFor='new'>New password</Label>
                  <Input id='new' type='password' />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save password</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </Wrapper>

      <Wrapper id='textarea' name='Textarea' docs='https://ui.shadcn.com/docs/components/textarea' noChildren>
        <Textarea placeholder='Type your message here.' />
      </Wrapper>

      <Wrapper id='theme' name='Theme' noClassName noChildren docs='https://ui.shadcn.com/docs/dark-mode'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' size='icon'>
              <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
              <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
              <span className='sr-only'>Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='start'>
            <DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('system')}>System</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Wrapper>

      <Wrapper
        id='toast'
        name='Toast'
        props={['title', 'description', 'action', 'variant']}
        docs='https://ui.shadcn.com/docs/components/toast'
      >
        <Button
          variant='outline'
          onClick={() => {
            toast({
              description: 'Your message has been sent.',
            });
          }}
        >
          Show Toast
        </Button>
        <br />
        <br />
        <Button
          variant='outline'
          onClick={() => {
            toast({
              title: 'Scheduled: Catch up ',
              description: 'Friday, February 10, 2023 at 5:57 PM',
              action: <ToastAction altText='Goto schedule to undo'>Undo</ToastAction>,
            });
          }}
        >
          Add to calendar
        </Button>
        <br />
        <br />
        <Button
          variant='outline'
          onClick={() => {
            toast({
              variant: 'destructive',
              title: 'Uh oh! Something went wrong.',
              description: 'There was a problem with your request.',
              action: <ToastAction altText='Try again'>Try again</ToastAction>,
            });
          }}
        >
          Show Danger Toast
        </Button>
      </Wrapper>

      <Wrapper
        id='toggle'
        name='Toggle'
        props={['defaultPressed', 'pressed', 'onPressedChange', 'disabled', 'variant', 'size']}
        docs='https://ui.shadcn.com/docs/components/toggle'
      >
        <Toggle pressed={toggleValue} onPressedChange={setToggleValue} aria-label='Toggle italic'>
          <Bold className='h-4 w-4' />
        </Toggle>
        <br />
        <br />
        <Toggle variant='outline' aria-label='Toggle italic'>
          <Italic className='h-4 w-4' />
        </Toggle>
        <br />
        <br />
        <Toggle aria-label='Toggle italic'>
          <Italic className='mr-2 h-4 w-4' />
          Italic
        </Toggle>
        <br />
        <br />
        <Toggle size='sm' variant='outline' aria-label='Toggle italic'>
          <Italic className='h-4 w-4' />
        </Toggle>
        <br />
        <br />
        <Text>{toggleValue == true ? 'true' : 'false'}</Text>
      </Wrapper>

      <Wrapper id='tooltip' name='Tooltip' props={['']} docs='https://ui.shadcn.com/docs/components/tooltip'>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant='outline'>Hover</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                Labore sunt enim mollit nisi ea. Dolore anim nisi nostrud nulla consectetur deserunt esse eu
                reprehenderit incididunt tempor esse aliquip. Nostrud officia do nulla est aute qui proident fugiat
                laborum occaecat proident. Id aliqua eu sint Lorem amet nisi veniam minim magna nulla. Nisi duis esse
                laborum et quis voluptate consequat incididunt ex.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </Wrapper>
    </Layout>
  );
}
