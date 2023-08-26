import Skeleton from 'react-loading-skeleton';

import 'react-loading-skeleton/dist/skeleton.css';

import { useTheme } from 'next-themes';
import { twMerge } from 'tailwind-merge';

import { useMounted } from '@/hooks/useMounted';

export default function Shimer({ className, dataTestId }: { className?: string; dataTestId?: string }) {
  const { theme } = useTheme();
  const mounted = useMounted();
  if (!mounted) return null;

  return theme == 'dark' ? (
    <Skeleton
      containerTestId={dataTestId}
      className={twMerge('mb-2 h-10', className)}
      baseColor='#262626'
      highlightColor='#404040'
    />
  ) : (
    <Skeleton containerTestId={dataTestId} className={twMerge('mb-2 h-10', className)} />
  );
}
