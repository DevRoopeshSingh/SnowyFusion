import '@/styles/globals.css'
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { initGA, pageview } from '@/utils/analytics';

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    // Initialize GA
    initGA();

    // Track page views
    const handleRouteChange = (url) => {
      pageview(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <ThemeProvider>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <Component {...pageProps} />
    </ThemeProvider>
  );
} 