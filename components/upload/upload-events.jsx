import { useState , useEffect } from "react";
import { storage , googleProvider , facebookProvider , auth , db } from "./../../firebase/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Box , LinearProgress , Grid , Paper , MenuItem } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Button , Radio , IconButton , CircularProgress ,Select ,Drawer ,OutlinedInput,TextField } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import { query, doc ,  collection, addDoc , deleteDoc , setDoc, getDocs, where } from "firebase/firestore";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import React from "react";
import { useDropzone } from "react-dropzone";
import { OpenSongContext } from "./../../pages/_app" 
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { ToastContainer, toast } from 'react-toastify';

function UploadEvents() {

    // State to store uploaded file
    const [files, setFiles] = useState([]);
    const [events, setEvents] = useState([]);
    const [songFiles, setSongFiles] = useState([]);
    const [newImage, SetNewImage] = useState("");
    const [newEventItem, setNewEventItem] = useState(  {
    event_name: "",
    number_of_table_bookings_accepted: "",
    indoor_or_outdoor_option: false ,
    image:"",

  });
    const [loading, setLoading] = useState(false);
    const {open, setOpen} = React.useContext(OpenSongContext);
 
    // progress
    const [percent, setPercent] = useState(0);
 

    // Handle file upload event and update state
    function handleFileChange(event) {
        setFile(event.target.files);
    }

	const [preview, setPreview] = useState()

  const handleFieldChange = (e) => {
      setNewEventItem({
          ...newEventItem,
          [e.target.name]: e.target.value,
      })
      console.log(newEventItem)
    
  }

  const getContent = async () => {
    const local = []
    const querySnapshot = await getDocs(collection(db, "events"));

    querySnapshot.forEach((item)=>{
        local.push(item.data())
    })
    console.log(local)
    setEvents(local)
    setLoading(false)
  }

  useEffect(async()=>{
    getContent()
  },[])


    const handleFileUpload = async () => {
        const fileName = files[0]["name"]
        const idxDot = fileName.lastIndexOf(".") + 1;
        const extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
    
        if (!files || files.length === 0 ) {
           toast.error(`Please upload an image first!`, {
                    theme:"dark",
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                  });  
        }

    
        if (extFile == "jpg" || extFile == "gif" || extFile == "jpeg" || extFile == "png") {
          // Create a referene of where the files will be stored
          const storageRef = ref(storage, `/events/${files[0]["name"]}`);

          // progress can be paused and resumed. It also exposes progress updates.
          const uploadArtworkTask =  uploadBytesResumable(storageRef, files[0]);
          
          uploadArtworkTask.on(
            "state_changed",
            (snapshot) => {
              const percent = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
    
              // update progress
              setPercent(percent);
              console.log(percent)
              setLoading(true)
            },
            (err) => console.log(err),
            async () => {
              // download url
              // Receives the storage reference and the file to upload.

              getDownloadURL(uploadArtworkTask.snapshot.ref).then(async (url) => {
                
                 try {
              console.log("GOing in")
              await setDoc(doc(db, "events", `${new Date().getTime()} `), {
                ...newEventItem,
                image:url
              });
              getContent()
              toast.success(`Successfully uploaded a new event..`, {
                    theme:"dark",
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                  });  
              setLoading(false)

          } catch (err) {
              console.error(err);
               toast.error(err.message, {
                    theme:"dark",
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                  });  
          }


              });
            }
          );

        } else {
          alert("Only jpg/jpeg and png files are allowed!");
        }
      };

   
    const deleteItem = async (song) => {
      console.log(song)
      setLoading(true)

      const querySnapshot = await getDocs(collection(db, "events"));

      querySnapshot.forEach(async (item) => {
        console.log(item)
        if (item.data().event_name === song.event_name) {
          await deleteDoc(doc(db, "events", item.id), {
            ...song,
          });
  
            console.log("Done deleting")
             toast.success(`Successfully deleted event..`, {
                    theme:"dark",
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                  });  
            getContent()
          }
      });
    }

    
    return (
        <Box sx={{ padding:'2.5rem' , color:'#eee' , minHeight:'100vh' }}>
        {
        loading ? (
          <Box sx={{ height:'50vh' , background:'' , display:'flex' , justifyContent:'center' , alignItems
          :'center' , margin:'21px 0' }}>
         <Box sx={{ position: 'relative', display: 'inline-flex' , scale:'12rem' }}>
      <CircularProgress size={"12rem"} variant="determinate" value={percent} sx={{ color:'' }} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color:"#eee"
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
          sx={{ color:'#eee', fontSize:'32px' }}
        >{`${Math.round(percent)}%`}</Typography>
      </Box>
    </Box>
         </Box>
          ) : (
          <>


            <Grid container spacing={6}>
            {
            	events.map((event , index)=>{

            		return(
            			<Grid item keey={index} xs={4} lg={2} sx={{ padding:'12px' , }} >
            		 <Box sx={{ width:'100%' , height:'300px' , color:'#eee' , background:'rgba(1,1,1,.1)' , "&:hover":{ background:'rgba(200,200,200,.2)' , scale:'1.03' }, transition:'850ms' , scale:'1.00'  , padding:'12px' , display:'flex' , flexDirection:'column' , justifyContent:'space-evenly' , alignItems:'center' }}>
                <Box sx={{ minHeight:'200px' , width:'100%' , background:`url("${event.image}")` , backgroundSize:'contain' , backgroundRepeat:'no-repeat' , backgroundPosition:'center'  }}/>
                <Box sx={{ display:'' , background:'' , flex:'8' , margin:'12px 0' , justifyContent:"center"}}>
                <Typography noWrap={true} sx={{ fontSize:'16px' , fontWeight:'600' , textAlign:'center' }} > {event.event_name} </Typography>
                <Typography noWrap={true} sx={{ fontSize:'16px' , fontWeight:'300' , textAlign:'center' }} > {event.indoor_or_outdoor_option ? "Indoor and Outdoor" : "Indoor Only"}</Typography>
                <Typography noWrap={true} sx={{ fontSize:'14px' , fontWeight:'300' , textAlign:'center' }} > {event.number_of_table_bookings_accepted + " table bookings remaining"} </Typography>
                </Box>

              </Box>
              <Box sx={{ height:'calc(32px + 12px)' , background:'rgba(200,200,200,.3)' , display:'flex' , justifyContent:'center' , alignItems:'center' }} >
                <IconButton sx={{ color:'#eee'}} onClick={()=> deleteItem(event)} >
                  <DeleteForeverOutlinedIcon sx={{ cursor:'pointer', fontSize:'21px' , scale:'1.15' , transition:'800ms' , "&:hover":{scale:'1.3'} }} />
                </IconButton>

              </Box>
            		</Grid>)
            	})
            }

            <Grid item xs={12} >
                                    <Typography variant="p" width={"100%"} color={"#eee"} sx={{ fontSize: { xs: "18px", md: "21px" } }} fontWeight={"300"}>Event Name : </Typography>
                        <TextField onChange={handleFieldChange} name="event_name" type="text" helperText="Old School Friday`s " placeholder="Event Name" fullWidth sx={{
                            padding: "0", margin: '12px 0',
                            color:'white',
                            "& .MuiOutlinedInput-root": { border: '2px solid white' , color:'white' },
                            "& .MuiOutlinedInput-root.Mui-focused": { "& > fieldset": { border: '1px solid white', color: '#40e0d0' } },
                            "& .MuiOutlinedInput-root.Mui-focused": { "& > fieldset": { border: '1px solid white', color: '#40e0d0' } }
                        }} />


                        <Typography variant="p" width={"100%"} color={"#eee"} sx={{ fontSize: { xs: "18px", md: "21px" } }} fontWeight={"300"}>Number of Table Bookings Accepted : </Typography>
                        <TextField onChange={handleFieldChange} name="number_of_table_bookings_accepted" type="number" min={"4"} max={"14"}  placeholder="6" fullWidth sx={{
                            padding: "0", margin: '12px 0',
                            color:'white',
                            "& .MuiOutlinedInput-root": { border: '2px solid white' , color:'white' },
                            "& .MuiOutlinedInput-root.Mui-focused": { "& > fieldset": { border: '1px solid white', color: '#40e0d0' } },
                            "& .MuiOutlinedInput-root.Mui-focused": { "& > fieldset": { border: '1px solid white', color: '#40e0d0' } }
                        }} />


                        <Radio checked={newEventItem.indoor_or_outdoor_option} onClick={()=> setNewEventItem({...newEventItem , indoor_or_outdoor_option : !newEventItem.indoor_or_outdoor_option }) } sx={{ color:'#eee' , margin:'21px 0' }} />
                        <Typography variant="p" width={"100%"} color={"#eee"} sx={{ fontSize: { xs: "18px", md: "21px" } }} fontWeight={"300"}>Indoor and Outdoor : </Typography>

            
            </Grid>
                        <Grid item xs={12}>
                <ImageDropZone files={files} setFiles={setFiles} />

            <Button sx={{ width:'100%' , padding:'21px' , background:'rgba(1,1,1,.9)' }} onClick={handleFileUpload}>Upload</Button>
                     
            </Grid>
           



            </Grid>


            </>
            )
      }
          
        </Box>
    );
}
 
export default UploadEvents;

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
    const {open, setOpen} = React.useContext(OpenSongContext);
    console.log(setOpen)
  return(
    <Box sx={{ width:'100%' }} >
    <Paper elevation={3} sx={{ width:'100%' , height:'300px' , color:'#eee' , background:'rgba(200,200,200,.1)' , "&:hover":{ background:'rgba(200,200,200,.2)' , scale:'1.03' }, transition:'850ms' , scale:'1.00'  , padding:'0 12px' , display:'flex' , flexDirection:'column' , justifyContent:'space-evenly' }}>
                <Box sx={{ height:'200px' , background:`url("${props.song.artwork}")` , backgroundSize:'cover' , backgroundRepeat:'no-repeat' , backgroundPostion:'center'  }}/>
                <Box sx={{ display:'flex' , background:''  ,justifyContent:"center" }}>
                <Box sx={{ display:'' , background:'' , flex:'8' , justifyContent:"center"}}>
                <Typography noWrap={true} sx={{ fontSize:'16px' , fontWeight:'600' }} > {props.song.title} </Typography>
                <Typography noWrap={true} sx={{ fontSize:'14px' , fontWeight:'300' }} > {props.song.artist} </Typography>
                </Box>
                <Box sx={{ display:'flex' , justifyContent:'center' , alignItems:'center' , background:'' , flex:'4' }}>
                                  <IconButton sx={{ color:'#eee'}} onClick={()=> setOpen(props.song)} >
                  <PlayCircleOutlineIcon sx={{ cursor:'pointer', fontSize:'21px' , scale:'1.15' , transition:'800ms' , "&:hover":{scale:'1.3'} }} />
                </IconButton>

</Box>
                </Box>
              </Paper>
              <Box sx={{ height:'calc(32px + 12px)' , background:'rgba(200,200,200,.3)' , display:'flex' , justifyContent:'center' , alignItems:'center' }} >
                <IconButton sx={{ color:'#eee'}} onClick={()=>props.deleteItem(props.song)} >
                  <DeleteForeverOutlinedIcon sx={{ cursor:'pointer', fontSize:'21px' , scale:'1.15' , transition:'800ms' , "&:hover":{scale:'1.3'} }} />
                </IconButton>

              </Box>

    </Box>
    )
}

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
