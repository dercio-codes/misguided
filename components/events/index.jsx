import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Grid, Button, Typography } from "@mui/material"
import useMediaQuery from '@mui/material/useMediaQuery';

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import "./styles.css";

// import required modules
import { Autoplay, EffectCoverflow, Pagination, Navigation } from "swiper";
import { EventModal } from "./event-modal";
import { TableBookings } from "./table-bookings";

export const Events = ({ artist }) => {
  const [open, setOpen] = useState(false);
  const matches = useMediaQuery('(max-width:900px)');
  const [openTableBooking, setOpenTableBooking] = useState(false);
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

  const handleTableBookingClick = (event_img) => {
    setOpenTableBooking(true)
    setOpenImage(event_img)
  }

  return (
    <Box id="events" sx={{ padding: '21px 0', height: { xs: 'fit-content' ,md:artist ? '100vh':'fit-content'}, background: '#111', width: '100%' }}>

      <Grid container>
        <Grid item xs={12} sx={{ padding: { xs: "12px 8px" }, textAlign: { xs: "center" }, margin: { xs:'12px 0' , md :"32px 0"}, }} >
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
            slidesPerView={matches ? 1 : artist ? 1 : 2}
            // slidesPerView={1 }
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
              eventImages.map((event_img, index) => {
                return (

                  <SwiperSlide data-zoomable

                    key={index}>
                    <Box onClick={() => handleEventClick(event_img)} sx={{ height: { xs: '350px', md: '300px' }, width: { xs: '100%', md: '300px' }, backgroundSize: "contain", backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundImage: `url(${event_img})` }} />
                    <Typography fontWeight={"500"} fontSize={"12px"} sx={{ margin: '8px 0' }} color={"#eee"}>Click to zoom</Typography>
                    {
                      artist ?
                        <></>
                        :
                        (
                          <Button sx={{
                            width: { xs: "100%", md: '300px' },
                            fontWeight: '500',
                            fontSize: { xs: '16px', sm: '16px' },
                            padding: { xs: '12px 0', md: '16px 0' },
                            margin: '18px auto',
                            background: '#eee',
                            color: '#111', "&:hover": { color: '#eee' }
                          }}
                            onClick={() => handleTableBookingClick(event_img)}
                          >Book Table</Button>
                        )
                    }

                  </SwiperSlide>
                )
              })
            }


          </Swiper>
          <EventModal openImage={openImage} state={{ open, setOpen }} />
          <TableBookings openImage={openImage} state={{ openTableBooking, setOpenTableBooking }} />
        </Grid>
      </Grid>
    </Box>
  );
}
