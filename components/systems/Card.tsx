import { ReactNode } from 'react';
import clsx from 'clsx';

type Props = {
  className?: string;
  children: ReactNode;
  [props: string]: any;
};

export default function Card({ className, children, ...props }: Props) {
  return (
    <div {...props} className={clsx(className, 'rounded-lg border p-3 dark:border-neutral-800 lg:p-6')}>
      {children}
    </div>
  );
}
