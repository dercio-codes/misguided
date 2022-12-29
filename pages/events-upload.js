import { Box, Divider } from "@mui/material";
import { Banners } from "../components/banners";
import { BookNow } from "../components/book-now";
import UploadEvents from "../components/upload/upload-events";
import { Navbar } from "../components/navbar";
import { Music } from "./../components/music";
import { ParallaxEffect } from "../components/parallax-effect";
import Head from 'next/head';

export default function EventsUpload() {
  return (
    <Box sx={{ overflowY:'auto' , background:'#111' }}>
      <Head>
      <title>Misguided Ent. | Home
      </title>
      <meta
          name="description"
          content="Misguided Entertainment is a company able to assist in planning, organizing, and aiding in all the small details that assist in making your event successful."
          key="desc"
        />
        <link rel="icon" sizes="32x32" type="image/x-icon" href="/misguided-logo.ico"/>
      </Head>
    <Navbar />
    <UploadEvents />
   
    </Box>
  );
}
