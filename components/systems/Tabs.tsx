import { ReactNode } from 'react';
import { Tab } from '@headlessui/react';
import { twMerge } from 'tailwind-merge';

type Props = {
  items: string[];
  children: ReactNode;
  className?: string;
  [props: string]: any;
};

export default function Tabs({ items, children, className, ...props }: Props) {
  return (
    <Tab.Group>
      <Tab.List
        {...props}
        className={twMerge(
          'flex whitespace-nowrap border-b border-neutral-200 font-medium dark:border-neutral-800',
          className
        )}
      >
        <div className='flex gap-x-6'>
          {items.map((item, index) => (
            <Tab
              key={index + 1}
              className={({ selected }) =>
                twMerge(
                  'w-full border-b-2 border-transparent py-2 text-sm font-semibold tracking-wide transition-all',
                  'text-gray-500 hover:text-gray-700 dark:text-neutral-400 dark:hover:text-neutral-200',
                  'outline-none ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent',
                  selected && 'border-b-2 !border-b-sky-600 !text-sky-600 dark:!border-b-sky-500 dark:!text-sky-500'
                )
              }
            >
              {item}
            </Tab>
          ))}
        </div>
      </Tab.List>
      <Tab.Panels className='mt-2'>{children}</Tab.Panels>
    </Tab.Group>
  );
}

type PanelProps = {
  children: ReactNode;
  className?: string;
  [props: string]: any;
};

Tabs.panel = ({ children, className, ...props }: PanelProps) => {
  return (
    <>
      <Tab.Panel {...props} className={twMerge('rounded-xl py-2 text-neutral-700 dark:text-neutral-200', className)}>
        {children}
      </Tab.Panel>
    </>
  );
};
