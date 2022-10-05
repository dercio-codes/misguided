import { Box, Typography, Avatar, Grid, Button, Fade, Stack } from "@mui/material"
import React, { useRef, useState } from "react";
import EastIcon from '@mui/icons-material/East';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination, Navigation } from "swiper";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { PulseLoader } from "react-spinners";
import { Socials } from "../socials";
import Link from "next/link";

export const Banners = () => {
    const [loading, setLoading] = useState(false);
    const artists = [
        {
            name: "Dj Shadzo",
            img: "/shadzo-2.jpeg",
            artistPageLink:'/shadzo',
            embedItem: <iframe onLoad={() => setLoading(false)} style={{ borderRadius: "12px", margin: '18px 0' }} src="https://open.spotify.com/embed/artist/5JuA3291INTaMk0R8xMkZK?utm_source=generator" width="100%" height="315" frameBorder="0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>,
            slogan: "If your girl don't know Shadzo don't dala."
        },
        {
            name: "Karlo Dj",
            img: "/Karlo-1.jpeg",
            artistPageLink:'/karlo',
            embedItem: <iframe onLoad={() => setLoading(false)} style={{ borderRadius: "12px", margin: '18px 0' }} width="100%" height="315" src="https://www.youtube.com/embed/-J0fR8UMfIc" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>,
            slogan: "Old School RnB and Classic Jams."
        },
        {
            name: "YKM THEE MC",
            img: "/ykm-2.jpeg",
            artistPageLink:'/ykm',
            embedItem: <iframe onLoad={() => setLoading(false)} style={{ borderRadius: "12px", margin: '18px 0' }} width="100%" height="315" src="https://www.youtube.com/embed/gy6gGT-G6ak" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy"></iframe>,
            slogan: "Mr Lovers and Friends."
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
        <Box sx={{ marginTop: '50px', background: '#222' }} id="artists">
            <Grid container >
                <Grid item xs={12} lg={5} sx={{ height: { lg: '91vh', xs: '50vh' , md:'80vh' }, padding: { lg: "52px 16px" }, background: '#111', display: 'flex', flexDirection: { xs: 'column', md: 'column' }, alignItems: 'center', justifyContent: 'space-evenly' }}>
                    <Typography variant="h3" width={"100%"} color={"#eee"} fontWeight={"600"} textAlign={"center"} sx={{ marginTop: { xs: '50px' } }}>Meet The Artists</Typography>
                    <Button onClick={() => setActive("")} sx={{ fontWeight: '600', fontSize: '16px', padding: '32px 0', padding: '18px auto 0px auto', margin: '18px auto', color: '#111', background: '#eee' }}>All</Button>

                    <Grid container>


                        {artists.map((artist, index) => {
                            return (
                                <Grid item key={index} xs={4} md={12} sx={{ background: '', display: 'flex', alignItems: 'center' }}>
                                    <Button onClick={(e) => {
                                        e.preventDefault();
                                        handleArtistClick(artist);
                                    }} sx={{ width: { xs: "90%", md: '75%' }, fontWeight:  active.name === artist.name ? "900" : '500', fontSize: {xs : artist.name === "YKM THEE MC" ? '0.8rem' : '16px' ,sm:'16px'}, padding: { xs: artist.name === "YKM THEE MC" ? '18px 0' : '16px 0', md: '32px 0' }, margin: '18px auto', background: '#eee', color: '#111', "&:hover": { color: '#eee' } }}>{artist.name}</Button>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Grid>
                <Grid item xs={12} lg={7} sx={{ height: { lg: 'fit-content', xs: 'fit-content' }, padding: { lg: "24px 16px" }, margin: 'auto 0' }}>
                    {
                        active === "" ? (
                            <Box sx={{ height: { xs: '50vh', md: 'fit-content' }, background: '' }}>

                                <SquadSlides />
                            </Box>
                        ) : (
                            <Fade in={active} sx={{ width: '100%', background: 'rgba(1,1,1,.3)', height: '100%', padding:  "21px 8px"  }} >
                                <Box sx={{ padding: { lg: "2px 16px" } }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', padding: { xs: "16px 12px", md: "0px" } , width:'100%' , background:'' }}>

                                        <Avatar src={active.img} alt={active.name} sx={{ width: { lg: '120px', xs: "90px" }, height: { lg: '120px', xs: "90px" }, filter: "blur(0.3px)" }} ></Avatar>
                                        <Stack sx={{ margin: { xs: '0px 21px' } , width:'100%' }}>
                                            <Typography variant="h6" color={"#eee"} fontWeight={"600"} textAlign={"start"}>{active.name}</Typography>
                                           
                                           <Grid container>
                                           <Grid item xs={12} lg={6} >
                                            <Typography variant="p" color={"#eee"} fontWeight={"300"} >{active.slogan}</Typography>

                                           </Grid>
                                           <Grid item xs={12} lg={6} sx={{ alignItems:'flex-end'  , margin:{ xs:"8px 0 0" , md:'0'} , height:{ xs:'fit-content' , md:'60px'} , display:'flex' , justifyContent:'flex-end'  }}>

                                            <Typography textAlign={"end"} fontSize={"13px"} fontWeight={"300"} sx={{ scale:'0.9',transition:'100ms',color:"#eee"  , "&:hover":{ scale:'0.95' , textDecoration:'underline' ,color:"#40e0d0"  } }} >
                                                <Link href={active.artistPageLink}>
                                                    <a style={{  display:'flex' , alignItems:'center' , }}>
                                                       <Typography sx={{ margin:{ xs:0, md:'0 8px'} }}>
                                                         See more about {active.name}
                                                        </Typography>
                                                        <EastIcon sx-={{ color:'#eee' , fontWeight:600 , margin:'0 8px' }} />
                                                    </a>
                                                </Link>
                                            </Typography  >
                                           </Grid>

                                           </Grid>
                                           
                                            {/* <Box sx={{ display:'flex' , alignItems:{ xs:"flex-start", md:'center'} , justifyContent:'space-between' , width:'100%' , background:'' , flexDirection:{xs:'column' , md:'row'}}}>

                                            </Box> */}
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
        <Box id="squad-slides" sx={{ margin: 'auto 0' }}>
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