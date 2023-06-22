import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Breadcrumb from '@components/layout/Breadcrumb';
import Navbar from './Navbar';
import Menu from './Menu';
import clsx from 'clsx';
import nookies from 'nookies';
import HeadSeo from './HeadSeo';
import { useMounted } from '@hooks/useMounted';

type Props = {
  children: ReactNode;
  title: string;
  description?: string;
  prefetch?: string[];
  [props: string]: any;
};

export default function Layout({ children, title, description, prefetch, ...props }: Props) {
  const admin = nookies.get(null, 'name');
  const mounted = useMounted();

  return (
    <>
      <HeadSeo title={title} description={description} prefetch={prefetch} />

      <div
        {...props}
        className='font-inter min-h-screen w-full bg-white text-sm dark:bg-neutral-900 lg:grid'
        style={{ gridTemplateColumns: 'auto 1fr' }}
      >
        <Sidebar />

        <div className='relative'>
          <Navbar />

          {/* Show on Mobile */}
          <div
            className={clsx(
              'flex items-center justify-between gap-x-4 border-b px-4 py-3 lg:hidden',
              'overflow-x-auto bg-white/95 dark:border-neutral-800 dark:bg-neutral-900/90',
              'scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 dark:scrollbar-thumb-neutral-800'
            )}
          >
            <Breadcrumb />
          </div>

          {/* Show on Desktop */}
          <div
            className={clsx(
              'hidden items-center justify-between gap-x-4 border-b px-4 py-3 dark:border-neutral-800 lg:flex',
              'sticky top-0 z-40 bg-white/50 backdrop-blur-md backdrop-filter dark:bg-neutral-900/30'
            )}
          >
            <Breadcrumb />

            {mounted && admin.name ? <Menu /> : null}
          </div>

          <div className='px-5 py-5'>{children}</div>
        </div>
      </div>
    </>
  );
}
