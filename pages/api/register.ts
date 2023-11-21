import { NextApiRequest, NextApiResponse } from 'next';
import { compare, hash } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

import { supabase } from '@/libs/supabase';

const schema = z
  .object({
    name: z.string().min(5, { message: 'Name length minimal is 5' }),
    username: z
      .string()
      .min(5, { message: 'Username length minimal is 5' })
      .regex(/^[A-Za-z]+$/, { message: 'Username must be alphabet without space' }),
    password: z.string().min(8, { message: 'Password length minimal is 8' }),
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
      // TODO Docs https://github.com/colinhacks/zod/issues/1190#issuecomment-1171607138
      if (isValid.success == false) {
        res.status(422).json({ message: isValid.error.issues });
        return;
      }
      // if (!body.name) {
      //   res.status(422).json({ message: 'Name required' });
      //   return;
      // } else if (!body.username) {
      //   res.status(422).json({ message: 'Username required' });
      //   return;
      // } else if (!body.password) {
      //   res.status(422).json({ message: 'Password required' });
      //   return;
      // }
      else {
        const { data: userNameExist } = await supabase
          .from('admin')
          .select(`*`)
          .eq('username', body.username)
          .limit(1)
          .single();
        if (userNameExist === null) {
          // FIX this register logic
          // if username not exist, hash password and inset to db
          // const passwordHashed = await hash(body.password, 8);
          // const { data: insertUser } = await supabase.from('admin').insert([
          //   {
          //     username: body.username,
          //     name: body.name,
          //     type: 'user',
          //     password: passwordHashed,
          //   },
          // ]);
          // // if no error after inserting user
          // if (insertUser == null) {
          //   const { data: user } = await supabase
          //     .from('admin')
          //     .select(`*`)
          //     .eq('username', body.username)
          //     .limit(1)
          //     .single();
          //   const token = jwt.sign(
          //     {
          //       username: body.username,
          //       password: body.name,
          //     },
          //     process.env.NEXTAUTH_SECRET,
          //   );
          //   const { id, type } = user;
          //   const { username, name } = body;
          //   res.status(200).json({ id, type, username, name, token });
          res.status(200).json({ message: 'Success register' });
          return;
          // }
        } else {
          res.status(422).json({ message: 'Username already exist' });
        }
      }
      break;

    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

// switch (method) {
//   case "GET":
//     try {
//       if (!req.headers.authorization) {
//         return res.json({ message: "Please provide headers" });
//       }
//       const token = req.headers.authorization.split("Bearer ")[1];
//       if (!token) {
//         return res.json({ message: "Token not found" });
//       }
//       const user = jwt.verify(token, process.env.NEXTAUTH_SECRET);
//       if (!user) {
//         return res.json({ message: "Token not valid" });
//       }
//       const user_data = await User.aggregate([
//         {
//           $match: {
//             username: user.username,
//           },
//         },
//       ]);
//       if (!user_data[0]) {
//         return res.json({ message: "User not found" });
//       }
//       const isMatch = await compare(user.password, user_data[0].password);
//       if (!isMatch) {
//         return res.json({ message: "Token not valid" });
//       }
//       delete user_data[0].password;
//       return res.json(user_data[0]);
//     } catch (err) {
//       return res.json({ message: "Error on calling API" });
//     }
//   default:
//     return res.json({ message: "Only accepting GET method" });
// }
