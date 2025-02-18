import { NextApiRequest, NextApiResponse } from 'next';
import { compare, hash } from 'bcryptjs';

import { supabase } from '@/libs/supabase';

// set Password before seed user
const admins = [
  {
    name: 'Admin',
    username: 'admin',
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

async function hashPassword() {
  const admins_hashed = [];
  // Hashing Password
  for (const item of admins) {
    let password_hashed = await hash(item.password, 8);
    admins_hashed.push({
      ...item,
      password: password_hashed,
    });
  }
  // Compare Password
  // const admin_data_original = [];
  // for (const item of admins_hashed) {
  //   let password_original = await compare('', item.password);
  //   admin_data_original.push({
  //     ...item,
  //     password: password_original,
  //   });
  // }
  return admins_hashed;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;

  switch (method) {
    case 'GET':
      if (query.id) {
        const { data } = await supabase
          .from('book_users')
          .select(`id, name, username, type`)
          .eq('id', query.id)
          .order('id');
        res.status(200).send(JSON.stringify(data, null, 2));
        // res.status(200).json(data);
        return;
      } else if (query.generate == 'true') {
        const admins_hashed = await hashPassword();
        const { data, error } = await supabase
          .from('book_users')
          .insert(admins_hashed)
          .select(`id, name, username, type`);
        if (error) {
          res.status(422).json({ message: error.message });
          return;
        }
        res.status(200).send(JSON.stringify(data, null, 2));
        // res.status(200).json(data);
        return;
      } else if (query.clean == 'true') {
        // select current users id
        const { data: selectUsers } = await supabase.from('book_users').select('id').order('id');
        // convert to array of id [1, 2, 3]
        let user_ids = selectUsers.map((item) => item.id);
        // delete current users
        const { error: errorDelete } = await supabase.from('countries').delete().in('id', user_ids);
        if (errorDelete) {
          res.status(422).json({ message: errorDelete.message });
          return;
        }
        // seed users
        const admins_hashed = await hashPassword();
        const { data, error } = await supabase
          .from('book_users')
          .insert(admins_hashed)
          .select(`id, name, username, type`);
        if (error) {
          res.status(422).json({ message: error.message });
          return;
        }
        res.status(200).send(JSON.stringify(data, null, 2));
        // res.status(200).json(data);
        return;
      } else {
        const { data } = await supabase.from('book_users').select(`id,name,username,type`).order('id');
        res.status(200).send(JSON.stringify(data, null, 2));
        // res.status(200).json(data);
      }
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
