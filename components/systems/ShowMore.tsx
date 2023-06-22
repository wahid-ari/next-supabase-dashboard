import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import { clsx } from 'clsx';

type Props = {
  className?: string;
  children: string;
  count?: number;
  [props: string]: any;
};

export default function ShowMore({ className, children, count = 200, ...props }: Props) {
  const [showMore, setShowMore] = useState(false);
  const text = showMore ? children : children?.slice(0, count) + '...';

  return (
    <div {...props} className={clsx(className, 'relative')}>
      <p>{text}</p>
      <div className='relative py-3'>
        <div
          className={clsx(
            'absolute bottom-3 z-0 h-8 w-full bg-gradient-to-b from-white/70 to-white dark:from-neutral-900/70 dark:to-neutral-900',
            showMore && 'hidden'
          )}
        />
        <div className='relative z-[1] border-b border-neutral-200 dark:border-neutral-700' />
        <button
          aria-label='Show More'
          onClick={() => setShowMore(!showMore)}
          className={clsx(
            'group absolute left-1/2 top-1/2 z-[2] flex -translate-x-1/2 -translate-y-1/2 transform',
            'items-center gap-x-1 whitespace-nowrap rounded-full border bg-white px-2.5 py-0.5',
            'shadow transition-all dark:border-neutral-700 dark:bg-neutral-900',
            'text-xs font-medium text-gray-600 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100'
          )}
        >
          {showMore ? 'Show Less' : 'Show More'}
          <ChevronDownIcon
            className={clsx(
              'h-4 w-4 text-gray-600 group-hover:text-gray-700 dark:text-gray-300 dark:group-hover:text-gray-200',
              showMore ? 'rotate-180 transition-all duration-500' : 'rotate-0 transition-all duration-300'
            )}
          />
        </button>
      </div>
    </div>
  );
}
