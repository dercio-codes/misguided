import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Typography } from "@mui/material"

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import "./styles.css";

// import required modules
import { EffectCoverflow, Pagination } from "swiper";

export const Events = () => {
  return (
    <Box sx={{ padding: '48px', height: '65vh', background: '#111', }}>
      <Typography variant="h3" width={"100%"} color={"#eee"} fontWeight={"600"}>Events & Gigs</Typography>

      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Box sx={{ height: '300px', width: '300px', backgroundSize: "cover", backgroundImage: 'url("/run-the-city.jpeg")' }} />
        </SwiperSlide>
        <SwiperSlide>
          <Box sx={{ height: '300px', width: '300px', backgroundSize: "cover", backgroundImage: 'url("/girls-do-it-better.jpeg")' }} />
        </SwiperSlide>
        <SwiperSlide>
          <Box sx={{ height: '300px', width: '300px', backgroundSize: "cover", backgroundImage: 'url("/spring-fling.jpeg")' }} />
        </SwiperSlide>

      </Swiper>
    </Box>
  );
}
