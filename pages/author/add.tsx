import { useState } from 'react';
import { useRouter } from 'next/router';
import { mutate } from 'swr';
import axios from 'axios';
import useToast from '@hooks/useToast';
import Layout from '@components/layout/Layout';
import Title from '@components/systems/Title';
import LabeledInput from '@components/systems/LabeledInput';
import Button from '@components/systems/Button';
import TextArea from '@components/systems/TextArea';
import nookies from 'nookies';

export async function getServerSideProps(context: any) {
  // const cookies = nookies.get(context);
  // if (!cookies.token) {
  //   return {
  //     redirect: {
  //       destination: '/login',
  //     },
  //   };
  // }
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default function Author() {
  const { updateToast, pushToast } = useToast();
  const [createItem, setCreateItem] = useState({
    name: '',
    link: '',
    image: '',
    born: '',
    web: '',
    bio: '',
  });
  const router = useRouter();

  async function handleSave() {
    const toastId = pushToast({
      message: 'Creating author',
      isLoading: true,
    });
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/author`, createItem);
      if (res.status == 200) {
        updateToast({ toastId, message: res?.data?.message, isError: false });
        router.push('/author');
      }
    } catch (error) {
      console.error(error);
      updateToast({ toastId, message: error?.response?.data?.error, isError: true });
    } finally {
      mutate(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/author`);
    }
  }

  return (
    <Layout title='Create Author - MyBook'>
      <div className='mb-6 flex flex-wrap items-center justify-between gap-y-3'>
        <Title>Create Author</Title>
      </div>

      <div className='max-w-lg'>
        <LabeledInput
          label='Author Name'
          type='text'
          name='name'
          value={createItem.name}
          onChange={(e) => setCreateItem({ ...createItem, name: e.target.value })}
          placeholder='Author Name'
        />

        <LabeledInput
          label='GoodReads Profile URL (Optional)'
          type='text'
          name='goodreads'
          value={createItem.link}
          onChange={(e) => setCreateItem({ ...createItem, link: e.target.value })}
          placeholder='https://www.goodreads.com/author/show/153394.Suzanne_Collins'
        />

        <LabeledInput
          label='Image URL (Optional)'
          type='text'
          name='image'
          value={createItem.image}
          onChange={(e) => setCreateItem({ ...createItem, image: e.target.value })}
          placeholder='https://images.gr-assets.com/authors/1630199330p5/153394.jpg'
        />

        <LabeledInput
          label='Born (Optional)'
          type='text'
          name='youtube'
          value={createItem.born}
          onChange={(e) => setCreateItem({ ...createItem, born: e.target.value })}
          placeholder='The United States'
        />

        <LabeledInput
          label='Web URL (Optional)'
          type='text'
          name='web'
          value={createItem.web}
          onChange={(e) => setCreateItem({ ...createItem, web: e.target.value })}
          placeholder='http://suzannecollins.com'
        />

        <TextArea
          label='Bio (Optional)'
          name='bio'
          value={createItem.bio}
          onChange={(e) => setCreateItem({ ...createItem, bio: e.target.value })}
          placeholder='Author Bio'
        />

        <Button.success onClick={handleSave} className='w-full'>
          Save
        </Button.success>
      </div>
    </Layout>
  );
}
