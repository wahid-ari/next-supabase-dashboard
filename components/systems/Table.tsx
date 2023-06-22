import { ReactNode } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import { clsx } from 'clsx';
import Button from './Button';

type Props = {
  className?: string;
  head?: ReactNode;
  totalPage?: number;
  totalData?: number;
  currentPage?: number;
  next?: () => void;
  prev?: () => void;
  rowPerPage?: number;
  noPagination?: boolean;
  children: ReactNode;
  [props: string]: any;
};

export default function Table({
  className,
  head,
  totalPage = 0,
  totalData = 0,
  currentPage = 0,
  next,
  prev,
  rowPerPage,
  noPagination,
  children,
  ...props
}: Props) {
  return (
    <div
      className={clsx(
        'w-full rounded border shadow-sm dark:border-neutral-800 lg:max-w-[calc(100vw_-_17rem)]',
        className
      )}
    >
      <div className='w-full overflow-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 dark:scrollbar-thumb-neutral-800 lg:max-w-[calc(100vw_-_17rem)]'>
        <table {...props} className='w-full table-auto whitespace-nowrap text-neutral-700 dark:text-neutral-400'>
          <thead>
            <tr className='whitespace-nowrap border-b bg-gray-50 text-sm font-bold dark:border-neutral-800 dark:bg-[#202020]'>
              {head}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
      {noPagination ? (
        ''
      ) : (
        <div className='bg-white text-xs font-medium text-gray-500 dark:border-neutral-800 dark:bg-transparent dark:text-neutral-400'>
          <div className='flex w-full items-center justify-between gap-2 px-4 py-3'>
            {rowPerPage === 5 ? (
              totalData === 0 ? (
                <p className='whitespace-nowrap'>No data</p>
              ) : (
                <p className='whitespace-nowrap'>
                  Showing <span className='font-bold'>{(currentPage - 1) * 5 + 1}</span> -{' '}
                  <span className='font-bold'>{currentPage * 5}</span>{' '}
                  {/* dari <span className="font-bold">{totalData}</span> data */}
                </p>
              )
            ) : totalData === 0 ? (
              <p className='whitespace-nowrap'>No data</p>
            ) : (
              <p className='whitespace-nowrap'>
                Showing <span className='font-bold'>{(currentPage - 1) * 5 + 1}</span> -{' '}
                <span className='font-bold'>{currentPage !== totalPage ? currentPage * 5 : totalData}</span> from{' '}
                <span className='font-bold'>{totalData}</span> data
              </p>
            )}
            <div className='flex items-center justify-end gap-2'>
              <Button.secondary
                id='prev'
                title='Prev'
                aria-label='Prev'
                onClick={prev}
                disabled={currentPage < 2}
                className='flex h-8 w-8 items-center justify-center !p-0'
              >
                <ChevronLeftIcon className='h-4 w-4' />
              </Button.secondary>
              <Button.secondary
                id='next'
                title='Next'
                aria-label='Next'
                onClick={next}
                disabled={currentPage === totalPage}
                className='flex h-8 w-8 items-center justify-center !p-0'
              >
                <ChevronRightIcon className='h-4 w-4' />
              </Button.secondary>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

type TrProps = {
  className?: string;
  children: ReactNode;
  [props: string]: any;
};

Table.tr = ({ className, children, ...props }: TrProps) => {
  return (
    <tr
      {...props}
      className={clsx(
        'border-b bg-white text-sm text-neutral-600 hover:bg-gray-50 dark:border-neutral-800 dark:bg-transparent dark:text-neutral-200',
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
  children: ReactNode;
  [props: string]: any;
};

Table.td = ({ className, shrink, children, ...props }: TdProps) => {
  return (
    <td {...props} className={clsx('p-4', className, shrink && 'w-1')}>
      {children}
    </td>
  );
};
