import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  label?: string;
  name: string;
  className?: string;
  defaultValue?: any;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  children: ReactNode;
  [props: string]: any;
};

export default function Select({ label, name, className, defaultValue, onChange, children, ...props }: Props) {
  return (
    <div className=''>
      {label && (
        <label htmlFor={name} className='block text-sm text-neutral-800 dark:text-gray-300'>
          {label}
        </label>
      )}
      <select
        {...props}
        id={name}
        name={name}
        defaultValue={defaultValue}
        onChange={onChange}
        className={twMerge(
          'mt-2 block w-full cursor-pointer rounded-md border border-gray-300 bg-white px-3 py-2',
          'text-sm font-medium outline-none transition-all focus:border-sky-500 focus:outline-none',
          'focus:ring-2 focus:ring-sky-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white',
          className
        )}
      >
        {children}
      </select>
    </div>
  );
}

type OptionProps = {
  value: any;
  children: ReactNode;
  [props: string]: any;
};

Select.option = ({ value, children, ...props }: OptionProps) => {
  return (
    <option value={value} {...props}>
      {children}
    </option>
  );
};
