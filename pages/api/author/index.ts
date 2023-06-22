import { NextApiRequest, NextApiResponse } from 'next';
import { supabase, getSessionToken, writeLogs } from '@libs/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body, query } = req;
  const header = req.headers.authorization;
  const token = req.headers.authorization?.split(' ')[1] || '';

  switch (method) {
    case 'GET':
      if (!query.id) {
        const { data } = await supabase.from('book_authors').select(`*`).order('id');
        res.status(200).json(data);
      } else if (query.id && query.seo) {
        const { data } = await supabase.from('book_authors').select(`name, bio`).eq('id', query.id).single();
        // https://nextjs.org/docs/api-reference/next.config.js/headers#cache-control
        res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
        res.status(200).json(data);
      } else {
        const { data }: any = await supabase
          .from('book_authors')
          .select(
            `*, book_quotes (id, author_id, quote), book_books (id, title, pages, language, published, link, image, image_small)`
          )
          .eq('id', query.id)
          .order('id');
        const { book_books, book_quotes } = data[0];
        delete data[0].book_books;
        delete data[0].book_quotes;
        const ready = {
          ...data[0],
          books: book_books,
          quotes: book_quotes,
        };
        // https://nextjs.org/docs/api-reference/next.config.js/headers#cache-control
        res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
        // res.status(200).json(data[0]);
        res.status(200).json(ready);
      }
      break;

    case 'POST':
      // Check session
      const sessionPost = await getSessionToken(res, header, token);
      if (sessionPost) {
        if (!body.name) {
          res.status(422).json({ error: 'Name required' });
        } else {
          const { error } = await supabase.from('book_authors').insert([
            {
              name: body.name,
              link: body.link,
              image: body.image,
              born: body.born,
              web: body.web,
              bio: body.bio,
            },
          ]);
          if (error) {
            res.status(422).json({ error: error.message });
          }
          // Write logs
          const errorLogs = await writeLogs(sessionPost.user_id, 'create', 'author');
          if (errorLogs) {
            res.status(422).json({ error: error.message });
          }
          res.status(200).json({ message: 'Success add author' });
        }
      }
      break;

    case 'PUT':
      // Check session
      const sessionPut = await getSessionToken(res, header, token);
      if (sessionPut) {
        if (!body.name) {
          res.status(422).json({ error: 'Name required' });
        } else {
          const { error } = await supabase
            .from('book_authors')
            .update({
              name: body.name,
              link: body.link,
              image: body.image,
              born: body.born,
              web: body.web,
              bio: body.bio,
            })
            .eq('id', body.id);
          if (error) {
            res.status(422).json({ error: error.message });
          }
          // Write logs
          const errorLogs = await writeLogs(sessionPut.user_id, 'update', 'author', body.id);
          if (errorLogs) {
            res.status(422).json({ error: error.message });
          }
          res.status(201).json({ message: 'Success update author' });
        }
      }
      break;

    case 'DELETE':
      // Check session
      const sessionDelete = await getSessionToken(res, header, token);
      if (sessionDelete) {
        if (!query.id) {
          res.status(422).json({ error: 'Id required' });
        } else {
          const { error } = await supabase.from('book_authors').delete().eq('id', query.id);
          if (error) {
            res.status(422).json({ error: error.message });
          }
          // Write logs
          const errorLogs = await writeLogs(sessionDelete.user_id, 'delete', 'author', query.id);
          if (errorLogs) {
            res.status(422).json({ error: error.message });
          }
          res.status(200).json({ message: 'Success delete author' });
        }
      }
      break;

    default:
      res.status(200).json('Method required');
      break;
  }
}
