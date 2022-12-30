import { Box, Typography, Avatar, Grid, Button, Fade, Stack , Divider } from "@mui/material"
import React, { useRef, useState } from "react";
import EastIcon from '@mui/icons-material/East';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';

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

        <Box id="Banners" sx={{ padding:'0' }}>
        <Box sx={{  minHeight:{ xs:'50vh' , lg:"65vh" } ,  background:'rgba(1,1,1,.05)' , width:'100%' , padding:'' }}>
        <Box sx={{  height:{ xs:'50vh' , lg:"65vh" } ,  
                    backgroundImage:'url("/collage.jpg")' , 
                    backgroundPosition:'center' , 
                    backgroundAttachment: "fixed",
                    width:'100%' , padding:'' , }}>

        <Box sx={{ height:{ xs:'50vh' , lg:"65vh" } , background:'rgba(1,1,1,.85)' , margin:'auto' , width:'100%' ,}}>
            <Grid container sx={{ height:'100%' }}>
            <Grid item xs={12} sx={{ display:'flex' , padding:'2.5rem' , flexDirection:'column' , alignItems:'center' , justifyContent:'center' }} >
                <Box data-aos="zoom-in" data-aos-duration="3000">
                <Box sx={{ display:'flex' , justifyContent:'center' , alignItems:'center' , flexDirection:'column' }} >

                <Typography variant="h6" sx={{ fontSize:'60px' }} color={"#eee"} fontWeight={"600"} textAlign={"center"}>Old School Fridays</Typography>
               
                </Box>
                </Box>
                <Box data-aos="fade-up" data-aos-duration="3000">
                <Box sx={{ display:'flex' , justifyContent:'center' , alignItems:'center' , flexDirection:'column' }} >

                <Typography variant="h6" sx={{ fontSize:'28px' , margin:'12px 0 ' }} color={"#eee"} fontWeight={"300"} textAlign={"center"}>The Classic Indiah Hookah Lounge</Typography>
                <LocationOnIcon sx={{ margin:'0 auto' , color:"#eee"}} />
                </Box>
                </Box>

                <Box data-aos="fade-down" data-aos-duration="3000">
                <Box sx={{ display:'flex' , justifyContent:'center' , alignItems:'center' , flexDirection:'column' }} >

                <Typography variant="h6" sx={{ fontSize:'24px' , margin:'12px 0 ' }} color={"#eee"} fontWeight={"300"} textAlign={"center"}>24 January 2023</Typography>
                <EventIcon sx={{ margin:'0 auto' , color:"#eee"}} />
                </Box>
                </Box>
                <Button className={"jello-horizontal"} onClick={() => setActive("")} sx={{ fontWeight: '600', fontSize: '14px', padding: '12px 18px', margin: '18px auto', color: '#111', background: '#eee' , "&:hover":{color: '#111', background: '#eee'} }}>Book Table</Button>

            </Grid>
            </Grid>
        </Box>
        </Box>
        </Box>
        <Box sx={{ display:'flex' , alignItems:'center' , justifyContent:'center' , margin:'52px 0 0 0 ' }} >
            <Typography variant="p" color={"#eee"} sx={{margin:"12px auto" , textAlign:'center', fontSize:'56px' , fontWeight:'600'}} textAlign={"center"} fontWeight={"300"} >{"Artists"}</Typography>
        </Box>

        <Grid container >
            
            <Grid item lg={4} xs={12} sx={{  height:{ xs:'fit-content' , lg:'95vh'},  borderBottom:'12px solid rgba(180,180,180,.05)' , padding:{ xs:'1rem' , lg:'2.5rem 12px'}  , "&:hover":{ background:'rgba(180,180,180,.1)' }  ,  display:'flex' , flexDirection:'column' , alignItems:'center' ,  justifyContent:'space-between',  }} >
            <Box data-aos="fade-left"  data-aos-anchor-placement="top-center" data-aos-duration="2000">
            <Box  sx={{ width:'100%', scale:"0.8" , "&:hover":{ scale:'0.9' } , transition:'800ms' , display:'flex' ,flexDirection:'column' , alignItems:'center' }}>
            <Avatar src={"/shadzo-2.jpeg"} alt={"Dj Shadzo"} sx={{ width: { lg: '200px', xs: "180px" }, height: { lg: '200px', xs: "180px" }, filter: "blur(0.3px)" , margin:'0 auto' }} ></Avatar>
            <Grid container>
            <Grid item xs={12} sx={{ margin:"32px 0 21px 0" , background:'' , textAlign:'center'}} >
            <Typography variant="p" color={"#eee"} sx={{margin:"21px 0 0 0" , textAlign:'center' , fontSize:'21px' , fontWeight:'600'}} fontWeight={"300"} >{"If your girl don't know Shadzo don't dala."}</Typography>

            </Grid>
            <Grid item xs={12} sx={{ alignItems:'center' , background:''  , margin:{ xs:"21px 0 0" , md:'0'} , height:{ xs:'fit-content' , md:''} , display:'flex' , justifyContent:'center'  }}>

             <Typography textAlign={"end"} fontSize={"21px"} fontWeight={"300"} sx={{ scale:'0.9',transition:'100ms',color:"#eee"  , "&:hover":{ scale:'0.95' , textDecoration:'underline' ,color:"#800020"  } }} >
                 <Link href={"/shadzo"}>
                     <a style={{  display:'flex' , alignItems:'center' , }}>
                        <Typography sx={{ fontSize:'21px' , margin:{ xs:0, md:'0 8px'} }}>
                          See more about {"Dj Shadzo"}
                         </Typography>
                         <EastIcon sx-={{ color:'#eee' , fontWeight:600 , margin:'0 8px' }} />
                     </a>
                 </Link>
             </Typography  >
            </Grid>

            </Grid>
            <iframe onLoad={() => setLoading(false)} style={{ borderRadius: "12px", margin: '18px auto' , height:'500px' , width:'100%' }} src="https://open.spotify.com/embed/artist/5JuA3291INTaMk0R8xMkZK?utm_source=generator" width="100%" height="315" frameBorder="0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
            <Box sx={{ display:'flex' , justifyContent:'center' , width:"100%" }} >
            <Socials artist={"Dj Shadzo"} />
            </Box>

            </Box>
            </Box>
            </Grid>
            
            
            <Grid item lg={4} xs={12} sx={{  height:{ xs:'fit-content' , lg:'95vh'},  borderBottom:'12px solid rgba(180,180,180,.05)' , padding:{ xs:'1rem' , lg:'2.5rem 12px'}  , "&:hover":{ background:'rgba(180,180,180,.1)' , color:'#FFC300 !important' }  ,  display:'flex' , flexDirection:'column' , alignItems:'center' ,  justifyContent:'space-between',  }} >
            <Box data-aos="fade-up"  data-aos-anchor-placement="top-center" data-aos-duration="2000">
            <Box sx={{ width:'100%', scale:"0.8" , "&:hover":{ scale:'0.9' } , transition:'800ms' , display:'flex' ,flexDirection:'column' , alignItems:'center' }}>
            <Avatar src={"/Karlo-1.jpeg"} alt={"Dj Shadzo"} sx={{ width: { lg: '200px', xs: "180px" }, height: { lg: '200px', xs: "180px" }, filter: "blur(0.3px)" , margin:'0 auto' }} ></Avatar>
            <Grid container>
            <Grid item xs={12} sx={{ margin:"32px 0 21px 0" , background:'' , textAlign:'center'}} >
             <Typography variant="p" color={"#eee"} sx={{margin:"21px 0 0 0" , textAlign:'center' , fontSize:'21px' , fontWeight:'600'}} fontWeight={"300"} >{"Old School RnB and Classic Jams."}</Typography>

            </Grid>
            <Grid item xs={12} sx={{ alignItems:'center' , background:''  , margin:{ xs:"21px 0 0" , md:'0'} , height:{ xs:'fit-content' , md:''} , display:'flex' , justifyContent:'center'  }}>

             <Typography textAlign={"end"} fontSize={"21px"} fontWeight={"300"} sx={{ scale:'0.9',transition:'100ms',color:"#eee"  , "&:hover":{ scale:'0.95' , textDecoration:'underline' ,color:"#FFC300"  } }} >
                 <Link href={"/shadzo"}>
                     <a style={{  display:'flex' , alignItems:'center' , }}>
                        <Typography sx={{ fontSize:'21px' , margin:{ xs:0, md:'0 8px'} }}>
                          See more about {"Karlo Dj"}
                         </Typography>
                         <EastIcon sx-={{ color:'#eee' , fontWeight:600 , margin:'0 8px' }} />
                     </a>
                 </Link>
             </Typography  >
            </Grid>

            </Grid>
            <iframe onLoad={() => setLoading(false)} style={{ borderRadius: "12px", margin: '18px 0' , height:'500px' , width:'100%' }} src="https://www.youtube.com/embed/-J0fR8UMfIc" width="100%" height="315" frameBorder="0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
            <Box sx={{ display:'flex' , justifyContent:'center' , width:"100%" }} >
            <Socials artist={"Karlo Dj"} />
            </Box>

            </Box>
            </Box>
            </Grid>
            

            <Grid item lg={4} xs={12} sx={{  height:{ xs:'fit-content' , lg:'95vh'},  borderBottom:'12px solid rgba(180,180,180,.05)' , padding:{ xs:'1rem' , lg:'2.5rem 12px'}  , "&:hover":{ background:'rgba(180,180,180,.1)' }  ,  display:'flex' , flexDirection:'column' , alignItems:'center' ,  justifyContent:'space-between',  }} >
            <Box data-aos="fade-right"  data-aos-anchor-placement="top-center" data-aos-duration="2000">
            <Box sx={{ width:'100%', scale:"0.8" , "&:hover":{ scale:'0.9' } , transition:'800ms' , display:'flex' ,flexDirection:'column' , alignItems:'center' }}>
            <Avatar src={"/ykm-2.jpeg"} alt={"Dj Shadzo"} sx={{ width: { lg: '200px', xs: "180px" }, height: { lg: '200px', xs: "180px" }, filter: "blur(0.3px)" , margin:'0 auto' }} ></Avatar>
            <Grid container>
            <Grid item xs={12} sx={{ margin:"32px 0 21px 0" , background:'' , textAlign:'center'}} >
             <Typography variant="p" color={"#eee"} sx={{margin:"21px 0 0 0" , textAlign:'center' , fontSize:'21px' , fontWeight:'600'}} fontWeight={"300"} >{"Mr Lovers and Friends."}</Typography>

            </Grid>
            <Grid item xs={12} sx={{ alignItems:'center' , background:''  , margin:{ xs:"21px 0 0" , md:'0'} , height:{ xs:'fit-content' , md:''} , display:'flex' , justifyContent:'center'  }}>

             <Typography textAlign={"end"} fontSize={"21px"} fontWeight={"300"} sx={{ scale:'0.9',transition:'100ms',color:"#eee"  , "&:hover":{ scale:'0.95' , textDecoration:'underline' ,color:"#40e0d0"  } }} >
                 <Link href={"/shadzo"}>
                     <a style={{  display:'flex' , alignItems:'center' , }}>
                        <Typography sx={{ fontSize:'21px' , margin:{ xs:0, md:'0 8px'} }}>
                          See more about {"YKM"}
                         </Typography>
                         <EastIcon sx-={{ color:'#eee' , fontWeight:600 , margin:'0 8px' }} />
                     </a>
                 </Link>
             </Typography  >
            </Grid>

            </Grid>
            <iframe onLoad={() => setLoading(false)} style={{ borderRadius: "12px", margin: '18px 0' , height:'500px' , width:'95%' }} src="https://www.youtube.com/embed/gy6gGT-G6ak" width="100%" height="315" frameBorder="0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
            <Box sx={{ display:'flex' , justifyContent:'center' , width:"100%" }} >
            <Socials artist={"YKM THEE MC"} />
            </Box>

            </Box>
            </Box>
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
                    <img src="/misguided-2.jpeg" alt="Miguided Entertainment. Karlo , YKM and Dj Shadzo" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/misguided-3.jpeg" alt="Miguided Entertainment. Karlo , YKM and Dj Shadzo" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/misguided-4.jpeg" alt="Miguided Entertainment. Karlo , YKM and Dj Shadzo" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/misguided-5.jpeg"  alt="Miguided Entertainment. Karlo , YKM and Dj Shadzo"/>
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/misguided-6.jpeg" alt="Miguided Entertainment. Karlo , YKM and Dj Shadzo" />
                </SwiperSlide>



            </Swiper>
        </Box>
    );
}

        // <Box sx={{ marginTop: '50px', background: '#222' }} id="artists">
        //     <Grid container >
        //         <Grid item xs={12} lg={6} sx={{ height: { lg: '91vh', xs: '50vh' , md:'80vh' }, padding: { lg: "52px 16px" }, background: '#111', display: 'flex', flexDirection: { xs: 'column', md: 'column' }, alignItems: 'center', justifyContent: 'space-evenly' }}>
        //             <Typography variant="h3" width={"100%"} color={"#eee"} fontWeight={"600"} textAlign={"center"} sx={{ marginTop: { xs: '50px' } }}>Meet The Artists</Typography>
        //             <Button onClick={() => setActive("")} sx={{ fontWeight: '600', fontSize: '16px', padding: '32px 0', padding: '18px auto 0px auto', margin: '18px auto', color: '#111', background: '#eee' }}>All</Button>

        //             <Grid container>


        //                 {artists.map((artist, index) => {
        //                     return (
        //                         <Grid item key={index} xs={4} md={12} sx={{ background: '', display: 'flex', alignItems: 'center' }}>
        //                             <Button onClick={(e) => {
        //                                 e.preventDefault();
        //                                 handleArtistClick(artist);
        //                             }} sx={{ width: { xs: "90%", md: '75%' }, fontWeight:  active.name === artist.name ? "900" : '500', fontSize: {xs : artist.name === "YKM THEE MC" ? '0.8rem' : '16px' ,sm:'16px'}, padding: { xs: artist.name === "YKM THEE MC" ? '18px 0' : '16px 0', md: '32px 0' }, margin: '18px auto', background: '#eee', color: '#111', "&:hover": { color: '#eee' } }}>{artist.name}</Button>
        //                         </Grid>
        //                     )
        //                 })}
        //             </Grid>
        //         </Grid>
        //         <Grid item xs={12} lg={6} sx={{ height: { lg: 'fit-content', xs: 'fit-content' }, padding: { lg: "24px 16px" }, margin: 'auto 0' }}>
        //             {
        //                 active === "" ? (
        //                     <Box sx={{ height: { xs: '50vh', md: 'fit-content' }, background: '' }}>

        //                         <SquadSlides />
        //                     </Box>
        //                 ) : (
        //                     <Fade in={active} sx={{ width: '100%', background: 'rgba(1,1,1,.3)', height: '100%', padding:  "21px 8px"  }} id="artists-bg" >
        //                         <Box sx={{ padding: { lg: "2px 16px" } }}>
        //                             <Box sx={{ display: 'flex', alignItems: 'center', padding: { xs: "16px 12px", md: "0px" } , width:'100%' , background:'' }}>

        //                                 <Avatar src={active.img} alt={active.name} sx={{ width: { lg: '120px', xs: "100px" }, height: { lg: '120px', xs: "90px" }, filter: "blur(0.3px)" }} ></Avatar>
        //                                 <Stack sx={{ margin: { xs: '0px 21px' } , width:'100%' }}>
        //                                     <Typography variant="h6" color={"#eee"} fontWeight={"600"} textAlign={"start"}>{active.name}</Typography>
                                           
        //                                    <Grid container>
        //                                    <Grid item xs={12} lg={6} >
        //                                     <Typography variant="p" color={"#eee"} fontWeight={"300"} >{active.slogan}</Typography>

        //                                    </Grid>
        //                                    <Grid item xs={12} lg={6} sx={{ alignItems:'flex-end'  , margin:{ xs:"21px 0 0" , md:'0'} , height:{ xs:'fit-content' , md:'60px'} , display:'flex' , justifyContent:'flex-end'  }}>

        //                                     <Typography textAlign={"end"} fontSize={"21px"} fontWeight={"300"} sx={{ scale:'0.9',transition:'100ms',color:"#eee"  , "&:hover":{ scale:'0.95' , textDecoration:'underline' ,color:"#40e0d0"  } }} >
        //                                         <Link href={active.artistPageLink}>
        //                                             <a style={{  display:'flex' , alignItems:'center' , }}>
        //                                                <Typography sx={{ fontSize:'21px' , margin:{ xs:0, md:'0 8px'} }}>
        //                                                  See more about {active.name}
        //                                                 </Typography>
        //                                                 <EastIcon sx-={{ color:'#eee' , fontWeight:600 , margin:'0 8px' }} />
        //                                             </a>
        //                                         </Link>
        //                                     </Typography  >
        //                                    </Grid>

        //                                    </Grid>
                                           
        //                                     {/* <Box sx={{ display:'flex' , alignItems:{ xs:"flex-start", md:'center'} , justifyContent:'space-between' , width:'100%' , background:'' , flexDirection:{xs:'column' , md:'row'}}}>

        //                                     </Box> */}
        //                                 </Stack>
        //                             </Box>

        //                             {
        //                                 loading ? (
        //                                     <Box sx={{ height: '350px', width: '100%', background: 'yellow', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        //                                         <PulseLoader />
        //                                     </Box>
        //                                 )
        //                                     : (
        //                                         <Box sx={{ width: "100%", display: 'flex', alignItems: 'center', padding: { xs: "16px 12px", md: "0px" } }}>
        //                                             {
        //                                                 active.embedItem
        //                                             }
        //                                         </Box>
        //                                     )
        //                             }

                                    
        //                             <Box sx={{
        //                                 height: '48px',
        //                                 background: { xs: 'rgba(255,255,255,.1)', md: 'transparent' },
        //                                 display: 'flex',
        //                                 justifyContent: 'flex-end'
        //                             }}>
        //                                 <Socials artist={active} />
        //                             </Box>
        //                         </Box>
        //                     </Fade>
        //                 )
        //             }
        //         </Grid>
        //     </Grid>
        // </Box>