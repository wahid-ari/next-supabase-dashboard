import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  className?: string;
  children: ReactNode;
  [props: string]: any;
};

export default function Label({ className, children, ...props }: Props) {
  return (
    <label {...props} className={twMerge('block text-gray-800 dark:text-neutral-300', className)}>
      {children}
    </label>
  );
}
