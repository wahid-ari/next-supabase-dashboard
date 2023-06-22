import { ReactNode } from 'react';
import clsx from 'clsx';

type Props = {
  className?: string;
  children?: ReactNode;
  [props: string]: any;
};

export default function Section({ className, children, ...props }: Props) {
  return (
    <section
      {...props}
      className={clsx(
        className,
        'my-2 rounded-md border bg-white p-8 py-4 dark:border-neutral-800 dark:bg-[#1F1F1F] lg:py-8'
      )}
    >
      {children}
    </section>
  );
}

Section.small = ({ className, children, ...props }: Props) => {
  return (
    <section
      {...props}
      className={clsx(className, 'my-2 rounded-md border bg-white p-8 py-2 dark:border-neutral-800 dark:bg-[#1F1F1F]')}
    >
      {children}
    </section>
  );
};
