import { NextApiRequest, NextApiResponse } from 'next';
import genres from '@/data/genres.json';

import { supabase } from '@/libs/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;

  switch (method) {
    case 'GET':
      if (!query.generate) {
        const { data } = await supabase.from('book_genres').select(`*`).order('id');
        res.status(200).send(JSON.stringify(data, null, 2));
        return;
      } else if (query.generate == 'true') {
        const { data } = await supabase.from('book_genres').insert(genres);
        res.status(200).json(data);
        return;
      } else {
        const { data } = await supabase
          .from('book_genres')
          .select(`*, book_books (*), book_quotes_genres (*)`)
          .eq('id', query.id)
          .order('id');
        res.status(200).json(data);
      }
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
