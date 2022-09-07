import { Box, Divider } from "@mui/material";
import { Banners } from "../components/banners";
import { BookNow } from "../components/book-now";
import { Events } from "../components/events";
import { Navbar } from "../components/navbar";
import { ParallaxEffect } from "../components/parallax-effect";


export default function Home() {
  return (
    <Box sx={{ overflowY:'auto' , background:'#111' }}>

    <Navbar />
    <Banners />
    <ParallaxEffect img={"/ykm-x-fest-1.jpg"} />
    <Events />
    <ParallaxEffect img={"/parallax-1.jpg"} />
    <BookNow />
    </Box>
  );
}
