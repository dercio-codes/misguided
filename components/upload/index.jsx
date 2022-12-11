import { useState , useEffect } from "react";
import { storage , googleProvider , facebookProvider , auth , db } from "./../../firebase/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Box , LinearProgress , Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Button , CircularProgress ,Select ,Drawer ,OutlinedInput ,MenuItem,TextField } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import { query, doc ,  collection, addDoc , setDoc, getDocs, where } from "firebase/firestore";

import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import React from "react";
import { useDropzone } from "react-dropzone";


function Upload() {

    // State to store uploaded file
    const [files, setFiles] = useState([]);
    const [newImage, SetNewImage] = useState("");
    const [newSongItem, setNewSongItem] = useState({
      artist:"",
    	songName:"",
    	thumbnail:"",
    });
    const [loading, setLoading] = useState(false);
 
    // progress
    const [percent, setPercent] = useState(0);
 

    // Handle file upload event and update state
    function handleFileChange(event) {
        setFile(event.target.files[0]);
    }

	const [preview, setPreview] = useState()


  const handleFieldChange = (e) => {
      setNewSongItem({
          ...newSongItem,
          [e.target.name]: e.target.value,
      })
      console.log(newSongItem)
    
  }


 // useEffect(() => {
 //        if (!files) {
 //            setPreview(undefined)
 //            return
 //        }

 //        const objectUrl = URL.createObjectURL(files)
 //        setPreview(objectUrl)

 //        // free memory when ever this component is unmounted
 //        return () => URL.revokeObjectURL(objectUrl)
 //    }, [files])


    const handleFileUpload = async () => {
        const fileName = files.name
        const idxDot = fileName.lastIndexOf(".") + 1;
        const extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
    
        if (!file) {
          alert("Please upload an image first!");
        }
    
        if (extFile == "mp3" || extFile == "mp4" || extFile == "m4a" || extFile == "wav") {
          const storageRef = ref(storage, `/songs/${file.name}`);
    
          // progress can be paused and resumed. It also exposes progress updates.
          // Receives the storage reference and the file to upload.
          const uploadTask = uploadBytesResumable(storageRef, file);
    
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const percent = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
    
              // update progress
              setPercent(percent);
            },
            (err) => console.log(err),
            () => {
              // download url
              getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
                console.log(url);
                try {
                  await setDoc(doc(db, "songs", `${new Date().getTime()} `), {
                    ...newSongItem,
                    imageSource: url,
                  });
                 
                } catch (err) {
                  console.error(err);
                  alert(err.message);
                }
              });
            }
          );
        } else {
          alert("Only jpg/jpeg and png files are allowed!");
        }
      };

    // const handleFileUpload =  async() => {

    //      if (!file) {
    //         alert("Please upload an image first!");
    //     }
 
    //     const storageRef = ref(storage, `/products/${file.name}`);
 
    //     // progress can be paused and resumed. It also exposes progress updates.
    //     // Receives the storage reference and the file to upload.
    //     const uploadTask = uploadBytesResumable(storageRef, file);
 
    //     uploadTask.on(
    //         "state_changed",
    //         (snapshot) => {
    //             const percent = Math.round(
    //                 (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    //             );
 
    //             // update progress
    //             setPercent(percent);
    //         },
    //         (err) => console.log(err),
    //         () => {
    //             // download url
    //             getDownloadURL(uploadTask.snapshot.ref).then( async (url) => {
    //                 console.log(url);
    //                 try {
    //                    await setDoc(doc(db, "images", `${new Date().getTime()} `), {
    //                             ...newSongItem,
    //                             imageSource:url,
    //                     });
    //                    	history.push("/all-images")
    //                 } catch (err) {
    //                   console.error(err);
    //                   alert(err.message);
    //                 }

    //             });
    //         }
    //     );
    // };


    
    return (
        <Box sx={{ padding:'2.5rem' , color:'#eee' , minHeight:'200vh' }}>
        {
        loading ? (
          <Box sx={{ height:'50vh' , background:'' , display:'flex' , justifyContent:'center' , alignItems
          :'center' , margin:'21px 0' }}>
          <CircularProgress size={"12.5rem"} sx={{ margin:"25vh auto" }} />
          </Box>
          ) : (
          <>
        <Box sx={{ width:`${percent}%` , background:'rgba(1,1,1,.7)' , height:'8px' , position:'fixed' , top:0 , left:'0' }} />
            <Grid container spacing={6}>
            <Grid item xs={12} lg={6}>
                                    <Typography variant="p" width={"100%"} color={"#eee"} sx={{ fontSize: { xs: "18px", md: "21px" } }} fontWeight={"300"}>Artist : </Typography>
                        <TextField onChange={handleFieldChange} name="artist" type="text" helperText="Dj Shadzo , YKM or Karlo " placeholder="Artist" fullWidth sx={{
                            padding: "0", margin: '12px 0',
                            color:'white',
                            "& .MuiOutlinedInput-root": { border: '2px solid white' , color:'white' },
                            "& .MuiOutlinedInput-root.Mui-focused": { "& > fieldset": { border: '1px solid white', color: '#40e0d0' } },
                            "& .MuiOutlinedInput-root.Mui-focused": { "& > fieldset": { border: '1px solid white', color: '#40e0d0' } }
                        }} />

                        <Typography variant="p" width={"100%"} color={"#eee"} sx={{ fontSize: { xs: "18px", md: "21px" } }} fontWeight={"300"}>Song Name : </Typography>
                        <TextField onChange={handleFieldChange} name="songName" type="text" helperText="Umlayezo or Ayayayayayaya" placeholder="Song Name" fullWidth sx={{
                            padding: "0", margin: '12px 0',
                            color:'white',
                            "& .MuiOutlinedInput-root": { border: '2px solid white' , color:'white' },
                            "& .MuiOutlinedInput-root.Mui-focused": { "& > fieldset": { border: '1px solid white', color: '#40e0d0' } },
                            "& .MuiOutlinedInput-root.Mui-focused": { "& > fieldset": { border: '1px solid white', color: '#40e0d0' } }
                        }} />


                        <Typography variant="p" width={"100%"} color={"#eee"} sx={{ fontSize: { xs: "18px", md: "21px" } }} fontWeight={"300"}>Upload Song : </Typography>
                        <TextField onChange={handleFieldChange} name="songFile" type="file" helperText="Umlayezo or Ayayayayayaya" placeholder="Song Name" fullWidth sx={{
                            padding: "0", margin: '12px 0',
                            color:'white',
                            "& .MuiOutlinedInput-root": { border: '2px solid white' , color:'white' },
                            "& .MuiOutlinedInput-root.Mui-focused": { "& > fieldset": { border: '1px solid white', color: '#40e0d0' } },
                            "& .MuiOutlinedInput-root.Mui-focused": { "& > fieldset": { border: '1px solid white', color: '#40e0d0' } }
                        }} />
            <Button sx={{ width:'100%' , padding:'21px' , background:'rgba(1,1,1,.9)' }} onClick={handleFileUpload}>Upload</Button>
            <p>{percent} % done</p>
            </Grid>
                        <Grid item xs={12} lg={6}>
                <ImageDropZone files={files} setFiles={setFiles} />

                     
            </Grid>
             <Grid item xs={12} lg={12}>
            </Grid>
            </Grid>


            </>
            )
      }
          
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

function ImageDropZone(props) {
  // fetch()
  const handleCheck = (e) => {
    console.log(e.target.value);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/png': ['.png'],
      'image/jpg': ['.jpg'],
      'image/jpeg': ['.jpeg'],
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
