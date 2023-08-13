import { useState, useEffect } from 'react';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';
import { twMerge } from 'tailwind-merge';

type Props = {
  wrapperClassName?: string;
  className?: string;
  label?: string;
  type?: string;
  name: string;
  placeholder?: string;
  value?: string | string[];
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  [props: string]: any;
};

export default function LabeledInput({
  wrapperClassName,
  className,
  label,
  type,
  name,
  placeholder,
  value,
  onChange,
  ...props
}: Props) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={twMerge('mb-4', type == 'password' && 'relative', wrapperClassName)}>
      <label className='block text-sm text-gray-800 dark:text-neutral-300' htmlFor={name}>
        {label}
      </label>
      <input
        {...props}
        type={type == 'password' ? (showPassword ? 'text' : 'password') : type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={twMerge(
          'mt-2 w-full rounded-md border border-neutral-300 px-4 py-[0.6rem] text-sm font-medium outline-none transition-all',
          'bg-white text-neutral-800 dark:bg-neutral-900 dark:text-neutral-100',
          'focus:border-sky-500 focus:ring-1 focus:ring-sky-500 dark:border-neutral-700 dark:focus:border-sky-500 dark:focus:ring-sky-500',
          className
        )}
      />
      {type == 'password' && (
        <button
          type='button'
          aria-label='show password'
          onClick={() => setShowPassword(!showPassword)}
          className='absolute right-0.5 z-10 mr-0.5 mt-3 rounded-md border-gray-300 p-1.5 outline-none ring-gray-300 focus:border-sky-600 focus:ring-1 focus:ring-sky-600'
        >
          {showPassword ? (
            <EyeIcon className='h-5 w-5 text-neutral-600' />
          ) : (
            <EyeOffIcon className='h-5 w-5 text-neutral-600' />
          )}
        </button>
      )}
    </div>
  );
}

type DisabledProps = {
  wrapperClassName?: string;
  className?: string;
  label: string;
  type?: string;
  name: string;
  placeholder?: string;
  defaultValue?: string;
  [props: string]: any;
};

LabeledInput.disabled = ({
  wrapperClassName,
  className,
  label,
  type,
  name,
  placeholder,
  defaultValue,
  ...props
}: DisabledProps) => {
  return (
    <div className={twMerge('mb-4', wrapperClassName)}>
      <label className='block text-sm text-gray-500 dark:text-neutral-300' htmlFor={name}>
        {label}
      </label>
      <input
        {...props}
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className={twMerge(
          'mt-2 w-full cursor-not-allowed rounded-md border border-neutral-300 bg-gray-100 px-4 py-[0.6rem] text-sm',
          'font-medium outline-none transition-all dark:border-neutral-800 dark:bg-neutral-800 dark:text-neutral-500',
          className
        )}
        disabled
      />
    </div>
  );
};
