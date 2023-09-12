import { MoonIcon, StopIcon, SunIcon } from '@heroicons/react/outline';
import { useTheme } from 'next-themes';
import { twMerge } from 'tailwind-merge';

import { useMounted } from '@/hooks/useMounted';

export default function FrontThemeChanger({ variant = 'icon', ...props }: { variant?: string; [props: string]: any }) {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();

  if (!mounted) {
    return (
      <button
        className={twMerge(
          'rounded-md border hover:border-neutral-300 dark:border-neutral-700 dark:hover:border-neutral-600',
          'focus:outline-none focus:ring-2 focus:ring-sky-500',
          'inline-flex items-center justify-center overflow-hidden transition-all duration-200',
          variant === 'icon' && 'p-1',
          variant === 'labelled' && 'px-2 py-1'
        )}
      >
        <StopIcon className='h-5 w-5 text-neutral-700 dark:text-neutral-200' />
      </button>
    );
  }

  return (
    <button
      {...props}
      title='Change Theme'
      aria-label='Change Theme'
      onClick={() => setTheme(theme == 'dark' ? 'light' : 'dark')}
      className={twMerge(
        'rounded-md border hover:border-neutral-300 dark:border-neutral-700 dark:hover:border-neutral-600',
        'focus:outline-none focus:ring-2 focus:ring-sky-500',
        'inline-flex items-center justify-center overflow-hidden transition-all duration-200',
        variant === 'icon' && 'p-1',
        variant === 'labelled' && 'py-1 px-2'
      )}
    >
      {/* note that the duration is longer then the one on body, controlling the bg-color */}
      <div className='relative h-5 w-5'>
        <span
          className='absolute inset-0 rotate-90 transform text-neutral-700 dark:text-neutral-200 transition duration-500 motion-reduce:duration-0 dark:rotate-0'
          style={{ transformOrigin: '50% 100px' }}
        >
          <MoonIcon />
        </span>
        <span
          className='absolute inset-0 rotate-0 transform text-neutral-700 dark:text-neutral-200 transition duration-500 motion-reduce:duration-0 dark:-rotate-90'
          style={{ transformOrigin: '50% 100px' }}
        >
          <SunIcon />
        </span>
      </div>
      <span className={twMerge('ml-1 text-sm text-neutral-700 dark:text-neutral-200', variant === 'icon' && 'sr-only')}>
        {theme == 'dark' ? 'Light' : 'Dark'}
      </span>
    </button>
  );
}
