import { useState, useEffect } from "react";
import {
  storage,
  googleProvider,
  facebookProvider,
  auth,
  db,
} from "./../firebase/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Box, LinearProgress, Grid, Paper, MenuItem } from "@mui/material";
import Typography from "@mui/material/Typography";
import {
  Button,
  Divider,
  IconButton,
  CircularProgress,
  Select,
  Drawer,
  OutlinedInput,
  TextField,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
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
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import React from "react";
import { useDropzone } from "react-dropzone";
import { OpenSongContext } from "./_app";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import Link from "next/link";
import { Navbar } from "../components/navbar";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const History = (props) => {
  // State to store uploaded file
  const [open, setOpen] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [loading, setLoading] = useState(false);

  const handleOpenEvent = (event) => {
    setLoading(true);
    setOpen(event);
    setLoading(false);
  };

  const handleCloseEvent = () => {
    setLoading(true);
    setOpen("");
    setLoading(false);
  };

  const events = [
    // {
    //   image:
    //     "https://firebasestorage.googleapis.com/v0/b/misguided-946f0.appspot.com/o/events%2Flovea-and-hiphop.jpeg?alt=media&token=7dd6d6be-8929-4c18-93c9-6703f1c70acc",
    //   name: "Love and Hip Hop",
    //   date: "18 February 2023",
    // },
    {
      image: "/old-school.jpeg",
      name: "Old School Fridays",
      date: "16 December 2022",
    },
    // {
    //   image: "/3-man-show.jpeg",
    //   name: "3 Man Show",
    //   date: "29 October 2022",
    // },
  ];

  const images = [
    {
      original: "/12.jpg",
      thumbnail: "/12.jpg",
    },
    {
      original: "/15.jpg",
      thumbnail: "/15.jpg",
    },
    {
      original: "/30.jpg",
      thumbnail: "/30.jpg",
    },
    {
      original: "/35.jpg",
      thumbnail: "/35.jpg",
    },
    {
      original: "/40.jpeg",
      thumbnail: "/40.jpeg",
    },
  ];

  return (
    <Box
      sx={{
        padding: "",
        color: "#eee",
        minHeight: "100vh",
        overflowY: "auto",
        background: "#111",
      }}
    >
      <Navbar />
      {loading ? (
        <CircularProgress size={"12rem"} variant="determinate" />
      ) : open === "" ? (
        <Grid container sx={{ padding: "2.5rem 1rem" }}>
          {events.map((event, index) => {
            return (
              <PastEvent
                key={index}
                handleCloseEvent={handleCloseEvent}
                handleOpenEvent={handleOpenEvent}
                event={event}
              />
            );
          })}
        </Grid>
      ) : (
        <Box
          sx={{
            minHeight: "100vh",
            // background: "pink",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              background: "",
              margin: "32px 0",
              width: "100%",
              padding: "0 12px",
            }}
          >
            <IconButton onClick={handleCloseEvent}>
              <ArrowBackIcon sx={{ color: "#eee", fontSize: "32px" }} />
            </IconButton>
          </Box>
          <Box
            sx={{
              height: "350px",
              width: "250px",
              backgroundImage: `url('${open.image}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              margin: "0 0 21px 0",
            }}
          />
          <Typography
            sx={{
              margin: "12px 0",
              textAlign: "center",
              fontSize: "32px",
              fontWeight: "600",
            }}
          >
            {open.name}
          </Typography>
          <Typography
            sx={{
              margin: "0",
              textAlign: "center",
              fontSize: "24px",
              fontWeight: "400",
            }}
          >
            {open.date}
          </Typography>
          <iframe
            style={{
              borderRadius: "12px",
              margin: "32px 0",
              height: "500px",
              width: "95%",
            }}
            src="https://www.youtube.com/embed/gy6gGT-G6ak"
            width="100%"
            height="315"
            frameBorder="0"
            allowFullScreen=""
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
          <ImageGallery
            fullScreen={true}
            // lazyLoad={true}
            showBullets={true}
            showIndex={true}
            items={images}
          />
          ;
        </Box>
      )}
    </Box>
  );
};
export default History;

const PastEvent = ({ event, handleOpenEvent }) => {
  return (
    <Grid
      item
      xs={6}
      onClick={() => {
        handleOpenEvent(event);
      }}
      sx={{
        scale: "0.90",
        transition: "800ms",
        cursor: "pointer",
        "&:hover": { scale: "0.95" },
      }}
    >
      <Box
        sx={{
          height: "300px",
          backgroundImage: `url('${event.image}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          margin: "0 0 21px 0",
        }}
      />
      <Typography
        sx={{
          margin: "12px 0",
          textAlign: "center",
          fontSize: "21px",
          fontWeight: "600",
        }}
      >
        {event.name}
      </Typography>
      <Typography
        sx={{
          margin: "12px 0",
          textAlign: "center",
          fontSize: "18px",
          fontWeight: "400",
        }}
      >
        {event.date}
      </Typography>
    </Grid>
  );
};
