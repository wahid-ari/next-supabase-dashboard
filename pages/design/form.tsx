import { useEffect, useState } from 'react';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import Layout from '@components/layout/Layout';
import Wrapper from '@components/systems/Wrapper';
import Title from '@components/systems/Title';

import { Button } from '@/components/ui/Button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { toast } from '@/components/ui/use-toast';
import { Checkbox } from '@/components/ui/Checkbox';

const InputFormSchema = z.object({
  username: z
    .string({
      required_error: 'Username required',
    })
    .min(2, {
      message: 'Username must be at least 2 characters.',
    }),
});

const CheckboxFormSchema = z.object({
  mobile: z.boolean().default(true).optional(),
});

const CheckboxMultiFormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one item.',
  }),
});
const items = [
  {
    id: 'recents',
    label: 'Recents',
  },
  {
    id: 'home',
    label: 'Home',
  },
  {
    id: 'applications',
    label: 'Applications',
  },
];

export default function FormPage() {
  const tocClass = 'px-1 py-0.5 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none rounded';

  const [text, setText] = useState('');
  const formInput = useForm<z.infer<typeof InputFormSchema>>({
    resolver: zodResolver(InputFormSchema),
    defaultValues: {
      username: text,
    },
  });
  setTimeout(() => {
    setText('username');
  }, 1000);
  useEffect(() => {
    formInput.reset({
      username: text,
    });
  }, [text]);

  const formCheckbox = useForm<z.infer<typeof CheckboxFormSchema>>({
    resolver: zodResolver(CheckboxFormSchema),
    defaultValues: {
      mobile: true,
    },
  });

  const formCheckboxMulti = useForm<z.infer<typeof CheckboxMultiFormSchema>>({
    resolver: zodResolver(CheckboxMultiFormSchema),
    defaultValues: {
      items: ['recents', 'home'],
    },
  });

  function onSubmit(data: z.infer<typeof InputFormSchema>) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-neutral-100 p-4 dark:bg-neutral-950'>
          <code className='text-neutral-800 dark:text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Layout title='Form - MyBook'>
      <div className='relative'>
        <Title>Form</Title>
        <span className='absolute left-[65px] top-1 flex h-5 w-5 animate-bounce items-center justify-center'>
          <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75' />
          <span className='relative inline-flex h-3 w-3 rounded-full bg-sky-500' />
        </span>
      </div>

      <Wrapper id='tableofcontent' name='Table of Content' noChildren noClassName noProps>
        <div className='columns-2 text-sky-600 dark:text-sky-500 sm:columns-3'>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#input'>
              Input
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#checkbox'>
              Checkbox
            </Link>
          </span>
        </div>
      </Wrapper>

      <Wrapper
        id='input'
        name='Input'
        noChildren
        noClassName
        noProps
        docs='https://ui.shadcn.com/docs/components/input#form'
      >
        <Form {...formInput}>
          <form onSubmit={formInput.handleSubmit(onSubmit)}>
            <FormField
              control={formInput.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder='shadcn' {...field} />
                  </FormControl>
                  <FormDescription>This is your public display name.</FormDescription>
                  <FormMessage className='!-mt-[1px]' />
                </FormItem>
              )}
            />

            <Button type='submit' className='mt-6'>
              Submit
            </Button>
          </form>
        </Form>
      </Wrapper>

      <Wrapper
        id='checkbox'
        name='Checkbox'
        noChildren
        noClassName
        noProps
        docs='https://ui.shadcn.com/docs/components/checkbox#form'
      >
        <Form {...formCheckbox}>
          <form onSubmit={formCheckbox.handleSubmit(onSubmit)}>
            <FormField
              control={formCheckbox.control}
              name='mobile'
              render={({ field }) => (
                <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 dark:border-neutral-800'>
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className='space-y-2 leading-none'>
                    <FormLabel>Use different settings for my mobile devices</FormLabel>
                    <FormDescription>
                      You can manage your mobile notifications in the{' '}
                      <Link href='/design/form#checkbox' className='text-sky-500 transition-all hover:text-sky-600'>
                        mobile settings
                      </Link>{' '}
                      page.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <Button type='submit' className='mt-6'>
              Submit
            </Button>
          </form>
        </Form>
        <br />
        <br />
        <Form {...formCheckboxMulti}>
          <form onSubmit={formCheckboxMulti.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={formCheckboxMulti.control}
              name='items'
              render={() => (
                <FormItem>
                  <div className='mb-3'>
                    <FormLabel>Sidebar</FormLabel>
                    <FormDescription>Select the items you want to display in the sidebar.</FormDescription>
                  </div>
                  {items.map((item) => (
                    <FormField
                      key={item.id}
                      control={formCheckboxMulti.control}
                      name='items'
                      render={({ field }) => {
                        return (
                          <FormItem key={item.id} className='flex flex-row items-start space-x-3 space-y-0'>
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(field.value?.filter((value) => value !== item.id));
                                }}
                              />
                            </FormControl>
                            <FormLabel className='font-normal'>{item.label}</FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit'>Submit</Button>
          </form>
        </Form>
      </Wrapper>
    </Layout>
  );
}
