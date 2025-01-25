// pages/_app.js

import "../../styles/globals.css";
import Head from "next/head";
import WelcomeScreen from "../components/WelcomeScreen";
import { useState, useEffect } from "react";

// Utility functions for storage operations
const hasVisited = () => {
  try {
    return (
      (window.localStorage &&
        window.localStorage.getItem("hasVisitedSnowyFusion")) ||
      (window.sessionStorage &&
        window.sessionStorage.getItem("hasVisitedSnowyFusion"))
    );
  } catch (error) {
    console.error("Error checking visit status:", error);
    return false;
  }
};

const setVisited = () => {
  try {
    if (window.localStorage) {
      window.localStorage.setItem("hasVisitedSnowyFusion", "true");
    } else if (window.sessionStorage) {
      window.sessionStorage.setItem("hasVisitedSnowyFusion", "true");
    }
  } catch (error) {
    console.error("Failed to set visit status:", error);
  }
};

export default function App({ Component, pageProps }) {
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    if (!hasVisited()) {
      setShowWelcome(true);
    }
  }, []);

  useEffect(() => {
    if (!showWelcome) {
      setVisited();
    }
  }, [showWelcome]);

  const handleContinue = () => setShowWelcome(false);

  return (
    <>
      <Head>
        <link rel="stylesheet" href="/fonts/local-fonts.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossorigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=YourFontFamily:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      {showWelcome ? (
        <WelcomeScreen
          onContinue={handleContinue}
          menuCategories={pageProps.menuCategories}
        />
      ) : (
        <Component {...pageProps} />
      )}
    </>
  );
}

export async function getStaticProps() {
  const menuCategories = require("../../public/data/menuCategories");
  console.log("Menu Category", menuCategories);
  return {
    props: {
      menuCategories,
    },
  };
}
