import { useEffect, useMemo, useRef, useState } from 'react';
import { useLogsData } from '@libs/swr';
import Layout from '@components/layout/Layout';
import Title from '@components/systems/Title';
import Shimer from '@components/systems/Shimer';
import InputDebounce from '@components/systems/InputDebounce';
import ReactTable from '@components/systems/ReactTable';
import Badge from '@components/systems/Badge';
import nookies from 'nookies';

export async function getServerSideProps(context: any) {
  // const cookies = nookies.get(context);
  // if (!cookies.token) {
  //   return {
  //     redirect: {
  //       destination: '/login',
  //     },
  //   };
  // }
  return {
    props: {},
  };
}

export default function Log() {
  const { data, error } = useLogsData();
  const [inputDebounceValue, setInputDebounceValue] = useState('');

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
    []
  );

  const tableInstance = useRef(null);
  const [filteredLength, setFilteredLength] = useState(0);
  useEffect(() => {
    setFilteredLength(tableInstance?.current?.rows?.length);
  }, [inputDebounceValue]);

  if (error) {
    return (
      <Layout title='Logs - MyBook'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout title='Logs - MyBook' prefetch={['/api/tag']}>
      <div className='mb-4 flex flex-wrap items-center justify-between gap-y-3'>
        <Title>Logs</Title>
      </div>

      <InputDebounce
        label='Search'
        id='inputdebounce'
        name='inputdebounce'
        placeholder='Search'
        value={inputDebounceValue}
        onChange={(value) => {
          setInputDebounceValue(value);
          tableInstance?.current?.setGlobalFilter(value);
        }}
      />

      {data ? (
        <ReactTable
          columns={column}
          data={data}
          ref={tableInstance}
          page_size={20}
          itemPerPage={[10, 20, 50, 100]}
          keyword={inputDebounceValue}
          showInfo
          filteredLength={filteredLength}
        />
      ) : (
        <Shimer className='!h-60' />
      )}
    </Layout>
  );
}
