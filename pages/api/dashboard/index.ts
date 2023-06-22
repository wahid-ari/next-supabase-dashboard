import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@libs/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      const { data: authors } = await supabase.from('book_authors').select(`id`, { count: 'exact' });
      const { data: books } = await supabase.from('book_books').select(`id`, { count: 'exact' });
      const { data: quotes } = await supabase.from('book_quotes').select(`id`, { count: 'exact' });
      const { data: tags } = await supabase.from('book_tags').select(`id`, { count: 'exact' });
      const { data: genres } = await supabase.from('book_genres').select(`id`, { count: 'exact' });

      // const { count: authors } = await supabase.from('book_authors').select(`*`, { count: 'exact', head: true });
      // const { count: books } = await supabase.from('book_books').select(`*`, { count: 'exact', head: true });
      // const { count: quotes } = await supabase.from('book_quotes').select(`*`, { count: 'exact', head: true });
      // const { count: tags } = await supabase.from('book_tags').select(`*`, { count: 'exact', head: true });
      // const { count: genres } = await supabase.from('book_genres').select(`*`, { count: 'exact', head: true });
      // https://nextjs.org/docs/api-reference/next.config.js/headers#cache-control
      res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
      // res.status(200).json({
      //   authors: authors,
      //   books: books,
      //   quotes: quotes,
      //   genres: genres,
      //   tags: tags,
      // });
      res.status(200).json({
        authors: authors.length,
        books: books.length,
        quotes: quotes.length,
        genres: genres.length,
        tags: tags.length,
      });
      break;

    default:
      res.status(200).json('Method required');
      break;
  }
}
