import { Box, Typography, Avatar, Grid, Button, Fade, Stack } from "@mui/material"
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade ,Pagination, Navigation } from "swiper";
// import required modules
// import { EffectFade, Navigation, Pagination } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { PulseLoader } from "react-spinners";
import { Socials } from "../socials";

export const Banners = () => {
    const [loading, setLoading] = useState(false);
    const artists = [
        {
            name: "Dj Shadzo",
            img: "/shadzo-2.jpeg",
            embedItem: <iframe onLoad={() => setLoading(false)} style={{ borderRadius: "12px", margin: '18px 0' }} src="https://open.spotify.com/embed/artist/5JuA3291INTaMk0R8xMkZK?utm_source=generator" width="100%" height="315" frameBorder="0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>,
            slogan: "If your girl dont know Shadzo don't dala"
        },
        {
            name: "YKM THEE MC",
            img: "/ykm-2.jpeg",
            embedItem: <iframe onLoad={() => setLoading(false)} style={{ borderRadius: "12px", margin: '18px 0' }} width="100%" height="315" src="https://www.youtube.com/embed/gy6gGT-G6ak" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy"></iframe>,
            slogan: "Mr Lovers and Friends."
        },
        {
            name: "Karlo Dj",
            img: "/Karlo-1.jpeg",
            embedItem: <iframe onLoad={() => setLoading(false)} style={{ borderRadius: "12px", margin: '18px 0' }} width="100%" height="315" src="https://www.youtube.com/embed/-J0fR8UMfIc" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>,
            slogan: "If your girl dont know Shadzo don't dala"
        }];
    const [active, setActive] = useState("");

    const handleArtistClick = async (artist) => {
        try {
            setLoading(true);
            setActive(artist);
        } catch (error) {
            alert(error)
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <Box sx={{ marginTop: '4.5%', background: '#222' }}>
            <Grid container >
                <Grid xs={12} md={5} sx={{ height: { lg: '91vh', xs: 'fit-content' }, padding: { lg: "52px 16px" }, background: '#111', display: 'flex', flexDirection: { xs: 'column', md: 'column' }, alignItems: 'center', justifyContent: 'space-evenly' }}>
                    <Typography variant="h3" width={"100%"} color={"#eee"} fontWeight={"600"} textAlign={"center"} sx={{ marginTop: { xs: '50px' } }}>Meet The Artists</Typography>
                    <Button onClick={() => setActive("")} sx={{ fontWeight: '600', fontSize: '16px', padding: '32px 0', padding: '18px auto 0px auto', margin: '18px auto', color: '#111', background: '#eee' }}>All</Button>

                    <Grid container>


                        {artists.map((artist, index) => {
                            return (
                                <Grid key={index} xs={4} md={12} sx={{ background: '', display: 'flex', alignItems: 'center' }}>
                                    <Button onClick={(e) => {
                                        e.preventDefault();
                                        handleArtistClick(artist);
                                    }} sx={{ width: { xs: "90%", md: '75%' }, fontWeight: active.name === artist.name ? "900" : '500', fontSize: '16px', padding: { xs: '16px 0', md: '32px 0' }, margin: '18px auto', background: '#eee', color: '#111', "&:hover": { color: '#eee' } }}>{artist.name}</Button>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Grid>
                <Grid xs={12} md={7} sx={{ height: { lg: 'fit-content', xs: 'fit-content' }, padding: { lg: "24px 16px" } , margin:'auto 0' }}>
                    {
                        active === "" ? (
                            // <Box sx={{ backgroundImage: 'url("/misguided-2.jpeg")', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', margin:'auto 0' ,height: {lg:'500px' , xs:'250px'} }}>

                            // </Box>
                            <SquadSlides />
                        ) : (
                            <Fade in={active} sx={{ width: '100%', background: 'rgba(255,255,255,.1)', height: '100%', padding: { lg: "16px" } }} >
                                <Box sx={{ padding: { lg: "2px 16px" } }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', padding: { xs: "16px 12px", md: "0px" } }}>

                                        <Avatar src={active.img} alt={active.name} sx={{ width: { lg: '120px', xs: "80px" }, height: { lg: '120px', xs: "80px" } , filter:"blur(0.3px)" }} ></Avatar>
                                        <Stack sx={{ margin: { xs: '0px 21px' } }}>
                                            <Typography variant="h6" color={"#eee"} fontWeight={"600"} textAlign={"start"}>{active.name}</Typography>
                                            <Typography variant="p" color={"#eee"} fontWeight={"300"} textAlign={"center"}>{active.slogan}</Typography>

                                        </Stack>
                                    </Box>

                                    {
                                        loading ? (
                                            <Box sx={{ height: '350px', width: '100%', background: 'yellow', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                <PulseLoader />
                                            </Box>
                                        )
                                            : (
                                                <Box sx={{ width: "100%", display: 'flex', alignItems: 'center', padding: { xs: "16px 12px", md: "0px" } }}>
                                                    {
                                                        active.embedItem
                                                    }
                                                </Box>
                                            )
                                    }
                                    <Box sx={{
                                        height: '48px',
                                        background: { xs: 'rgba(255,255,255,.1)', md: 'transparent' },
                                        display: 'flex',
                                        justifyContent: 'flex-end'
                                    }}>
                                        <Socials artist={active} />
                                    </Box>
                                </Box>
                            </Fade>
                        )
                    }
                </Grid>
            </Grid>
        </Box>
    )
}

export const SquadSlides = () => {
    return (
        <Box id="squad-slides">
            <Swiper
                spaceBetween={30}
                effect={"fade"}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                navigation={false}

                modules={[EffectFade, Autoplay, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <img src="/misguided-2.jpeg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/misguided-3.jpeg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/misguided-4.jpeg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/misguided-5.jpeg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/misguided-6.jpeg" />
                </SwiperSlide>



            </Swiper>
        </Box>
    );
}