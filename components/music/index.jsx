import { useState, useEffect } from "react";
import {
  storage,
  googleProvider,
  facebookProvider,
  auth,
  db,
} from "./../../firebase/firebaseConfig";
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
import { OpenSongContext } from "./../../pages/_app";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { MusicItem } from "./MusicItem";
import Link from "next/link";

export const Music = (props) => {
  // State to store uploaded file
  const [songs, setSongs] = useState([]);

  const [loading, setLoading] = useState(false);
  const { open, setOpen } = React.useContext(OpenSongContext);

  const getContent = async () => {
    setLoading(true);
    const local = [];
    const querySnapshot = await getDocs(collection(db, "songs"));

    querySnapshot.forEach((item) => {
      local.push(item.data());
    });
    console.log(local);
    setSongs(local);
    setLoading(false);
  };

  useEffect(async () => {
    getContent();
  }, []);

  let Originals = [];
  let Mixes = [];
  let Remixes = [];

  songs.map((song) => {
    if (song.category === "Remix") {
      Remixes.push(song);
    }
    if (song.category === "Original") {
      Originals.push(song);
    }
    if (song.category === "Mix") {
      Mixes.push(song);
    }
  });

  return (
    <Box sx={{ padding: "2.5rem 1rem", color: "#eee", height: "auto" }}>
      <Typography fontSize={"42px"} margin={"0px 0"} fontWeight={"600"}>
        Music
      </Typography>
      <Divider
        sx={{ margin: "0px 0 21px 0", width: "32px", background: "#999" }}
      />
      {loading ? (
        <Box
          sx={{
            height: "50vh",
            background: "",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "21px 0",
          }}
        >
          <Box
            sx={{
              position: "relative",
              display: "inline-flex",
              scale: "12rem",
            }}
          >
            <CircularProgress
              size={"12rem"}
              // variant="determinate"
              color={"success"}
            />
          </Box>
        </Box>
      ) : (
        <>
          <Grid container spacing={6}>
            <Grid
              item
              xs={12}
              lg={12}
              sx={{ display: Originals.length === 0 ? "none" : "block" }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "21px 0",
                }}
              >
                <Typography fontSize={"32px"}>Original</Typography>
                <Link href="/music">
                  <a>
                    <Typography fontSize={"18px"}>View More</Typography>
                  </a>
                </Link>
              </Box>
              <Grid container spacing={6}>
                {Originals.map((song, index) => {
                  return (
                    <Grid key={index} item xs={6} sm={6} md={4} lg={2}>
                      <MusicItem song={song} setOpen={setOpen} />
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>

            <Grid
              item
              xs={12}
              lg={12}
              sx={{ display: Mixes.length === 0 ? "none" : "block" }}
            >
              <Typography fontSize={"32px"} margin={"8px 0"}>
                Mixes
              </Typography>
              <Grid container spacing={6}>
                {Mixes.map((song, index) => {
                  return (
                    <Grid key={index} item xs={6} sm={6} md={4} lg={2}>
                      <MusicItem song={song} setOpen={setOpen} />
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>

            <Grid
              item
              xs={12}
              lg={12}
              sx={{ display: Remixes.length === 0 ? "none" : "block" }}
            >
              <Typography fontSize={"32px"} margin={"8px 0"}>
                Remixes
              </Typography>
              <Grid container spacing={6}>
                {Remixes.map((song, index) => {
                  return (
                    <Grid key={index} item xs={6} sm={6} md={4} lg={2}>
                      <MusicItem song={song} setOpen={setOpen} />
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};
