'use client';

import { X } from 'lucide-react';
import { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/Button';
import { DataTableFilter } from '@/components/ui/DataTable/DataTableFilter';

export const status = [
  {
    label: 'Pending',
    value: 'pending',
  },
  {
    label: 'Processing',
    value: 'processing',
  },
  {
    label: 'Success',
    value: 'success',
  },
  {
    label: 'Failed',
    value: 'failed',
  },
];

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className='flex items-center justify-between'>
      {table.getColumn('status') && (
        <DataTableFilter column={table.getColumn('status')} title='Status' options={status} />
      )}
      {isFiltered && (
        <Button variant='ghost' onClick={() => table.resetColumnFilters()} className='ml-2 h-8 px-2 lg:px-3'>
          Reset
          <X className='ml-1 h-4 w-4' />
        </Button>
      )}
    </div>
  );
}
