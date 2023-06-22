import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@libs/supabase';
import books_genres from '@data/books_genres.json' assert { type: 'json' };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;

  switch (method) {
    case 'GET':
      if (!query.generate) {
        const { data } = await supabase.from('book_books_genres').select(`*`).order('id');
        res.status(200).send(JSON.stringify(data, null, 2));
      } else if (query.generate == 'true') {
        const { data, error } = await supabase.from('book_books_genres').insert(books_genres);
        res.status(200).json(data);
      } else {
        const { data } = await supabase
          .from('book_books_genres')
          .select(`*, book_quotes (*), book_quotes_books_genres (*)`)
          .eq('id', query.id)
          .order('id');
        res.status(200).json(data);
      }
      break;

    default:
      res.status(200).json('Method required');
      break;
  }
}
