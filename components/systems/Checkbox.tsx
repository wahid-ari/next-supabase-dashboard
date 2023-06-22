import clsx from 'clsx';

type Props = {
  label?: string;
  name?: string;
  value?: string | number;
  onChange?: () => void;
  defaultChecked?: boolean;
  [props: string]: any;
};

export default function Checkbox({ label, name, value, onChange, defaultChecked, ...props }: Props) {
  return (
    <div className='group mb-3 flex items-center'>
      <input
        {...props}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        defaultChecked={defaultChecked}
        type='checkbox'
        className={clsx(
          'h-4 w-4 rounded border-neutral-300 focus:ring-2 focus:ring-sky-500 group-hover:cursor-pointer',
          'text-sky-600 dark:bg-neutral-900 dark:text-sky-600 dark:checked:bg-sky-600',
          'dark:border-neutral-700 dark:ring-offset-neutral-900 dark:focus:ring-sky-600'
        )}
      />
      <label htmlFor={name} className='ml-2 text-sm text-neutral-800 group-hover:cursor-pointer dark:text-neutral-300'>
        {label}
      </label>
    </div>
  );
}

type DisabledProps = {
  label?: string;
  name?: string;
  defaultChecked?: boolean;
  [props: string]: any;
};

Checkbox.disabled = ({ label, name, defaultChecked, ...props }: DisabledProps) => {
  return (
    <div className='group mb-3 flex items-center'>
      <input
        {...props}
        disabled
        id={name}
        name={name}
        defaultChecked={defaultChecked}
        type='checkbox'
        className={clsx(
          defaultChecked ? 'dark:bg-sky-600' : 'dark:bg-transparent',
          'h-4 w-4 rounded border-neutral-300 text-sky-600 group-hover:cursor-not-allowed dark:border-neutral-700'
        )}
      />
      <label
        htmlFor={name}
        className='ml-2 text-sm text-neutral-800 group-hover:cursor-not-allowed dark:text-neutral-300'
      >
        {label}
      </label>
    </div>
  );
};
