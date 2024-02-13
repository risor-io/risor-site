import '../styles.css';
import { MantineProvider } from '@mantine/core';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import * as gtag from '../lib/gtag';
import { getHighlighter } from 'shiki';

export default function Nextra({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const router = useRouter();

  // On route change
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  // On initial page load
  useEffect(() => {
    gtag.pageview(window.location.pathname ? window.location.pathname : '/');
  }, []);

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: 'dark',
        globalStyles: (theme) => ({
          button: {
            backgroundColor: 'unset !important',
            backgroundImage: 'unset !important',
          },
        }),
      }}
    >
      <Component {...pageProps} />
    </MantineProvider>
  );
}
