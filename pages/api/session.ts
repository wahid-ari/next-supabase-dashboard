import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@libs/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;

  switch (method) {
    case 'GET':
      const { data } = await supabase.from('book_sessions').select(`*, book_users (username, name, type)`).order('id');
      res.status(200).json(data);
      break;

    case 'DELETE':
      if (!query.id) {
        const { data } = await supabase.from('book_sessions').select(`*`).order('id');
        for (const item of data) {
          const { error } = await supabase.from('book_sessions').delete().eq('id', item.id);
          if (error) {
            res.status(422).json({ error: error.message });
          }
        }
        res.status(200).json({ message: 'Success delete all session' });
      } else {
        const { error } = await supabase.from('book_sessions').delete().eq('id', query.id);
        if (error) {
          res.status(422).json({ error: error.message });
        }
        res.status(200).json({ message: 'Success delete session' });
      }

      break;

    default:
      res.status(200).json('Method required');
      break;
  }
}
