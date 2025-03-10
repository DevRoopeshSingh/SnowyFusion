import "@/styles/globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { CartProvider } from "@/context/CartContext";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Script from "next/script";
import { initGA, pageview } from "@/utils/analytics";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_GA_ID) {
      console.warn("Google Analytics ID is not set. Analytics will not load.");
      return;
    }

    initGA();
    const handleRouteChange = (url) => {
      pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <ThemeProvider>
      <CartProvider>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          onError={(e) => console.error("GA script failed to load:", e.message)}
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
          onError={(e) => console.error("GA initialization failed:", e.message)}
        />
        <Component {...pageProps} />
      </CartProvider>
    </ThemeProvider>
  );
}

// Remove getInitialProps to enable Automatic Static Optimization
// MyApp.getInitialProps = async (appContext) => {
//   const { Component, ctx } = appContext;
//   let pageProps = {};

//   if (Component.getInitialProps) {
//     pageProps = await Component.getInitialProps(ctx);
//   }

//   return { pageProps };
// };

export default MyApp;