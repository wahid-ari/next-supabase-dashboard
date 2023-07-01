import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { BookOpenIcon, ColorSwatchIcon, UserGroupIcon } from '@heroicons/react/outline';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  ArcElement,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Bar, Doughnut, Pie } from 'react-chartjs-2';

import { populateData, options, optionsBarChart, optionsHorizontalBarChart } from '@utils/chartSetup';

import {
  useBookByAuthorData,
  useBookByGenreData,
  useCountsData,
  useTotalAuthorsData,
  useTotalBooksData,
  useTotalGenresData,
} from '@libs/swr';

import Layout from '@components/layout/Layout';
import Titles from '@components/systems/Title';
import Shimer from '@components/systems/Shimer';
import Text from '@components/systems/Text';
import Card from '@components/dashboard/Card';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  ArcElement,
  Tooltip,
  Filler,
  Legend
);

export default function Dashboard() {
  // const { data, error } = useCountsData();
  const { data: totalAuthors, error: errorTotalAuthors } = useTotalAuthorsData();
  const { data: totalBooks, error: errorTotalBooks } = useTotalBooksData();
  const { data: totalGenres, error: errorTotalGenres } = useTotalGenresData();
  const { theme } = useTheme();
  const { data: bookByGenre, error: errorBookByGenre } = useBookByGenreData();
  const { data: bookByAuthor, error: errorBookByAuthor } = useBookByAuthorData();

  const [dataBookByGenre, setDataBookByGenre] = useState(null);
  const [dataBookByAuthor, setDataBookByAuthor] = useState(null);

  const [windowWidth, setWindowWidth] = useState(0);
  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, [windowWidth]);

  useEffect(() => {
    if (bookByGenre !== undefined) setDataBookByGenre(populateData(bookByGenre, 'book'));
    if (bookByAuthor !== undefined) setDataBookByAuthor(populateData(bookByAuthor, 'book'));
  }, [bookByGenre, bookByAuthor]);

  if (
    // error ||
    errorTotalAuthors ||
    errorTotalBooks ||
    errorTotalGenres ||
    errorBookByAuthor ||
    errorBookByGenre
  ) {
    return (
      <Layout title='Dashboard - MyBook'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout
      title='Dashboard - MyBook'
      prefetch={[
        '/api/dashboard/total-authors',
        '/api/dashboard/total-books',
        '/api/dashboard/total-genres',
        '/api/statistics/book-by-author',
        '/api/statistics/book-by-genre',
      ]}
    >
      <Titles>Dashboard</Titles>

      <div className='mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3'>
        {totalAuthors ? (
          <Card
            title='Author'
            link='/author'
            count={totalAuthors.authors}
            icon={<UserGroupIcon />}
            data-testid='author-count'
          />
        ) : (
          <Shimer className='!h-24 w-full' />
        )}
        {totalBooks ? (
          <Card title='Book' link='/book' count={totalBooks.books} icon={<BookOpenIcon />} data-testid='book-count' />
        ) : (
          <Shimer className='!h-24 w-full' />
        )}
        {totalGenres ? (
          <Card
            title='Genre'
            link='/genre'
            count={totalGenres.genres}
            icon={<ColorSwatchIcon />}
            data-testid='genre-count'
          />
        ) : (
          <Shimer className='!h-24 w-full' />
        )}
      </div>
      {/* <div className='mt-8 grid grid-cols-1 gap-4 min-[350px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
        {data ? (
          <>
            <Card title='Author' link='/author' count={data.authors} icon={<UserGroupIcon />} />
            <Card title='Book' link='/book' count={data.books} icon={<BookOpenIcon />} />
            <Card title='Quote' link='/quote' count={data.quotes} icon={<AnnotationIcon />} />
            <Card title='Genre' link='/genre' count={data.genres} icon={<ColorSwatchIcon />} />
            <Card title='Tag' link='/tag' count={data.tags} icon={<CollectionIcon />} />
          </>
        ) : (
          <>
            <Shimer className='!h-24 w-full' />
            <Shimer className='!h-24 w-full' />
            <Shimer className='!h-24 w-full' />
            <Shimer className='!h-24 w-full' />
            <Shimer className='!h-24 w-full' />
          </>
        )}
      </div> */}

      <div className='mt-5 grid grid-cols-1 gap-5'>
        {dataBookByGenre ? (
          <div className='rounded-md border bg-white dark:border-neutral-800 dark:bg-neutral-900'>
            <div className='bg-neutral-100/80 p-3 dark:bg-[#1F1F1F]'>
              <Text.medium>Total Book by Genre</Text.medium>
            </div>
            <div className='m-auto w-72 py-3'>
              <Pie options={options} data={dataBookByGenre} />
            </div>
          </div>
        ) : (
          <Shimer className='!h-[350px] w-full' />
        )}

        <div className=''>
          {dataBookByAuthor ? (
            <div className='rounded-md border bg-white dark:border-neutral-800 dark:bg-neutral-900'>
              <div className='bg-neutral-100/80 p-3 dark:bg-[#1F1F1F]'>
                <Text.medium>Total Book by Author</Text.medium>
              </div>
              <div className='p-3'>
                <Bar options={optionsBarChart(theme)} data={dataBookByAuthor} height={windowWidth > 500 ? 100 : 250} />
              </div>
            </div>
          ) : (
            <Shimer className='!h-96 w-full' />
          )}
        </div>
      </div>
    </Layout>
  );
}