import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronsUpDownIcon, ChevronUpIcon } from 'lucide-react';
import { useDebounce } from 'use-debounce';

import { useLogsData } from '@/libs/swr';

import Layout from '@/components/layout/Layout';
import Badge from '@/components/systems/Badge';
import Input from '@/components/systems/Input';
import Label from '@/components/systems/Label';
import ReactTable from '@/components/systems/ReactTable';
import Shimmer from '@/components/systems/Shimmer';
import TableSimple from '@/components/systems/TableSimple';
import Title from '@/components/systems/Title';

// Log.auth = true;

export default function Log() {
  const { data, error } = useLogsData();
  const [search, setSearch] = useState('');
  const [searchDebounce] = useDebounce(search, 300);

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
        Header: 'User',
        accessor: 'book_users.name',
        width: 300,
        Cell: (row: any) => {
          const { values, original } = row.cell.row;
          return original?.book_users?.name;
        },
      },
      {
        Header: 'Action',
        accessor: 'action',
        width: 300,
        Cell: (row: any) => {
          const { values, original } = row.cell.row;
          return original.action == 'create' ? (
            <Badge.green>CREATE</Badge.green>
          ) : original.action == 'update' ? (
            <Badge>UPDATE</Badge>
          ) : (
            <Badge.red>DELETE</Badge.red>
          );
        },
      },
      {
        Header: 'Table',
        accessor: 'table',
        width: 300,
        Cell: (row: any) => {
          const { values, original } = row.cell.row;
          return original?.table.replace('book_', '');
        },
      },
      {
        Header: 'Description',
        accessor: 'description',
        width: 300,
      },
      {
        Header: 'Date',
        accessor: 'created_at',
        width: 300,
        Cell: (row: any) => {
          const { values, original } = row.cell.row;
          return original?.created_at?.split('T')[0];
        },
      },
      {
        Header: 'Time',
        accessor: '',
        width: 300,
        Cell: (row: any) => {
          const { values, original } = row.cell.row;
          let date = new Date(original?.created_at);
          return date.toLocaleTimeString('en-US');
        },
      },
    ],
    [],
  );

  const tableInstance = useRef(null);
  useEffect(() => {
    tableInstance?.current?.setGlobalFilter(searchDebounce);
  }, [searchDebounce]);

  if (error) {
    return (
      <Layout title='Logs - MyBook'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout title='Logs - MyBook' description='View and Manage Logs - MyBook' prefetch={['/api/log']}>
      <div className='mb-4 flex flex-wrap items-center justify-between gap-y-3'>
        <Title>Logs</Title>
      </div>

      <Label>Search</Label>
      <Input name='search' placeholder='Search' onChange={(e) => setSearch(e.target.value)} />

      {data ? (
        <ReactTable
          columns={column}
          data={data}
          ref={tableInstance}
          page_size={20}
          itemPerPage={[10, 20, 50, 100]}
          keyword={searchDebounce}
          showInfo
        />
      ) : (
        <TableSimple
          head={
            <>
              <TableSimple.th className='flex items-center gap-1'>
                No <ChevronUpIcon className='h-4 w-4 opacity-50' />
              </TableSimple.th>
              <TableSimple.th>
                <div className='flex items-center justify-center gap-1'>
                  User <ChevronsUpDownIcon className='h-4 w-4 opacity-50' />
                </div>
              </TableSimple.th>
              <TableSimple.th>
                <div className='flex items-center justify-center gap-1'>
                  Action <ChevronsUpDownIcon className='h-4 w-4 opacity-50' />
                </div>
              </TableSimple.th>
              <TableSimple.th>
                <div className='flex items-center justify-center gap-1'>
                  Table <ChevronsUpDownIcon className='h-4 w-4 opacity-50' />
                </div>
              </TableSimple.th>
              <TableSimple.th>
                <div className='flex items-center justify-center gap-1'>
                  Description <ChevronsUpDownIcon className='h-4 w-4 opacity-50' />
                </div>
              </TableSimple.th>
              <TableSimple.th>
                <div className='flex items-center justify-center gap-1'>
                  Date <ChevronsUpDownIcon className='h-4 w-4 opacity-50' />
                </div>
              </TableSimple.th>
              <TableSimple.th>
                <div className='flex items-center justify-center gap-1'>
                  Time
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
              <TableSimple.td>
                <Shimmer className='p-3' />
              </TableSimple.td>
              <TableSimple.td>
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
      )}
    </Layout>
  );
}
