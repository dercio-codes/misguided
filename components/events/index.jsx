import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Grid, Typography } from "@mui/material"

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import "./styles.css";

// import required modules
import { Autoplay, EffectCoverflow, Pagination, Navigation } from "swiper";
import { EventModal } from "./event-modal";

export const Events = () => {
  const [open, setOpen] = useState(false);
  const [openImage, setOpenImage] = useState("");
  const eventImages = [
    "/run-the-city.jpeg",
    "/girls-do-it-better.jpeg",
    "/spring-fling.jpeg"
  ]

  const handleEventClick = (event_img) => {
    setOpen(true)
    setOpenImage(event_img)
  }

  return (
    <Box id="events" sx={{ padding: '21px 0', height: 'fit-content', background: '#111', width: '100%' }}>

      <Grid container>
        <Grid item xs={12} sx={{ padding: { xs: "12px 8px" }, textAlign: { xs: "center" }, margin: "32px 0", }} >
          <Typography variant="p" width={"100%"} color={"#eee"} sx={{ fontSize: { xs: "32px", md: "54px" } }} fontWeight={"600"}>Events </Typography>

        </Grid>

        <Grid item xs={12} sx={{ display: 'flex', marginBottom: '54px', alignItems: 'center', background: '', padding: { xs: '0 12px', md: '0 48px' } }}>
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            pagination={{
              type: "progressbar",
            }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            slidesPerView={2}
            navigation={true}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
            className="mySwiper"
          >
            {
              eventImages.map((event_img , index)=>{
                return(

            <SwiperSlide onClick={() => handleEventClick(event_img)} key={index}>
              <Box sx={{ height: '300px', width: '300px', backgroundSize: "contain", backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundImage: `url(${event_img})` }} />
            </SwiperSlide>
                )
              })
            }


          </Swiper>
          <EventModal openImage={openImage} state={{ open, setOpen }} />
        </Grid>
      </Grid>
    </Box>
  );
}
