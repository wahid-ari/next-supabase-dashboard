import { NextApiRequest, NextApiResponse } from 'next';
import books_genres from '@/data/books_genres.json';

import { supabase } from '@/libs/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;

  switch (method) {
    case 'GET':
      if (query.id) {
        const { data } = await supabase
          .from('book_books_genres')
          .select(`*, book_quotes (*), book_quotes_books_genres (*)`)
          .eq('id', query.id)
          .order('id');
        res.status(200).send(JSON.stringify(data, null, 2));
        // res.status(200).json(data);
        return;
      } else if (query.generate == 'true') {
        const { error } = await supabase.from('book_books_genres').insert(books_genres);
        if (error) {
          res.status(422).json({ message: error.message });
          return;
        }
        res.status(200).send(JSON.stringify({ message: 'Success Seeding Book Genre' }, null, 2));
        // res.status(200).json(data);
        return;
      } else {
        const { data } = await supabase.from('book_books_genres').select(`*`).order('id');
        res.status(200).send(JSON.stringify(data, null, 2));
        // res.status(200).json(data);
      }
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
