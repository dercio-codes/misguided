import Head from "next/head";
import Script from "next/script";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
      </Head>
      <body>
      <Component {...pageProps} />
      </body>
    </div>
  );
}

export default MyApp;
