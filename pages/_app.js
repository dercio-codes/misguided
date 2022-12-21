import Head from "next/head";
import Script from "next/script";
import "../styles/globals.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { AudipPLayer } from "./../components/AudioPlayer"
// import { storage , googleProvider , facebookProvider , auth , db } from "./../../firebase/firebaseConfig";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { query, doc ,  collection, addDoc , setDoc, getDocs, where } from "firebase/firestore";
import React , {useState} from "react";

export const OpenSongContext = React.createContext({})
function MyApp({ Component, pageProps }) {

  const [open , setOpen] = useState({})
  console.log(setOpen)
  return (
    <OpenSongContext.Provider value={{ open , setOpen }}>
    <main>
      <Head>
        <link rel="icon" sizes="32x32" type="image/x-icon" href="/misguided-logo.ico"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <meta property="og:type" content="article" />

<meta property="og:title" content="Misguided Ent." />

<meta property="og:description" content="Misguided Entertainment is a company able to assist in planning, organizing, and aiding in all the small details that assist in making your event successful." />

<meta property="og:image" content="www.misgudedsa.co.za/misguided-logo.jpg" />

<meta property="og:url" content="www.misgudedsa.co.za" />

<meta property="og:site_name" content="Misguided Ent." />
      </Head>
      <body>
      <Component {...pageProps} />
      <ToastContainer toastStyle={{ backgroundColor: "#eee" , color:'#eee' }} />
      <AudipPLayer />
      </body>
    </main>
    </OpenSongContext.Provider>
  );
}

export default MyApp;
