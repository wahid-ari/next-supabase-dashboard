import clsx from 'clsx';

type Props = {
  className?: string;
  percent: number;
  [props: string]: any;
};

export default function Progress({ className, percent, ...props }: Props) {
  return (
    <div className={clsx(className, 'h-1.5 w-full rounded-full bg-gray-200 dark:bg-neutral-800')}>
      <div {...props} className='h-1.5 rounded-full bg-sky-600' style={{ width: `${percent}%` }}></div>
    </div>
  );
}

Progress.percentage = ({ className, percent, ...props }: Props) => {
  return (
    <div className='w-full rounded-full bg-gray-200 dark:bg-neutral-800'>
      <div
        {...props}
        className={clsx(
          'rounded-full p-0.5 text-center text-xs font-medium leading-none',
          percent > 0 ? 'bg-sky-600 text-sky-100' : 'text-gray-800 dark:text-neutral-200',
          className
        )}
        style={{ width: percent + '%' }}
      >
        {percent > 0 ? `${percent} %` : '0%'}
      </div>
    </div>
  );
};
