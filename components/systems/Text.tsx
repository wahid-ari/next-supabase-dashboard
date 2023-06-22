import clsx from 'clsx';
import { ReactNode } from 'react';

type Props = {
  className?: string;
  children: ReactNode;
  [props: string]: any;
};

export default function Text({ className, children, ...props }: Props) {
  return (
    <p {...props} className={clsx('text-sm text-neutral-700 dark:text-neutral-200', className)}>
      {children}
    </p>
  );
}

Text.light = ({ className, children, ...props }: Props) => {
  return (
    <p {...props} className={clsx('text-sm font-light text-neutral-700 dark:text-neutral-200', className)}>
      {children}
    </p>
  );
};

Text.medium = ({ className, children, ...props }: Props) => {
  return (
    <p {...props} className={clsx('text-sm font-medium text-neutral-700 dark:text-neutral-200', className)}>
      {children}
    </p>
  );
};

Text.semibold = ({ className, children, ...props }: Props) => {
  return (
    <p {...props} className={clsx('text-sm font-semibold text-neutral-700 dark:text-neutral-200', className)}>
      {children}
    </p>
  );
};

Text.bold = ({ className, children, ...props }: Props) => {
  return (
    <p {...props} className={clsx('text-sm font-bold text-neutral-700 dark:text-neutral-200', className)}>
      {children}
    </p>
  );
};

Text.extrabold = ({ className, children, ...props }: Props) => {
  return (
    <p {...props} className={clsx('text-sm font-extrabold text-neutral-700 dark:text-neutral-200', className)}>
      {children}
    </p>
  );
};
