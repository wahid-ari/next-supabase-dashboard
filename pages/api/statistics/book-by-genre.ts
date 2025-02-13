import { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from '@/libs/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      const { data: books_genres } = await supabase.from('book_books_genres').select(`*`).order('id');
      const { data: genres } = await supabase.from('book_genres').select(`*`).order('id');
      // Make an array of object structure
      let items = [];
      for (const genre of genres) {
        items.push({
          id: genre.id,
          label: genre.name,
          total: 0,
        });
      }
      // console.log(items)
      // [
      //   { id: 1, label: 'Art', total: 0 },
      //   { id: 2, label: 'Biography', total: 0 }
      // ]
      // Count total book that have same genre
      let result = [];
      for (const item of items) {
        let filtered = books_genres.filter((i) => i.genre_id == item.id);
        result.push({
          ...item,
          total: filtered.length,
        });
      }
      // console.log(result);
      // [
      //   { id: 1, label: 'Art', total: 1 },
      //   { id: 2, label: 'Biography', total: 9 }
      // ]
      let sorted = result.sort((a: any, b: any) => b.total - a.total).slice(0, 10);
      res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
      res.status(200).json(sorted);
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
