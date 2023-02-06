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
import { toast } from "react-toastify";

function Upload() {
  // State to store uploaded file
  const [files, setFiles] = useState([]);
  const [songs, setSongs] = useState([]);
  const [songFiles, setSongFiles] = useState([]);
  const [newImage, SetNewImage] = useState("");
  const [newSongItem, setNewSongItem] = useState({
    title: "",
    artist: "",
    artwork: "",
    category: "",
    url: "",
    id: "",
  });
  const [loading, setLoading] = useState(false);
  const { open, setOpen } = React.useContext(OpenSongContext);

  // progress
  const [percent, setPercent] = useState(0);

  // Handle file upload event and update state
  function handleFileChange(event) {
    setFile(event.target.files);
  }

  const [preview, setPreview] = useState();

  const handleFieldChange = (e) => {
    setNewSongItem({
      ...newSongItem,
      [e.target.name]: e.target.value,
    });
    console.log(newSongItem);
  };

  const getContent = async () => {
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

  const handleFileUpload = async () => {
    const fileName = files[0]["name"];
    const idxDot = fileName.lastIndexOf(".") + 1;
    const extFile = fileName.substr(idxDot, fileName.length).toLowerCase();

    if (!files || files.length === 0) {
      toast.error(`Please upload an image first!`, {
        theme: "dark",
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
      });
    }

    if (
      extFile == "jpg" ||
      extFile == "gif" ||
      extFile == "jpeg" ||
      extFile == "png"
    ) {
      // Create a referene of where the files will be stored
      const storageRef = ref(storage, `/songs/${files[0]["name"]}`);
      const audioStorageRef = ref(storage, `/songs/${songFiles["name"]}`);

      // progress can be paused and resumed. It also exposes progress updates.
      const uploadArtworkTask = uploadBytesResumable(storageRef, files[0]);
      const uploadSongTask = uploadBytesResumable(audioStorageRef, songFiles);

      uploadSongTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          // update progress
          setPercent(percent);
          console.log(percent);
          setLoading(true);
        },
        (err) => console.log(err),
        async () => {
          // download url
          // Receives the storage reference and the file to upload.
          const imageUrl = await getDownloadURL(uploadArtworkTask.snapshot.ref);

          getDownloadURL(uploadSongTask.snapshot.ref).then(async (url) => {
            try {
              console.log("GOing in");
              await setDoc(doc(db, "songs", `${new Date().getTime()} `), {
                ...newSongItem,
                id: `${new Date().getTime()} `,
                artwork: imageUrl,
                url: url,
              });
              getContent();
              toast.success(`Successfully uploaded a new song..`, {
                theme: "dark",
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
              });
              setLoading(false);
            } catch (err) {
              console.error(err);
              toast.error(err.message, {
                theme: "dark",
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
              });
              setLoading(false);
            }
          });
        }
      );
    } else {
      alert("Only jpg/jpeg and png files are allowed!");
      setLoading(false);
    }
  };

  const deleteItem = async (song) => {
    console.log(song);
    setLoading(true);

    const querySnapshot = await getDocs(collection(db, "songs"));

    querySnapshot.forEach(async (item) => {
      console.log(item);
      if (item.data().title === song.title) {
        await deleteDoc(doc(db, "songs", item.id), {
          ...song,
        });

        console.log("Done deleting");
        getContent();
      }
    });
  };

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
    <Box sx={{ padding: "2.5rem", color: "#eee", minHeight: "100vh" }}>
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
              variant="determinate"
              value={percent}
              sx={{ color: "" }}
            />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#eee",
              }}
            >
              <Typography
                variant="caption"
                component="div"
                color="text.secondary"
                sx={{ color: "#eee", fontSize: "32px" }}
              >{`${Math.round(percent)}%`}</Typography>
            </Box>
          </Box>
        </Box>
      ) : (
        <>
          <Box
            sx={{
              width: `${percent}%`,
              background: "rgba(1,1,1,.7)",
              height: "8px",
              position: "fixed",
              top: 0,
              left: "0",
            }}
          />
          <Grid container spacing={6}>
            <Grid item xs={12} lg={6}>
              <Typography
                variant="p"
                width={"100%"}
                color={"#eee"}
                sx={{ fontSize: { xs: "18px", md: "21px" } }}
                fontWeight={"300"}
              >
                Artist :{" "}
              </Typography>
              <TextField
                onChange={handleFieldChange}
                name="artist"
                type="text"
                helperText="Dj Shadzo , YKM or Karlo "
                placeholder="Artist"
                fullWidth
                sx={{
                  padding: "0",
                  margin: "12px 0",
                  color: "white",
                  "& .MuiOutlinedInput-root": {
                    border: "2px solid white",
                    color: "white",
                  },
                  "& .MuiOutlinedInput-root.Mui-focused": {
                    "& > fieldset": {
                      border: "1px solid white",
                      color: "#40e0d0",
                    },
                  },
                  "& .MuiOutlinedInput-root.Mui-focused": {
                    "& > fieldset": {
                      border: "1px solid white",
                      color: "#40e0d0",
                    },
                  },
                }}
              />

              <Typography
                variant="p"
                width={"100%"}
                color={"#eee"}
                sx={{ fontSize: { xs: "18px", md: "21px" } }}
                fontWeight={"300"}
              >
                Song Name :{" "}
              </Typography>
              <TextField
                onChange={handleFieldChange}
                name="title"
                type="text"
                helperText="Umlayezo or Ayayayayayaya"
                placeholder="Song Name"
                fullWidth
                sx={{
                  padding: "0",
                  margin: "12px 0",
                  color: "white",
                  "& .MuiOutlinedInput-root": {
                    border: "2px solid white",
                    color: "white",
                  },
                  "& .MuiOutlinedInput-root.Mui-focused": {
                    "& > fieldset": {
                      border: "1px solid white",
                      color: "#40e0d0",
                    },
                  },
                  "& .MuiOutlinedInput-root.Mui-focused": {
                    "& > fieldset": {
                      border: "1px solid white",
                      color: "#40e0d0",
                    },
                  },
                }}
              />

              <Typography
                variant="p"
                width={"100%"}
                color={"#eee"}
                sx={{ fontSize: { xs: "18px", md: "21px" } }}
                fontWeight={"300"}
              >
                Category :{" "}
              </Typography>
              <TextField
                onChange={handleFieldChange}
                name="category"
                type="select"
                select
                helperText="Umlayezo or Ayayayayayaya"
                placeholder="Song Name"
                fullWidth
                sx={{
                  padding: "0",
                  margin: "12px 0",
                  color: "white",
                  "& .MuiOutlinedInput-root": {
                    border: "2px solid white",
                    color: "white",
                  },
                  "& .MuiOutlinedInput-root.Mui-focused": {
                    "& > fieldset": {
                      border: "1px solid white",
                      color: "#40e0d0",
                    },
                  },
                  "& .MuiOutlinedInput-root.Mui-focused": {
                    "& > fieldset": {
                      border: "1px solid white",
                      color: "#40e0d0",
                    },
                  },
                }}
              >
                <MenuItem value="Original">Original</MenuItem>
                <MenuItem value="Remix">Remix</MenuItem>
                <MenuItem value="Mix">Mix</MenuItem>
              </TextField>

              <Typography
                variant="p"
                width={"100%"}
                color={"#eee"}
                sx={{ fontSize: { xs: "18px", md: "21px" } }}
                fontWeight={"300"}
              >
                Upload Song :{" "}
              </Typography>
              <TextField
                onChange={(e) => setSongFiles(e.target.files[0])}
                name="url"
                type="file"
                helperText="Umlayezo or Ayayayayayaya"
                placeholder="Song Name"
                fullWidth
                sx={{
                  padding: "0",
                  margin: "12px 0",
                  color: "white",
                  "& .MuiOutlinedInput-root": {
                    border: "2px solid white",
                    color: "white",
                  },
                  "& .MuiOutlinedInput-root.Mui-focused": {
                    "& > fieldset": {
                      border: "1px solid white",
                      color: "#40e0d0",
                    },
                  },
                  "& .MuiOutlinedInput-root.Mui-focused": {
                    "& > fieldset": {
                      border: "1px solid white",
                      color: "#40e0d0",
                    },
                  },
                }}
              />
              <Button
                sx={{
                  width: "100%",
                  padding: "21px",
                  background: "rgba(1,1,1,.9)",
                }}
                onClick={handleFileUpload}
              >
                Upload
              </Button>
            </Grid>
            <Grid item xs={12} lg={6}>
              <ImageDropZone files={files} setFiles={setFiles} />
            </Grid>
            <Grid
              item
              xs={12}
              lg={12}
              sx={{ display: Originals.length === 0 ? "none" : "block" }}
            >
              <Typography fontSize={"32px"} margin={"8px 0"}>
                Original
              </Typography>
              <Grid container spacing={6}>
                {Originals.map((song, index) => {
                  return (
                    <Grid key={index} item xs={12} sm={6} md={4} lg={2}>
                      <MusicItem
                        deleteItem={deleteItem}
                        song={song}
                        setOpen={setOpen}
                      />
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
                    <Grid key={index} item xs={12} sm={6} md={4} lg={2}>
                      <MusicItem
                        deleteItem={deleteItem}
                        song={song}
                        setOpen={setOpen}
                      />
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
                    <Grid key={index} item xs={12} sm={6} md={4} lg={2}>
                      <MusicItem
                        deleteItem={deleteItem}
                        song={song}
                        setOpen={setOpen}
                      />
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
}

export default Upload;

// <Typography variant="p" width={"100%"} color={"#eee"} sx={{ fontSize: { xs: "18px", md: "21px" } }} fontWeight={"300"}>Drag 'n' drop some files here, or click to select files : </Typography>
// <input className="custom-file-input" placeholder="Select Image Here" style={{ height:'auto' , width:'100%' , background:'rgba(1,1,1,.3)' }} type="file" onChange={handleFileChange} accept="/image/*" />

const thumbsContainer = {
  display: "flex",
  flexDirection: "column",
  flexWrap: "wrap",
  marginTop: 5,
  width: "100%",
  height: "100%",
  background: "#222",
};

const thumb = {
  borderRadius: 2,
  marginRight: 8,
  width: "100%",
  height: "100%",
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  width: "100%",
  height: "100%",
  // overflow: 'auto',
};

const img = {
  display: "block",
  width: "100%",
  height: "100%",
  objectFit: "contain",
};
const container = {
  // overflow:"auto"
};

const absolute = {
  position: "absolute",
  background: "red",
};

const MusicItem = (props) => {
  const { open, setOpen } = React.useContext(OpenSongContext);
  console.log(setOpen);
  return (
    <Box sx={{ width: "100%" }}>
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          height: "250px",
          color: "#eee",
          background: "rgba(200,200,200,.1)",
          "&:hover": { background: "rgba(200,200,200,.2)", scale: "1.03" },
          transition: "850ms",
          scale: "1.00",
          padding: "0 12px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
        }}
      >
        <Box
          sx={{
            height: "150px",
            background: `url("${props.song.artwork}")`,
            backgroundColor: "#000",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPostion: "center",
          }}
        />
        <Box sx={{ display: "flex", background: "", justifyContent: "center" }}>
          <Box
            sx={{
              display: "",
              background: "",
              flex: "8",
              justifyContent: "center",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <Typography
              noWrap
              sx={{ fontSize: "16px", fontWeight: "600", width: "100%" }}
            >
              {" "}
              {props.song.title}{" "}
            </Typography>
            <Typography noWrap sx={{ fontSize: "14px", fontWeight: "300" }}>
              {" "}
              {props.song.artist}{" "}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "",
              flex: "4",
            }}
          >
            <IconButton
              sx={{ color: "#eee" }}
              onClick={() => setOpen(props.song)}
            >
              <PlayCircleOutlineIcon
                sx={{
                  cursor: "pointer",
                  fontSize: "21px",
                  scale: "1.15",
                  transition: "800ms",
                  "&:hover": { scale: "1.3" },
                }}
              />
            </IconButton>
          </Box>
        </Box>
      </Paper>
      <Box
        sx={{
          height: "calc(32px + 12px)",
          background: "rgba(200,200,200,.3)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <IconButton
          sx={{ color: "#eee" }}
          onClick={() => props.deleteItem(props.song)}
        >
          <DeleteForeverOutlinedIcon
            sx={{
              cursor: "pointer",
              fontSize: "21px",
              scale: "1.15",
              transition: "800ms",
              "&:hover": { scale: "1.3" },
            }}
          />
        </IconButton>
      </Box>
    </Box>
  );
};

function ImageDropZone(props) {
  // fetch()
  const handleCheck = (e) => {
    console.log(e.target.value);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
      "image/jpeg": [".jpeg"],
    },
    onClick: (acceptedFiles) =>
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      ),

    // my drag and drop functionality
    onDrop: (acceptedFiles) => {
      props.setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = props.files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        {<img src={file.preview} style={img} />}
        {}
      </div>
      {/* <div style={{margin:"10px 0"},absolute}>file name: {file.name} </div> */}
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks
    props.files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [props.files]);

  return (
    <section className="container" style={container}>
      <div {...getRootProps({ className: "dropzone" })}>
        <input
          {...getInputProps()}
          onChange={() => {
            handleCheck;
          }}
        />
        <p style={{ fontSize: "12px", textTransform: "uppercase" }}>
          {"  Drag 'n' drop the songs thumbnail"}
        </p>
        <p
          style={{
            fontSize: "10px",
            textTransform: "uppercase",
            margin: "10px 0 5px 0",
          }}
        >
          Accepted files TYPES : {props.accepted_type}
        </p>
        <div style={{ height: "350px", width: "100%", padding: "0 0 10px 0" }}>
          <aside style={thumbsContainer}>{thumbs}</aside>
        </div>
      </div>
    </section>
  );
}
