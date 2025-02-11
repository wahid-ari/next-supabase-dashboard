import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as HoverCard from '@radix-ui/react-hover-card';
import { ChevronsUpDownIcon, ChevronUpIcon } from 'lucide-react';

import { useGenreData } from '@/libs/swr';
import { cn } from '@/libs/utils';
import { useDebounce } from '@/hooks/use-debounce';

import Layout from '@/components/layout/Layout';
import LabeledInput from '@/components/systems/LabeledInput';
import ReactTable from '@/components/systems/ReactTable';
import Shimmer from '@/components/systems/Shimmer';
import TableSimple from '@/components/systems/TableSimple';
import Title from '@/components/systems/Title';

// Genre.auth = true;

export default function Genre() {
  const router = useRouter();
  const id = router.query?.id as string;
  const { data, error } = useGenreData(id);
  const [inputDebounce, setInputDebounce] = useState('');
  const debouncedValue = useDebounce(inputDebounce, 300);

  const column = useMemo(
    () => [
      {
        Header: 'No',
        accessor: 'id',
        width: 300,
        Cell: (row: any) => {
          // console.log(row.cell.row.index)
          return row.cell.row.index + 1;
        },
      },
      {
        Header: 'Title',
        accessor: 'title',
        width: 300,
        Cell: (row: any) => {
          const { values, original } = row.cell.row;
          let length = values.title.length;
          let text = length > 50 ? values.title?.slice(0, 60) + ' ...' : values.title;
          return (
            <HoverCard.Root>
              <HoverCard.Trigger asChild>
                <Link
                  href={`/book/detail/${values.id}`}
                  className='rounded text-sm font-medium transition-all duration-200 hover:text-sky-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
                >
                  {text}
                </Link>
              </HoverCard.Trigger>
              <HoverCard.Portal>
                <HoverCard.Content
                  side='top'
                  className={cn(
                    'z-50 max-h-40 max-w-sm overflow-auto rounded-md border shadow-md',
                    'bg-white p-2.5 !text-[15px] font-medium leading-5 text-neutral-700',
                    'scrollbar-thumb-rounded scrollbar-thin scrollbar-thumb-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:scrollbar-thumb-neutral-800',
                  )}
                >
                  {values.title}
                </HoverCard.Content>
              </HoverCard.Portal>
            </HoverCard.Root>
          );
        },
      },
      {
        Header: 'Author',
        accessor: 'book_authors.name',
        width: 300,
        Cell: (row: any) => {
          const { values, original } = row.cell.row;
          return (
            <Link
              href={`/author/detail/${original.book_authors?.id}`}
              className='rounded text-sm font-medium transition-all duration-200 hover:text-sky-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
            >
              {original.book_authors?.name}
            </Link>
          );
        },
      },
    ],
    [],
  );

  const tableInstance = useRef(null);

  useEffect(() => {
    tableInstance.current?.setGlobalFilter(debouncedValue);
  }, [debouncedValue]);

  if (error) {
    return (
      <Layout title='Genre Detail - MyBook'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout
      title={`${data ? data?.name + ' Books - MyBook' : 'Genre Detail - MyBook'}`}
      description='View Detail Genre - MyBook'
    >
      <div className='mb-4 flex flex-wrap items-center justify-between gap-y-3'>
        {data ? <Title>{data?.name} Books</Title> : <Title>Genre Detail</Title>}
      </div>

      {data ? (
        data?.books_by_genres?.length > 0 ? (
          <>
            <LabeledInput
              label='Search Data'
              id='caridata'
              name='caridata'
              placeholder='Keyword'
              value={inputDebounce}
              onChange={(e) => {
                setInputDebounce(e.target.value);
              }}
            />
            <ReactTable columns={column} data={data.books_by_genres} ref={tableInstance} page_size={20} />
          </>
        ) : (
          <div className='rounded border border-red-500 p-3'>
            <p className='text-red-500'>No Book in Genre {data?.name} </p>
          </div>
        )
      ) : (
        <>
          <LabeledInput label='Search Data' id='caridata' name='caridata' placeholder='Keyword' />
          <TableSimple
            head={
              <>
                <TableSimple.th className='flex items-center gap-1'>
                  No <ChevronUpIcon className='h-4 w-4 opacity-50' />
                </TableSimple.th>
                <TableSimple.th className='text-left'>
                  <div className='flex items-center gap-1'>
                    Title <ChevronsUpDownIcon className='h-4 w-4 opacity-50' />
                  </div>
                </TableSimple.th>
                <TableSimple.th className='sm:w-48 md:w-64 lg:w-80'>
                  <div className='flex items-center gap-1'>
                    Author
                    <ChevronsUpDownIcon className='h-4 w-4 opacity-50' />
                  </div>
                </TableSimple.th>
              </>
            }
          >
            {[...Array(5).keys()].map((e, index) => (
              <TableSimple.tr key={index}>
                <TableSimple.td shrink>
                  <Shimmer className='p-3' />
                </TableSimple.td>
                <TableSimple.td>
                  <Shimmer className='p-3' />
                </TableSimple.td>
                <TableSimple.td>
                  <Shimmer className='p-3' />
                </TableSimple.td>
              </TableSimple.tr>
            ))}
          </TableSimple>
        </>
      )}
    </Layout>
  );
}
