import { NextApiRequest, NextApiResponse } from 'next';
import { supabase, getSessionToken, writeLogs } from '@libs/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body, query } = req;
  const header = req.headers.authorization;
  const token = req.headers.authorization?.split(' ')[1] || '';

  switch (method) {
    case 'GET':
      if (!query.id) {
        const { data } = await supabase
          .from('book_books')
          .select(`id, author_id, title, language, pages, published, link, image, book_authors (id, name)`)
          .order('id');
        res.status(200).json(data);
      } else if (query.id && query.seo) {
        const { data } = await supabase.from('book_books').select(`title, description`).eq('id', query.id).single();
        // https://nextjs.org/docs/api-reference/next.config.js/headers#cache-control
        res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
        res.status(200).json(data);
      } else {
        const { data: genres } = await supabase.from('book_genres').select(`*`).order('id');
        const { data: books_genres } = await supabase
          .from('book_books_genres')
          .select(`*`)
          .eq('book_id', query.id)
          .order('id');
        const { data: books } = await supabase
          .from('book_books')
          .select(`*, book_authors (id, name, image, bio, web)`)
          .eq('id', query.id)
          .order('id');

        const books_with_genres = [];
        for (const books_genre of books_genres) {
          for (const genre of genres) {
            if (books_genre.genre_id == genre.id) {
              books_with_genres.push({
                id: genre.id,
                name: genre.name,
              });
            }
          }
        }
        // https://nextjs.org/docs/api-reference/next.config.js/headers#cache-control
        res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
        res.status(200).json({ ...books[0], genre_array: books_with_genres });
      }
      break;

    case 'POST':
      // Check session
      const sessionPost = await getSessionToken(res, header, token);
      if (sessionPost) {
        if (!body.title) {
          res.status(422).json({ error: 'Title required' });
        } else {
          // get genre string from array
          let genre_string = ',';
          body.genre?.forEach((item: any) => {
            genre_string = genre_string + ', ' + item.label;
          });
          let clean_genre_string = genre_string.replace(',,', '').replace(' ', '');
          // insert book
          const { data, error } = await supabase
            .from('book_books')
            .insert([
              {
                author_id: body.author_id,
                title: body.title,
                isbn: body.isbn,
                language: body.language,
                pages: body.pages,
                published: body.published ? body.published : null,
                link: body.link,
                image: body.image,
                description: body.description,
                genre: clean_genre_string == ',' ? '' : clean_genre_string,
              },
            ])
            .select();
          if (error) {
            res.status(422).json({ error: error.message });
          }
          // get book id after inserting
          const bookId = data[0].id;
          // if new book have genre
          if (body.genre?.length > 0) {
            // create array of genre of a book
            let genre = [];
            body.genre.forEach((item: any) => {
              genre.push({
                book_id: bookId,
                genre_id: item.value,
              });
            });
            // insert genre of a book to book_books_genres table
            const { error } = await supabase.from('book_books_genres').insert(genre);
            if (error) {
              res.status(422).json({ error: error.message });
            }
          }
          // Write logs
          const errorLogs = await writeLogs(sessionPost.user_id, 'create', 'book');
          if (errorLogs) {
            res.status(422).json({ error: error.message });
          }
          res.status(200).json({ message: 'Success add book' });
        }
      }
      break;

    case 'PUT':
      // Check session
      const sessionPut = await getSessionToken(res, header, token);
      if (sessionPut) {
        if (!body.title) {
          res.status(422).json({ error: 'Title required' });
        } else {
          // get genre string from array
          let genre_string = ',';
          body.genre.forEach((item: any) => {
            genre_string = genre_string + ', ' + item.label;
          });
          let clean_genre_string = genre_string.replace(',,', '').replace(' ', '');
          // update book
          const { error } = await supabase
            .from('book_books')
            .update({
              author_id: body.author_id,
              title: body.title,
              isbn: body.isbn,
              language: body.language,
              pages: body.pages,
              published: body.published ? body.published : null,
              link: body.link,
              image: body.image,
              description: body.description,
              genre: clean_genre_string,
            })
            .eq('id', body.id);
          if (error) {
            res.status(422).json({ error: error.message });
          }
          // delete genre related to edited book
          const { error: errorBooksGenres } = await supabase.from('book_books_genres').delete().eq('book_id', body.id);
          if (errorBooksGenres) {
            res.status(422).json({ error: errorBooksGenres.message });
          }
          // if edited book have genre
          if (body.genre?.length > 0) {
            // create array of genre of a edited book
            let genre = [];
            body.genre.forEach((item: any) => {
              genre.push({
                book_id: body.id,
                genre_id: item.value,
              });
            });
            // insert genre of a edited book to book_books_genres table
            const { error } = await supabase.from('book_books_genres').insert(genre);
            if (error) {
              res.status(422).json({ error: error.message });
            }
          }
          // Write logs
          const errorLogs = await writeLogs(sessionPut.user_id, 'update', 'book', body.id);
          if (errorLogs) {
            res.status(422).json({ error: error.message });
          }
          res.status(201).json({ message: 'Success update book' });
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
          // delete genre related to book in book_books_genres table
          const { error: errorBooksGenres } = await supabase.from('book_books_genres').delete().eq('book_id', query.id);
          const { error } = await supabase.from('book_books').delete().eq('id', query.id);
          if (error || errorBooksGenres) {
            res.status(422).json({ error: error.message });
          }
          // Write logs
          const errorLogs = await writeLogs(sessionDelete.user_id, 'delete', 'book', query.id);
          if (errorLogs) {
            res.status(422).json({ error: error.message });
          }
          res.status(200).json({ message: 'Success delete book' });
        }
      }
      break;

    default:
      res.status(200).json('Method required');
      break;
  }
}
