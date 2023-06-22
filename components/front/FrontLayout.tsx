import { ReactNode } from 'react';
import HeadSeo from '@components/layout/HeadSeo';
import Navbar from './FrontNavbar';
import BackToTop from './BackToTop';
import Footer from './Footer';
import clsx from 'clsx';

type Props = {
  children: ReactNode;
  title: string;
  description: string;
  className?: string;
  [props: string]: any;
};

export default function FrontLayout({ children, title, description, className, ...props }: Props) {
  return (
    <>
      <HeadSeo title={title} description={description} />
      <div {...props} className='relative dark:bg-neutral-900'>
        <Navbar className='bg-white/50 backdrop-blur-md backdrop-filter dark:bg-neutral-900/30' />
        <div className={clsx('mx-auto min-h-screen w-full max-w-7xl p-4 pb-10', className)}>{children}</div>
        <Footer />
        <BackToTop />
      </div>
    </>
  );
}
