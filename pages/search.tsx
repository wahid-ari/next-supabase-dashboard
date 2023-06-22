import { useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSearchData } from '@libs/swr';
import { useSearchHistoryStore } from '@store/useStore';
import Layout from '@components/layout/Layout';
import LabeledInput from '@components/systems/LabeledInput';
import Title from '@components/systems/Title';
import Text from '@components/systems/Text';
import Button from '@components/systems/Button';
import Heading from '@components/systems/Heading';
import BookListItem from '@components/dashboard/BookListItem';
import AuthorListItem from '@components/dashboard/AuthorListItem';

export default function Search() {
  const router = useRouter();
  const search = router.query.q;
  const query = useRef(search);
  const { data, error } = useSearchData(search);

  const booksHistory = useSearchHistoryStore((state: any) => state.booksHistory);
  const setBooksHistory = useSearchHistoryStore((state: any) => state.setBooksHistory);
  const resetBooksHistory = useSearchHistoryStore((state: any) => state.resetBooksHistory);

  const authorsHistory = useSearchHistoryStore((state: any) => state.authorsHistory);
  const setAuthorsHistory = useSearchHistoryStore((state: any) => state.setAuthorsHistory);
  const resetAuthorsHistory = useSearchHistoryStore((state: any) => state.resetAuthorsHistory);

  const resetAllSearchHistory = useSearchHistoryStore((state: any) => state.resetAllSearchHistory);

  function compareSearchResult(history: any, newResults: any) {
    let newHistory = history;
    // iterate each search result
    for (const b of newResults) {
      // check if new result already in the history
      const exists = history.findIndex((item: any) => item.id == b.id) > -1;
      if (!exists) {
        newHistory.push(b);
      }
    }
    return newHistory;
  }

  useEffect(() => {
    if (data?.books?.length > 0) {
      // if already searching
      if (booksHistory.length > 0) {
        // compare history with new search result
        let newBooks = compareSearchResult(booksHistory, data?.books);
        if (newBooks != booksHistory) {
          setBooksHistory(newBooks);
        }
      } else {
        // first time searching, set search result to search history directly
        setBooksHistory(data?.books);
      }
    }
    // Authors
    if (data?.authors?.length > 0) {
      if (authorsHistory.length > 0) {
        let newAuthors = compareSearchResult(authorsHistory, data?.authors);
        if (newAuthors != authorsHistory) {
          setAuthorsHistory(newAuthors);
        }
      } else {
        setAuthorsHistory(data?.authors);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  function handleSubmit(e: any) {
    e.preventDefault();
    if (query.current !== '') {
      router.push(`?q=${query.current}`);
    } else {
      router.push(`/search`);
    }
  }

  if (error) {
    return (
      <Layout title='Search - MyBook'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout title='Search - MyBook'>
      <Title>Search</Title>

      <form className='mt-2' onSubmit={handleSubmit}>
        <div className='flex items-end gap-2'>
          <LabeledInput
            wrapperClassName='w-full sm:max-w-sm'
            name='search'
            id='search'
            placeholder='Search Title, Author, ISBN'
            type='text'
            onChange={(e) => (query.current = e.target.value)}
          />
          <Button type='submit' value='Submit' className='mb-4 !py-2.5 px-5'>
            Search
          </Button>
        </div>
      </form>

      {search ? (
        <>
          {!data && <Text>Searching &#8220;{search}&#8221;...</Text>}

          {data?.books.length < 1 && data?.authors.length < 1 ? (
            <div className='rounded border border-red-500 p-3'>
              <p className='text-red-500'>{`No results for "${query.current || search}"`}</p>
            </div>
          ) : null}

          {data?.books.length > 0 ? (
            <>
              <Heading h3 className='mt-6'>
                Books
              </Heading>
              <div className='mt-2 space-y-4'>
                {data?.books?.map((item: any, index: number) => (
                  <BookListItem
                    key={index}
                    href={`/book/detail/${item.id}`}
                    image={item.image_small?.replace('SX50', 'SX150').replace('SY75', 'SX150')}
                    title={item.title}
                    published={item.published}
                  />
                ))}
              </div>
            </>
          ) : null}

          {data?.authors.length > 0 ? (
            <>
              <Heading h3 className='mt-6'>
                Authors
              </Heading>
              <div className='mt-2 grid grid-cols-1 gap-4 pb-4 min-[500px]:grid-cols-2 md:grid-cols-3'>
                {data?.authors?.map((item: any, index: number) => (
                  <AuthorListItem
                    key={index}
                    href={`/author/detail/${item.id}`}
                    image={item.image}
                    name={item.name}
                    web={item.web}
                  />
                ))}
              </div>
            </>
          ) : null}
        </>
      ) : booksHistory?.length > 0 || authorsHistory?.length > 0 ? (
        <>
          <div className='mt-6 flex items-center justify-between'>
            <Heading h2 className='!mb-0 text-[22px]'>
              Recent Search
            </Heading>
            <button
              onClick={resetAllSearchHistory}
              className='rounded text-[15px] font-medium text-red-500 hover:text-red-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-500'
            >
              Clear All
            </button>
          </div>

          {booksHistory?.length > 0 ? (
            <>
              <div className='mb-4 mt-6 flex items-center justify-between'>
                <Heading h3 className='!mb-0'>
                  Books
                </Heading>
                <button
                  onClick={resetBooksHistory}
                  className='rounded text-[15px] font-medium text-red-500 hover:text-red-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-500'
                >
                  Clear Books
                </button>
              </div>
              <div className='mt-2 space-y-4'>
                {booksHistory?.map((item: any, index: number) => (
                  <BookListItem
                    key={index}
                    href={`/book/detail/${item.id}`}
                    image={item.image_small?.replace('SX50', 'SX150').replace('SY75', 'SX150')}
                    title={item.title}
                    published={item.published}
                  />
                ))}
              </div>
            </>
          ) : null}

          {authorsHistory?.length > 0 ? (
            <>
              <div className='mb-4 mt-8 flex items-center justify-between'>
                <Heading h3 className='!mb-0'>
                  Authors
                </Heading>
                <button
                  onClick={resetAuthorsHistory}
                  className='rounded text-[15px] font-medium text-red-500 hover:text-red-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-500'
                >
                  Clear Authors
                </button>
              </div>
              <div className='mt-2 grid grid-cols-1 gap-4 pb-4 min-[500px]:grid-cols-2 md:grid-cols-3'>
                {authorsHistory?.map((item: any, index: number) => (
                  <AuthorListItem
                    key={index}
                    href={`/author/detail/${item.id}`}
                    image={item.image}
                    name={item.name}
                    web={item.web}
                  />
                ))}
              </div>
            </>
          ) : null}
        </>
      ) : null}
    </Layout>
  );
}
