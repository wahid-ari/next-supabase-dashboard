import clsx from 'clsx';

type Props = {
  label?: string;
  className?: string;
  name: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  height?: number;
  [props: string]: any;
};

export default function TextArea({ label, className, name, placeholder, value, onChange, height, ...props }: Props) {
  return (
    <div className='mb-4'>
      {label && (
        <label htmlFor={name} className='block text-sm font-medium text-neutral-800 dark:text-gray-200'>
          {label}
        </label>
      )}
      <textarea
        {...props}
        id={name}
        name={name}
        rows={height}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={clsx(
          className,
          'mt-2 w-full rounded-md bg-white p-3 text-sm outline-none transition-all dark:bg-neutral-900 dark:text-white',
          'min-h-[80px] border border-gray-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-500 dark:border-neutral-700'
        )}
      />
    </div>
  );
}

TextArea.disabled = ({ label, className, name, placeholder, value, onChange, height, ...props }: Props) => {
  return (
    <div className='mb-4'>
      {label && (
        <label htmlFor={name} className='block text-sm font-medium text-neutral-800 dark:text-gray-200'>
          {label}
        </label>
      )}
      <textarea
        {...props}
        id={name}
        name={name}
        rows={height}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled
        className={clsx(
          className,
          'mt-2 w-full cursor-not-allowed rounded-md p-3 text-sm text-neutral-500',
          'min-h-[80px] border border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800'
        )}
      />
    </div>
  );
};
