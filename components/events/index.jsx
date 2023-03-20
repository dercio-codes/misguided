import React, { useRef, useState, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Grid, Button, Typography, Divider } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  storage,
  googleProvider,
  facebookProvider,
  auth,
  db,
} from "./../../firebase/firebaseConfig";
import {
  query,
  doc,
  collection,
  addDoc,
  deleteDoc,
  setDoc,
  getDocs,
  where,
} from "firebase/firestore";
import { DotLoader } from "react-spinners";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// import "./styles.css";

// import required modules
import { Autoplay, EffectCoverflow, Pagination, Navigation } from "swiper";
import { EventModal } from "./event-modal";
import { TableBookings } from "./table-bookings";
import Link from "next/link";

export const Events = (props) => {
  const { artist, text } = props;
  const [events, setEvents] = useState([
    {
      event_name: "Old School Picnic",
      number_of_table_bookings_accepted: "",
      indoor_or_outdoor_option: false,
      image: "/old-school-picnic.jpeg",
    },
  ]);
  const [open, setOpen] = useState(false);
  const matches = useMediaQuery("(max-width:900px)");
  const [openTableBooking, setOpenTableBooking] = useState(false);
  const [openEvent, setopenEvent] = useState("");
  const [loading, setLoading] = useState(false);

  // const getContent = async () => {
  //   const local = [];
  //   const querySnapshot = await getDocs(collection(db, "events"));

  //   querySnapshot.forEach((item) => {
  //     local.push(item.data());
  //   });
  //   console.log(local);
  //   setEvents(local);
  // };

  // useEffect(async () => {
  //   getContent();
  // }, []);

  const handleEventClick = (item) => {
    setOpen(true);
    setopenEvent(item);
  };

  const handleTableBookingClick = (item) => {
    setOpenTableBooking(true);
    setopenEvent(item);
  };

  return loading ? (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        backround: "#111",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <DotLoader />
    </Box>
  ) : (
    <Box
      id="events"
      sx={{
        // padding: { xs: "1rem 2.5rem", lg: artist ? "0" : "105px 0" },
        minHeight: { xs: "100vh" },
        background: artist ? "" : "#111",
        padding: "2.5rem 0",
        // width: { xs: "450px", md: "500px", lg: "100%" },
        width: "100%",
      }}
    >
      <Grid container>
        <Grid
          item
          xs={12}
          sx={{
            padding: { xs: "1.5rem 1rem 0 1rem" },
            // textAlign: { xs: "center" },
            margin: { xs: "12px 0", md: "32px 0" },
          }}
        >
          <Typography
            fontSize={"42px"}
            color={"#999"}
            margin={"0px 0"}
            fontWeight={"600"}
          >
            Events
          </Typography>
          <Divider
            sx={{ margin: "0px 0 21px 0", width: "32px", background: "#999" }}
          />
        </Grid>

        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            marginBottom: "54px",
            alignItems: "center",
            background: "",
            // padding: { xs: "0 12px", md: "0 48px" },
          }}
        >
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
            {events.map((item, index) => {
              return (
                <Box data-aos="zoom-in" key={index} data-aos-duration="2000">
                  <SwiperSlide
                    data-zoomable
                    key={index}
                    style={{
                      background: "rgba(142, 208, 192, 0.1)",
                      // backgroundSize: "cover",
                      // backdropFilter: "blur(1px)",
                      // backgroundPosition: "center",
                      // backgroundRepeat: "no-repeat",
                      // backgroundImage: `url("${item.image}")`,
                    }}
                  >
                    <Typography
                      sx={{
                        textAlign: "center",
                        fontWeight: 600,
                        color: "#eee",
                        fontSize: "32px",
                        margin: "21px 0",
                      }}
                    >
                      {item.event_name}
                    </Typography>

                    <Box
                      onClick={() => handleEventClick(item)}
                      sx={{
                        height: { xs: "450px", md: "300px" },
                        width: { xs: "100%", md: "300px" },
                        backgroundSize: "contain",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundImage: `url("${item.image}")`,
                      }}
                    />
                    <Typography
                      fontWeight={"500"}
                      fontSize={"12px"}
                      // sx={{ margin: "8px 0" }}
                      color={"#eee"}
                    >
                      Click to zoom
                    </Typography>
                    {artist ? (
                      <></>
                    ) : (
                      <>
                        <Button
                          sx={{
                            width: { xs: "90%", md: "300px" },
                            fontWeight: "500",
                            fontSize: { xs: "16px", sm: "16px" },
                            padding: { xs: "12px 0", md: "16px 0" },
                            margin: "18px auto",
                            background: "#eee",
                            color: "#111",
                            // cursor:
                            //   item.number_of_table_bookings_accepted === "0"
                            //     ? "not-allowed"
                            //     : "pointer",
                            "&:hover": { color: "#eee" },
                          }}
                          // disabled={
                          //   item.number_of_table_bookings_accepted === "0"
                          // }
                          onClick={() => handleTableBookingClick(item)}
                        >
                          {"Book Table"}
                        </Button>

                        <Link href="https://www.howler.co.za/events/the-old-school-picnic-misguided-5-year-celebration-8fb3">
                          <a
                            style={{
                              // background: "red",
                              width: "100%",
                              margin: "0 auto",
                              display: "flex",
                              juastifyContent: "center",
                            }}
                          >
                            <Button
                              sx={{
                                width: { xs: "90%", md: "300px" },
                                fontWeight: "500",
                                fontSize: { xs: "16px", sm: "16px" },
                                padding: { xs: "12px 0", md: "16px 0" },
                                margin: "8px auto",
                                background: "#eee",
                                color: "#111",
                                "&:hover": { color: "#eee" },
                              }}
                              // onClick={() => handleTableBookingClick(item)}
                            >
                              Buy Tickets
                            </Button>
                          </a>
                        </Link>
                      </>
                    )}
                  </SwiperSlide>
                </Box>
              );
            })}
          </Swiper>
          <EventModal openEvent={openEvent} state={{ open, setOpen }} />
          <TableBookings
            openEvent={openEvent}
            state={{
              openTableBooking,
              setOpenTableBooking,
              loading,
              setLoading,
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
