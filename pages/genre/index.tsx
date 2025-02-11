import { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { PlusIcon } from 'lucide-react';
import { mutate } from 'swr';
import { useDebounce } from 'use-debounce';

import { useGenresData } from '@/libs/swr';
import useToast from '@/hooks/use-hot-toast';

import Layout from '@/components/layout/Layout';
import Button from '@/components/systems/Button';
import Dialog from '@/components/systems/Dialog';
import Input from '@/components/systems/Input';
import Label from '@/components/systems/Label';
import LabeledInput from '@/components/systems/LabeledInput';
import Shimmer from '@/components/systems/Shimmer';
import TableSimple from '@/components/systems/TableSimple';
import Title from '@/components/systems/Title';

// Genre.auth = true;
// This page secured through the middleware in root folder
export default function Genre() {
  const { data, error } = useGenresData();
  const { updateToast, pushToast, dismissToast } = useToast();
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [name, setName] = useState('');
  const [editItem, setEditItem] = useState({ id: null, name: '' });
  const [deleteItem, setDeleteItem] = useState({ id: null, name: '' });
  const [search, setSearch] = useState('');
  const [searchDebounce] = useDebounce(search, 300);

  const filteredData =
    searchDebounce === ''
      ? data
      : data.filter((item: any) =>
          item.name.toLowerCase().replace(/\s+/g, '').includes(searchDebounce.toLowerCase().replace(/\s+/g, '')),
        );

  async function handleCreate() {
    const toastId = pushToast({
      message: `Creating ${name}`,
      isLoading: true,
    });
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/genre`, { name: name });
      if (res.status == 200) {
        setOpenCreateDialog(false);
        setName('');
        updateToast({ toastId, message: res?.data?.message, isError: false });
        mutate(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/genre`);
      }
    } catch (error) {
      console.error(error);
      if (Array.isArray(error?.response?.data?.message)) {
        const errors = [...error?.response?.data?.message].reverse();
        // show all error
        dismissToast();
        errors.forEach((item: any) => {
          pushToast({ message: item?.message, isError: true });
        });
        // only show one error
        // errors.map((item: any) => {
        //   updateToast({ toastId, message: item?.message, isError: true });
        // })
      } else {
        updateToast({ toastId, message: error?.response?.data?.message, isError: true });
      }
    }
  }

  async function handleEdit() {
    const toastId = pushToast({
      message: 'Updating genre',
      isLoading: true,
    });
    try {
      const res = await axios.put(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/genre`, editItem);
      if (res.status == 201) {
        setOpenEditDialog(false);
        setEditItem({ id: null, name: '' });
        updateToast({ toastId, message: res?.data?.message, isError: false });
        mutate(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/genre`);
      }
    } catch (error) {
      console.error(error);
      if (Array.isArray(error?.response?.data?.message)) {
        const errors = [...error?.response?.data?.message].reverse();
        // show all error
        dismissToast();
        errors.forEach((item: any) => {
          pushToast({ message: item?.message, isError: true });
        });
        // only show one error
        // errors.map((item: any) => {
        //   updateToast({ toastId, message: item?.message, isError: true });
        // })
      } else {
        updateToast({ toastId, message: error?.response?.data?.message, isError: true });
      }
    }
  }

  async function handleDelete() {
    const toastId = pushToast({
      message: `Deleting ${deleteItem.name}`,
      isLoading: true,
    });
    try {
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/genre?id=${deleteItem.id}`);
      if (res.status == 200) {
        setOpenDeleteDialog(false);
        setDeleteItem({ id: null, name: '' });
        updateToast({ toastId, message: res?.data?.message, isError: false });
        mutate(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/genre`);
      }
    } catch (error) {
      console.error(error);
      const { detail } = error?.response?.data;
      if (detail) {
        updateToast({ toastId, message: detail, isError: true });
      } else {
        updateToast({ toastId, message: error?.response?.data?.message, isError: true });
      }
    }
  }

  function handleShowEditModal(id: any, name: any) {
    setEditItem({ id: id, name: name });
    setOpenEditDialog(true);
  }

  function handleShowDeleteModal(id: any, name: any) {
    setDeleteItem({ id: id, name: name });
    setOpenDeleteDialog(true);
  }

  if (error) {
    return (
      <Layout title='Genre - MyBook'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout title='Genre - MyBook' prefetch={['/api/genre']} description='View and Manage Genre - MyBook'>
      <div className='mb-4 flex flex-wrap items-center justify-between gap-y-3'>
        <Title>Genre</Title>
        <Button.success onClick={() => setOpenCreateDialog(true)} className='flex items-center gap-2'>
          <PlusIcon className='h-4 w-4' />
          Add New Genre
        </Button.success>
      </div>

      <Label>Search</Label>
      <Input name='search' placeholder='Search' onChange={(e) => setSearch(e.target.value)} />

      <Dialog
        title='Create Genre'
        open={openCreateDialog}
        setOpen={setOpenCreateDialog}
        onClose={() => setOpenCreateDialog(false)}
        onConfirm={handleCreate}
        confirmText='Save'
      >
        <div className='mt-5'>
          <LabeledInput
            label='Name'
            type='text'
            name='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Genre Name'
          />
        </div>
      </Dialog>

      <Dialog
        title='Edit Genre'
        open={openEditDialog}
        setOpen={setOpenEditDialog}
        onClose={() => setOpenEditDialog(false)}
        onConfirm={handleEdit}
        confirmText='Update'
        isEdit
      >
        <div className='mt-5'>
          <LabeledInput
            label='Name'
            type='text'
            name='name'
            value={editItem.name}
            onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
          />
        </div>
      </Dialog>

      <Dialog
        title='Delete Genre'
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

      {filteredData ? (
        <TableSimple
          head={
            <>
              <TableSimple.td shrink>No</TableSimple.td>
              <TableSimple.td>Name</TableSimple.td>
              <TableSimple.td shrink>Action</TableSimple.td>
            </>
          }
        >
          {filteredData.map((item: any, index: number) => {
            return (
              <TableSimple.tr key={index}>
                <TableSimple.td shrink>{index + 1}</TableSimple.td>
                <TableSimple.td>
                  <Link
                    href={`genre/detail/${item.id}`}
                    className='rounded text-sm font-medium transition-all duration-200 hover:text-sky-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
                  >
                    {item.name}
                  </Link>
                </TableSimple.td>
                <TableSimple.td>
                  <Button className='mr-2 !px-[6px] !py-[2px]' onClick={() => handleShowEditModal(item.id, item.name)}>
                    Edit
                  </Button>
                  <Button.danger
                    className='!px-[6px] !py-[2px]'
                    onClick={() => handleShowDeleteModal(item.id, item.name)}
                  >
                    Delete
                  </Button.danger>
                </TableSimple.td>
              </TableSimple.tr>
            );
          })}
        </TableSimple>
      ) : (
        <TableSimple
          head={
            <>
              <TableSimple.th shrink>No</TableSimple.th>
              <TableSimple.th className='text-left'>Name</TableSimple.th>
              <TableSimple.th className='w-32'>Action</TableSimple.th>
            </>
          }
        >
          {[...Array(10).keys()].map((e, index) => (
            <TableSimple.tr key={index}>
              <TableSimple.td shrink>
                <Shimmer className='p-3' />
              </TableSimple.td>
              <TableSimple.td>
                <Shimmer className='p-3' />
              </TableSimple.td>
              <TableSimple.td className='flex gap-2'>
                <Shimmer className='w-full p-3' />
                <Shimmer className='w-full p-3' />
              </TableSimple.td>
            </TableSimple.tr>
          ))}
        </TableSimple>
      )}
    </Layout>
  );
}
