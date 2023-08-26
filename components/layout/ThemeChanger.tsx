import { MoonIcon, SunIcon } from '@heroicons/react/outline';
import { useTheme } from 'next-themes';

import { useMounted } from '@/hooks/useMounted';

export default function ThemeChanger({ ...props }: { [props: string]: any }) {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();
  if (!mounted) return null;

  return (
    <button
      {...props}
      onClick={() => setTheme(theme == 'dark' ? 'light' : 'dark')}
      aria-label='Change Theme'
      className='rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
    >
      {theme == 'dark' ? (
        <SunIcon className='h-5 w-5 text-neutral-400 transition-all hover:text-neutral-200' />
      ) : (
        <MoonIcon className='h-5 w-5 text-gray-500 transition-all hover:text-gray-700' />
      )}
    </button>
  );
}
