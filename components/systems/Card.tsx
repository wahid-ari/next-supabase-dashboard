import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  className?: string;
  children: ReactNode;
  [props: string]: any;
};

export default function Card({ className, children, ...props }: Props) {
  return (
    <div {...props} className={twMerge('rounded-lg border p-3 dark:border-neutral-800 lg:p-6', className)}>
      {children}
    </div>
  );
}
