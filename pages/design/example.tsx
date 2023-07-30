import Link from 'next/link';

import Layout from '@components/layout/Layout';
import Wrapper from '@components/systems/Wrapper';
import Title from '@components/systems/Title';

import Dashboard from '@/components/example/dashboard/Dashboard';

export default function Example() {
  const tocClass = 'px-1 py-0.5 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none rounded';

  return (
    <Layout title='Example - MyBook'>
      <div className='relative'>
        <Title>Example</Title>
        <span className='absolute left-[105px] top-1 flex h-5 w-5 animate-bounce items-center justify-center'>
          <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75' />
          <span className='relative inline-flex h-3 w-3 rounded-full bg-sky-500' />
        </span>
      </div>

      <Wrapper id='tableofcontent' name='Table of Content' noChildren noClassName noProps>
        <div className='columns-2 text-sky-600 dark:text-sky-500 sm:columns-3'>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#dashboard'>
              Dashboard
            </Link>
          </span>
        </div>
      </Wrapper>

      <Wrapper id='dashboard' name='Dashboard' noChildren noClassName noProps>
        <Dashboard />
      </Wrapper>
    </Layout>
  );
}
