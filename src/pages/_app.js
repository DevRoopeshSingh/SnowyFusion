import "../../styles/globals.css";
import { useRouter } from "next/router";
import Head from "next/head";
import WelcomeScreen from "../components/WelcomeScreen";
import LoadingSpinner from "../components/LoadingSpinner";
import useWelcomeScreen from "../hooks/useWelcomeScreen";
import { Roboto } from "next/font/google"; // Don't forget the font setup

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }) {
  const { showWelcome, handleContinue, isLoading } = useWelcomeScreen();
  const router = useRouter();

  // Show welcome screen only on homepage
  if (router.pathname !== "/" && !showWelcome) {
    return <Component {...pageProps} />;
  }

  return (
    <div className={roboto.className}>
      <Head>
        <meta
          name="description"
          content="Snowy Fusion Cafe - Order delicious treats online"
        />
      </Head>
      {isLoading ? (
        <LoadingSpinner aria-label="Loading cafe menu" />
      ) : showWelcome ? (
        <WelcomeScreen
          onContinue={handleContinue}
          menuCategories={pageProps.menuCategories || []}
        />
      ) : (
        <Component {...pageProps} />
      )}
    </div>
  );
}
