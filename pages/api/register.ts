import { NextApiRequest, NextApiResponse } from 'next';
import { compare, hash } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

import { supabase } from '@/libs/supabase';

const schema = z
  .object({
    name: z.string().min(5, { message: 'Name length minimal is 3' }),
    username: z
      .string()
      .min(5, { message: 'Username length minimal is 3' })
      .regex(/^[A-Za-z0-9]+$/, { message: 'Username must be alphabet and numeric without space' }),
    password: z
      .string()
      .min(8, { message: 'Password length minimal is 8' })
      // .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*()\-_+=.{}\[\]|\\;:'",<.>/?]).{8,}$/, {
      //   message: 'Should contain small, capital, number and special character',
      // }),
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*()\-_+=]).{8,}$/, {
        message: 'Should contain small, capital, number and special character',
      })
      .refine((s) => !s.includes(' '), {
        message: 'Password can not contain space',
      }),
    // REGEX example https://stackoverflow.com/a/59117568
    // ^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$
    // Should contain at least a capital letter
    // Should contain at least a small letter
    // Should contain at least a number
    // Should contain at least a special character
    // And minimum length
    confirm_password: z.string().min(8, { message: 'Confirm Password length minimal is 8' }),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ['confirm_password'],
    message: 'Oops! Password doesnt match',
  });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;

  // async function pass() {
  //   let hashed = await hash('password', 8);
  //   // save hashed to db
  //   console.log(hashed)
  //   // compare hashed from db and password from a form that submitted
  //   let isMatch = await compare(form.password, hashed);
  //   console.log(isMatch)
  // }
  // pass()

  // const token = jwt.sign(
  //   {
  //     username: data.username,
  //     password: data.name,
  //   },
  //   process.env.NEXTAUTH_SECRET
  // );
  // const user = jwt.verify(token, process.env.NEXTAUTH_SECRET);

  switch (method) {
    case 'POST':
      const isValid = schema.safeParse(body);
      if (!isValid.success) {
        res.status(422).json({ message: isValid?.error?.issues });
        return;
      } else {
        const { data: userNameExist } = await supabase
          .from('book_users')
          .select(`*`)
          .eq('username', body.username)
          .limit(1)
          .single();
        // if username not exist,
        if (userNameExist === null) {
          // if username not exist, hash password and inset to db
          const passwordHashed = await hash(body.password, 8);
          const { data: insertUser } = await supabase.from('book_users').insert([
            {
              username: body.username,
              name: body.name,
              type: 'user',
              password: passwordHashed,
            },
          ]);
          // if no error after inserting user
          // get user detail to create token
          // if (insertUser == null) {
          //   const { data: user } = await supabase
          //     .from('book_users')
          //     .select(`*`)
          //     .eq('username', body.username)
          //     .limit(1)
          //     .single();
          //   const { id, type } = user;
          //   const token = jwt.sign(
          //     {
          //       id: id,
          //       username: body.username,
          //       name: body.name,
          //       type: type,
          //     },
          //     process.env.NEXTAUTH_SECRET,
          //   );
          //   const { username, name } = body;
          //   const { error: errorSession } = await supabase.from('book_sessions').insert({ user_id: id, token: token });
          //   if (errorSession) console.error('error inserting session', errorSession);
          //   res.status(200).json({ id, type, username, name, token });
          // }
          // if no error after inserting user
          if (insertUser == null) {
            res.status(200).json({ message: 'Success register' });
            return;
          }
          res.status(422).json({ message: 'Failed to register' });
        } else {
          res.status(422).json({ message: 'Username already exist' });
          return;
        }
      }
      break;

    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
