import { ReactNode } from 'react';
import { clsx } from 'clsx';

type Props = {
  className?: string;
  head?: ReactNode;
  bordered?: boolean;
  children: ReactNode;
  [props: string]: any;
};

export default function TableSimple({ className, head, bordered, children, ...props }: Props) {
  return (
    <div
      className={clsx(
        'w-full rounded',
        bordered ? 'border-t dark:border-t-neutral-800' : 'border dark:border-neutral-800',
        className
      )}
    >
      <div className='overflow-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 dark:scrollbar-thumb-neutral-700'>
        <table {...props} className='w-full whitespace-nowrap text-neutral-800 dark:text-neutral-300'>
          <thead>
            <tr className='border-b bg-gray-50 text-sm font-medium dark:border-neutral-800 dark:bg-[#202020]'>
              {head}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </div>
  );
}

type TrProps = {
  className?: string;
  children: ReactNode;
  [props: string]: any;
};

TableSimple.tr = ({ className, children, ...props }: TrProps) => {
  return (
    <tr
      {...props}
      className={clsx(
        'border-b bg-white text-sm text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200',
        className
      )}
    >
      {children}
    </tr>
  );
};

type TdProps = {
  className?: string;
  shrink?: boolean;
  bordered?: boolean;
  children: ReactNode;
  [props: string]: any;
};

TableSimple.td = ({ className, shrink, bordered, children, ...props }: TdProps) => {
  return (
    <td
      {...props}
      className={clsx('p-3', shrink && 'w-1', bordered && 'border-x dark:border-x-neutral-800', className)}
    >
      {children}
    </td>
  );
};
