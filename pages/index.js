import { Box, Divider } from "@mui/material";
import { Banners } from "../components/banners";
import { BookNow } from "../components/book-now";
import { Events } from "../components/events";
import { Navbar } from "../components/navbar";
import { Music } from "./../components/music";
import { ParallaxEffect } from "../components/parallax-effect";
import Head from 'next/head';

export default function Home() {
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
    <Banners />
    <Music />
    <ParallaxEffect img={"/parallax-1.jpg"} />
    <Events />
    <ParallaxEffect img={"/parallax-1.jpg"} />
    <BookNow />
    </Box>
  );
}
