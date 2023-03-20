import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { Box, Typography, Grid } from "@mui/material";
import React from "react";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import ExpandIcon from "@mui/icons-material/Expand";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Link from "next/link";
import { OpenSongContext } from "./../pages/_app";
import {
  query,
  doc,
  collection,
  addDoc,
  setDoc,
  getDocs,
  where,
} from "firebase/firestore";
import {
  storage,
  googleProvider,
  facebookProvider,
  auth,
  db,
} from "./../firebase/firebaseConfig";
import { Cancel, CloseOutlined } from "@mui/icons-material";

const DUMMY_DATA = [
  {
    title: "Death Bed",
    artist: "Powfu",
    artwork: "https://samplesongs.netlify.app/album-arts/death-bed.jpg",
    url: "https://samplesongs.netlify.app/Death%20Bed.mp3",
    id: "1",
  },
  {
    title: "Bad Liar",
    artist: "Imagine Dragons",
    artwork: "https://samplesongs.netlify.app/album-arts/bad-liar.jpg",
    url: "https://samplesongs.netlify.app/Bad%20Liar.mp3",
    id: "2",
  },
  {
    title: "Faded",
    artist: "Alan Walker",
    artwork: "https://samplesongs.netlify.app/album-arts/faded.jpg",
    url: "https://samplesongs.netlify.app/Faded.mp3",
    id: "3",
  },
  {
    title: "Hate Me",
    artist: "Ellie Goulding",
    artwork: "https://samplesongs.netlify.app/album-arts/hate-me.jpg",
    url: "https://samplesongs.netlify.app/Hate%20Me.mp3",
    id: "4",
  },
  {
    title: "Solo",
    artist: "Clean Bandit",
    artwork: "https://samplesongs.netlify.app/album-arts/solo.jpg",
    url: "https://samplesongs.netlify.app/Solo.mp3",
    id: "5",
  },
  {
    title: "Without Me",
    artist: "Halsey",
    artwork: "https://samplesongs.netlify.app/album-arts/without-me.jpg",
    url: "https://samplesongs.netlify.app/Without%20Me.mp3",
    id: "6",
  },
];

export const AudipPLayer = () => {
  const [openMusic, setOpenMusic] = React.useState(false);
  const { open, setOpen } = React.useContext(OpenSongContext);
  const [songs, setSongs] = React.useState([]);

  const getContent = async () => {
    const local = [];
    const querySnapshot = await getDocs(collection(db, "songs"));

    querySnapshot.forEach((item) => {
      local.push(item.data());
    });
    console.log(local);
    setSongs(local);
    // setLoading(false)
  };

  React.useEffect(async () => {
    getContent();
  }, []);

  return (
    <Box
      sx={{
        position: "fixed",
        zIndex: "999999999",
        bottom: 0,
        left: 0,
        width: "100%",
        margin: "0 auto",
        display: JSON.stringify(open) === "{}" ? "none" : "block",
        transition: "800ms",
        // background:'pink' ,
        // padding:'0 2.5rem',
      }}
    >
      <Grid container>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#111",
          }}
        >
          <Box
            onClick={() => setOpenMusic(!openMusic)}
            sx={{
              height: "50px",
              background: "#111",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 21px",
            }}
          >
            {openMusic ? (
              <ExpandMoreIcon
                sx={{
                  fontSize: "2.5rem",
                  scale: ".9",
                  transition: "800ms",
                  cursor: "pointer",
                  "&:hover": { scale: "1" },
                  color: "#eee",
                }}
              />
            ) : (
              <ExpandLessIcon
                sx={{
                  fontSize: "2.5rem",
                  scale: ".9",
                  transition: "800ms",
                  cursor: "pointer",
                  "&:hover": { scale: "1" },
                  color: "#eee",
                }}
              />
            )}
          </Box>

          <Box
            onClick={() => setOpen("")}
            sx={{
              height: "50px",
              background: "#111",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 21px",
            }}
          >
            <CloseOutlined
              sx={{
                fontSize: "2rem",
                scale: ".9",
                transition: "800ms",
                cursor: "pointer",
                "&:hover": { scale: "1" },
                color: "#eee",
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={4} lg={1.5}>
          <Box
            sx={{
              width: "100%",
              backgroundImage: `url("${open.artwork}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              height: "120px",
            }}
          />
        </Grid>
        <Grid item xs={8} lg={10.5}>
          <AudioPlayer style={{ height: "120px" }} src={open.url} />
        </Grid>
      </Grid>
      <Box
        sx={{
          height: openMusic ? "250px" : "0px",
          background: "#222",
          padding: "0",
          transition: "800ms",
          overflowY: "auto",
        }}
      >
        {songs.map((item) => (
          <AudioItem
            key={item.id}
            activeSong={item.title === open.title}
            setOpen={setOpen}
            song={item}
          />
        ))}
      </Box>
    </Box>
  );
};

const AudioItem = (props) => {
  const { title, artist, artwork, url, id } = props.song;

  return (
    <Box
      sx={{
        height: "120px",
        margin: "1px 0",
        display: "flex",
        // padding:'0 8px',
        width: "100%",
        background: "rgba(1,1,1,.3)",
      }}
    >
      <Grid container>
        <Grid item xs={4} lg={1.5}>
          <Box
            sx={{
              width: "100%",
              backgroundImage: `url("${artwork}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              height: "120px",
              color: "#eee",
              fontWeight: 600,
            }}
          >
            <Box
              sx={{
                display: props.activeSong ? "flex" : "none",
                width: "100%",
                height: "100%",
                background: "rgba(1,1,1,.8)",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              Now Playing
              {/*<img src="https://cdn-icons-png.flaticon.com/512/1792/1792737.png" alt="" style={{ width:'50px' , objectFit:'contain' }} />*/}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={5} lg={8.5}>
          <Box
            sx={{
              width: "100%",
              height: "120px",
              background: "",
              display: "flex",
              padding: "0 12px",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: "16px", lg: "24px" },
                color: "rgba( 200 , 200 , 200 , .9 )",
                margin: "4px 0",
                fontWeight: "600",
              }}
            >
              {" "}
              {title}{" "}
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: "14px", lg: "21px" },
                color: "rgba( 200 , 200 , 200 , .9 )",
                margin: "4px 0",
                fontWeight: "300",
              }}
            >
              {" "}
              {artist}{" "}
            </Typography>
          </Box>
        </Grid>

        <Grid
          item
          xs={1.5}
          lg={1}
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Link href={url}>
            <a>
              <CloudDownloadIcon
                sx={{
                  fontSize: { xs: "2rem", lg: "2.5rem" },
                  scale: ".9",
                  transition: "800ms",
                  cursor: "pointer",
                  "&:hover": { scale: "1" },
                  color: "#eee",
                }}
              />
            </a>
          </Link>
          <Typography
            variant="h3"
            sx={{
              margin: "12px 0 0 0",
              fontSize: { xs: "14px", lg: "16px" },
              color: "rgba( 200 , 200 , 200 , .9 )",
              margin: "4px 0",
              fontWeight: "300",
            }}
          >
            {" "}
            Download
          </Typography>
        </Grid>

        <Grid
          item
          xs={1.5}
          lg={1}
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <PlayCircleIcon
            sx={{
              fontSize: { xs: "2rem", lg: "2.5rem" },
              scale: ".9",
              transition: "800ms",
              cursor: "pointer",
              "&:hover": { scale: "1" },
              color: "#eee",
            }}
            onClick={() => {
              props.setOpen(props.song);
            }}
          />
          <Typography
            variant="h3"
            sx={{
              margin: "12px 0 0 0",
              fontSize: { xs: "14px", lg: "16px" },
              color: "rgba( 200 , 200 , 200 , .9 )",
              margin: "4px 0",
              fontWeight: "300",
            }}
          >
            {" "}
            Play
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
