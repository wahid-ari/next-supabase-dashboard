import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import nookies from 'nookies';
import axios from 'axios';
import { getSession, signOut } from 'next-auth/react';

export default function Logout() {
  const router = useRouter();
  const [status, setStatus] = useState(false);

  async function postLogout() {
    try {
      const session: any = await getSession();
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/logout`, {
        user_id: session?.id,
        token: session?.token,
      });
      if (res.status == 200) {
        signOut({ callbackUrl: '/' });
        nookies.destroy(null, '__Secure-next-auth.session-token');
        nookies.destroy(null, 'next-auth.session-token');
      } else {
        signOut({ callbackUrl: '/' });
        nookies.destroy(null, '__Secure-next-auth.session-token');
        nookies.destroy(null, 'next-auth.session-token');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setStatus(true);
      router.push('/');
    }
  }

  useEffect(() => {
    postLogout();
  });

  useEffect(() => {
    if (status) {
      document.cookie = '__Secure-next-auth.session-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
      document.cookie = 'next-auth.session-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    }
  }, [status]);

  return '';
}

// export default function Logout() {
//   const router = useRouter();
//   const [status, setStatus] = useState(false);
//   const { id, token } = nookies.get(null, 'token');

//   async function postLogout() {
//     const res = await axios.post(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/logout`, {
//       user_id: id,
//       token: token,
//     });
//     if (res.status == 200) {
//       setStatus(true);
//       nookies.destroy(null, 'id');
//       nookies.destroy(null, 'username');
//       nookies.destroy(null, 'name');
//       nookies.destroy(null, 'type');
//       nookies.destroy(null, 'token');
//       router.push('/');
//     }
//   }

//   useEffect(() => {
//     // if token exist and user visit /logout, do logout session
//     if (token) {
//       postLogout();
//     }
//     // if status true after logout session make sure to delete cookie
//     if (status) {
//       document.cookie = 'id=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
//       document.cookie = 'username=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
//       document.cookie = 'name=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
//       document.cookie = 'type=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
//       document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
//     }
//     // if no token redirect to '/'
//     // if (!token && status == false) {
//     //   router.push('/');
//     // }
//     // });
//   }, [token, status]);

//   return '';
// }
