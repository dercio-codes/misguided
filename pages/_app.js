import Head from "next/head";
import Script from "next/script";
import "../styles/globals.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
      <title>Misguided Ent.</title>
      <link rel="icon" type="image/x-icon" href="/misguided-logo.jpg" />
      </Head>
      <body>
      <Component {...pageProps} />
      <ToastContainer toastStyle={{ backgroundColor: "#eee" , color:'#eee' }} />

      </body>
    </div>
  );
}

export default MyApp;
