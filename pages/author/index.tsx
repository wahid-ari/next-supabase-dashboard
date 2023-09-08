import { useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { ExternalLinkIcon, PlusSmIcon } from '@heroicons/react/outline';
import axios from 'axios';
import { mutate } from 'swr';

import { useAuthorsData } from '@/libs/swr';
import useToast from '@/hooks/useToast';

import Layout from '@/components/layout/Layout';
import Button from '@/components/systems/Button';
import Dialog from '@/components/systems/Dialog';
import InputDebounce from '@/components/systems/InputDebounce';
import LinkButton from '@/components/systems/LinkButton';
import ReactTable from '@/components/systems/ReactTable';
import Shimer from '@/components/systems/Shimer';
import Title from '@/components/systems/Title';

Author.auth = true;

export default function Author() {
  const { data, error } = useAuthorsData();
  const { updateToast, pushToast } = useToast();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteItem, setDeleteItem] = useState({ id: null, name: '' });
  const [inputDebounceValue, setInputDebounceValue] = useState('');

  async function handleDelete() {
    const toastId = pushToast({
      message: 'Deleting author',
      isLoading: true,
    });
    try {
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/author?id=${deleteItem.id}`);
      if (res.status == 200) {
        setOpenDeleteDialog(false);
        setDeleteItem({ id: null, name: '' });
        updateToast({ toastId, message: res?.data?.message, isError: false });
      }
    } catch (error) {
      console.error(error);
      updateToast({ toastId, message: error?.response?.data?.error, isError: true });
    } finally {
      mutate(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/author`);
    }
  }

  function handleShowDeleteModal(id: any, name: any) {
    setDeleteItem({ id: id, name: name });
    setOpenDeleteDialog(true);
  }

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
        Header: 'Name',
        accessor: 'name',
        width: 300,
        Cell: (row: any) => {
          const { values, original } = row.cell.row;
          return (
            <Link
              href={`author/detail/${values.id}`}
              className='rounded text-sm font-medium transition-all duration-200 hover:text-sky-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
            >
              {values.name}
            </Link>
          );
        },
      },
      {
        Header: 'Born',
        accessor: 'born',
        disableSortBy: true,
        width: 300,
        Cell: (row: any) => {
          const { values, original } = row.cell.row;
          let countryArray = original.born?.split(',');
          let country = countryArray[countryArray.length - 1];
          return country ? country : '-';
        },
      },
      {
        Header: 'Web',
        accessor: 'web',
        disableSortBy: true,
        width: 300,
        Cell: (row: any) => {
          const { values, original } = row.cell.row;
          if (original.web) {
            return (
              <a
                href={original?.web}
                className='flex w-16 items-center rounded text-sm font-medium text-sky-500 transition-all duration-200 hover:text-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
                target='_blank'
                rel='noreferrer'
              >
                Open
                <ExternalLinkIcon className='ml-1 h-4 w-4' />
              </a>
            );
          }
          return '-';
        },
      },
      {
        Header: 'Action',
        disableSortBy: true,
        width: 300,
        Cell: (row: any) => {
          const { values, original } = row.cell.row;
          // console.log(`${values.id} - ${values.name} - ${original.cover} - ${original.artists.id} - ${original.artists.name}`)
          return (
            <div>
              <Link
                href={`author/edit/${values.id}`}
                className='mr-2 rounded bg-sky-600 px-[6px] py-[3px] text-sm font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-400'
              >
                Edit
              </Link>
              <Button.danger
                className='!px-[6px] !py-[2px]'
                onClick={() => handleShowDeleteModal(values.id, values.name)}
              >
                Delete
              </Button.danger>
              {/* <button onClick={() => alert(`${row.cell.row.values.id} - ${row.cell.row.values.name}`)}
                className="text-blue-500 hover:text-blue-700 text-sm font-medium">
                Edit
              </button>
              <button onClick={() => showDeleteModal(row.cell.row.values.id, row.cell.row.values.name)}
                className="text-red-500 hover:text-red-700 text-sm font-medium">
                Delete
              </button> */}
            </div>
          );
        },
      },
    ],
    []
  );

  const tableInstance = useRef(null);

  if (error) {
    return (
      <Layout title='Author - MyBook'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout title='Author - MyBook' prefetch={['/api/author']} description='View and Manage Author - MyBook'>
      <div className='mb-4 flex flex-wrap items-center justify-between gap-y-3'>
        <Title>Author</Title>
        <LinkButton href='author/add' className='flex items-center gap-2'>
          <PlusSmIcon className='h-5 w-5' />
          Add New Author
        </LinkButton>
      </div>

      <InputDebounce
        label='Search'
        name='search'
        id='search'
        placeholder='Search'
        value={inputDebounceValue}
        onChange={(value) => {
          setInputDebounceValue(value);
          tableInstance?.current?.setGlobalFilter(value);
        }}
      />

      {data ? (
        <ReactTable columns={column} data={data} ref={tableInstance} page_size={20} itemPerPage={[10, 20, 50, 100]} />
      ) : (
        <Shimer className='!h-60' />
      )}

      <Dialog
        title='Delete Author'
        open={openDeleteDialog}
        isDanger
        setOpen={setOpenDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={handleDelete}
      >
        <div className='mt-5 text-center sm:text-left'>
          Are you sure want to delete <span className='font-semibold'>{deleteItem.name}</span> ?
        </div>
      </Dialog>
    </Layout>
  );
}
