import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
// import nookies from 'nookies';
import { useSession } from 'next-auth/react';

import { useMounted } from '@hooks/useMounted';

import Breadcrumb from '@components/layout/Breadcrumb';
import HeadSeo from '@components/layout/HeadSeo';
import Menu from '@components/layout/Menu';
import Navbar from '@components/layout/Navbar';
import Sidebar from '@components/layout/Sidebar';

type Props = {
  children: ReactNode;
  title: string;
  description?: string;
  prefetch?: string[];
  demo?: boolean;
  [props: string]: any;
};

export default function Layout({ children, title, description, prefetch, demo, ...props }: Props) {
  // const admin = nookies.get(null, 'name');
  const { data: session, status }: { data: any; status: any } = useSession();
  const mounted = useMounted();

  return (
    <>
      <HeadSeo title={title} description={description} prefetch={prefetch} />

      <main
        {...props}
        className='min-h-screen w-full bg-white text-sm dark:bg-neutral-900 lg:grid'
        style={{ gridTemplateColumns: 'auto 1fr' }}
      >
        <Sidebar className={`${demo ? '!z-0' : ''}`} />

        <div className='relative'>
          <Navbar className={`${demo ? '!z-0' : ''}`} />

          {/* Show on Mobile */}
          <div
            className={twMerge(
              'flex items-center justify-between gap-x-4 border-b px-4 py-3 lg:hidden',
              'overflow-x-auto bg-white/95 dark:border-neutral-800 dark:bg-neutral-900/90',
              'scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 dark:scrollbar-thumb-neutral-800'
            )}
          >
            <Breadcrumb />
          </div>

          {/* Show on Desktop */}
          <div
            className={twMerge(
              'hidden items-center justify-between gap-x-4 border-b px-4 py-3 dark:border-neutral-800 lg:flex',
              'sticky top-0 z-40 bg-white/50 backdrop-blur-md backdrop-filter dark:bg-neutral-900/30',
              demo && '!z-0'
            )}
          >
            <Breadcrumb />

            {mounted && session?.name ? <Menu /> : null}
          </div>

          <div className='px-5 py-5'>{children}</div>
        </div>
      </main>
    </>
  );
}
