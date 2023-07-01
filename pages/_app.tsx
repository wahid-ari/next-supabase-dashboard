import { AppProps } from 'next/app';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import { GlobalProvider } from '@context/GlobalContext';
import { AxiosProvider } from '@context/AxiosContext';

import '@styles/globals.css';
import '@styles/prism.css';

// Show progress on All Pages
// import Router from 'next/router';

// Router.events.on('routeChangeStart', () => NProgress.start());
// Router.events.on('routeChangeComplete', () => NProgress.done());
// Router.events.on('routeChangeError', () => NProgress.done());

const inter = Inter({ subsets: ['latin'] });

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  function handleStart(url: string) {
    let splitUrl = url.split('/');
    // Show progress only in Detail Pages
    if (splitUrl.includes('detail')) {
      NProgress.start();
    }
  }
  const handleStop = () => NProgress.done();

  useEffect(() => {
    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router]);

  return router.pathname == '/login' || router.pathname == '/register' ? (
    <>
      <Toaster
        gutter={4}
        toastOptions={{
          style: {
            maxWidth: 380,
            padding: '2px 4px',
          },
        }}
      />
      <Component {...pageProps} />
    </>
  ) : (
    <ThemeProvider attribute='class' storageKey='theme' enableSystem={false} defaultTheme='light'>
      <GlobalProvider>
        <AxiosProvider>
          <main className={inter.className}>
            <Toaster
              gutter={4}
              toastOptions={{
                style: {
                  maxWidth: 380,
                  padding: '2px 4px',
                },
              }}
            />
            <Component {...pageProps} />
          </main>
        </AxiosProvider>
      </GlobalProvider>
    </ThemeProvider>
  );
}

export default MyApp;
