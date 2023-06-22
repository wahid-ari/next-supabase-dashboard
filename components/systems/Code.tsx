import { useEffect, useState } from 'react';
import Prism from 'prismjs';
import { ClipboardIcon, DocumentDuplicateIcon } from '@heroicons/react/outline';
import clsx from 'clsx';

type Props = {
  name?: string;
  code: string;
  className?: string;
  lang?: string;
  [props: string]: any;
};

export default function Code({ name = 'Code', code, className, lang = 'javascript', ...props }: Props) {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  const [copy, setCopy] = useState(false);

  async function copyText() {
    try {
      await navigator.clipboard.writeText(code);
      setCopy(true);
      setTimeout(() => {
        setCopy(false);
      }, 2500);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <p className='text-sm font-semibold dark:text-white'>Example {name}:</p>
      <div {...props} className={clsx('Code relative rounded-md text-sm', className)}>
        <button
          title='Copy Code'
          onClick={copyText}
          className='absolute right-0 m-3 mt-4 rounded-md border border-neutral-700 px-1 py-1 transition-all dark:bg-neutral-800 dark:hover:bg-neutral-700'
        >
          {copy ? (
            <div className='flex items-center'>
              <ClipboardIcon className='h-5 w-5 transition-all dark:text-gray-400 dark:hover:text-gray-300' />
              <span className='pl-1 text-xs text-neutral-600 dark:text-gray-300'>Copied !</span>
            </div>
          ) : (
            <DocumentDuplicateIcon className='h-5 w-5 text-neutral-500 transition-all hover:text-neutral-600 dark:text-gray-400 dark:hover:text-gray-300' />
          )}
        </button>
        <pre className='line-numbers scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-neutral-700 dark:scrollbar-thumb-neutral-700'>
          <code className={`language-${lang}`}>{code}</code>
        </pre>
      </div>
    </>
  );
}
