import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@libs/supabase';
import { hash, compare } from 'bcryptjs';

const admin_datas = [
  {
    name: 'Admin',
    username: 'admin',
    password: '',
    type: 'admin',
  },
  {
    name: 'Develop',
    username: 'develop',
    password: '',
    type: 'admin',
  },
  {
    name: 'User',
    username: 'user',
    password: '',
    type: 'user',
  },
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;

  switch (method) {
    case 'GET':
      if (!query.generate) {
        const { data } = await supabase.from('book_users').select(`*`).order('id');
        res.status(200).send(JSON.stringify(data, null, 2));
      } else if (query.generate == 'true') {
        const admin_data_hashed = [];
        for (const item of admin_datas) {
          let password_hashed = await hash(item.password, 8);
          admin_data_hashed.push({
            ...item,
            password: password_hashed,
          });
        }
        // const admin_data_original = [];
        // for (const item of admin_data_hashed) {
        //   let password_original = await compare('', item.password);
        //   admin_data_original.push({
        //     ...item,
        //     password: password_original,
        //   });
        // }
        const { data } = await supabase.from('book_users').insert(admin_data_hashed);
        res.status(200).json(data);
      } else {
        const { data } = await supabase.from('book_users').select(`*`).eq('id', query.id).order('id');
        res.status(200).json(data);
      }
      break;

    default:
      res.status(200).json('Method required');
      break;
  }
}
