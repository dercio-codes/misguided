import { useState , useEffect } from "react";
import { storage , googleProvider , facebookProvider , auth , db } from "./../firebase/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Box , LinearProgress , Grid , Paper , MenuItem } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Button , Divider , IconButton , CircularProgress ,Select ,Drawer ,OutlinedInput,TextField } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import { query, doc ,  collection, addDoc , deleteDoc , setDoc, getDocs, where } from "firebase/firestore";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import React from "react";
import { useDropzone } from "react-dropzone";
import { OpenSongContext } from "./_app" 
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { MusicItem } from "./../components/music/MusicItem";
import Link from "next/link";
import { Navbar } from "../components/navbar";
import SearchIcon from '@mui/icons-material/Search';

const Music = (props) => {

  // State to store uploaded file
  const [songs, setSongs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [loading, setLoading] = useState(false);
  const {open, setOpen} = React.useContext(OpenSongContext);
 
 

  const getContent = async () => {
    const local = []
    const querySnapshot = await getDocs(collection(db, "songs"));

    querySnapshot.forEach((item)=>{
        local.push(item.data())
    })
    console.log(local)
    setSongs(local)
    // setLoading(false)
  }

  useEffect(async()=>{
    getContent()
  },[])

  let Originals = []
  let Mixes = []
  let Remixes = []

  songs.map((song)=>{
    if(song.category === "Remix"){
      Remixes.push(song)
    }
    if(song.category === "Original"){
      Originals.push(song)            
    }
    if(song.category === "Mix"){
      Mixes.push(song)            
    }
  })

    
    return (
        <Box sx={{ padding:'' , color:'#eee' , minHeight:'100vh' , overflowY:'auto' , background:'#111' }}>
        <Navbar />
        <Box sx={{ padding:'2.5rem' , color:'#eee' ,  }}>
              <Box sx={{ width:'100%' , background:'' , display:'flex' , alignItems:'center' , justifyContent:'space-between' }} >
            <Box>
             <Typography fontSize={"42px"} margin={"0px 0"} fontWeight={"600"} >Music</Typography>
             <Divider sx={{ margin:'0px 0 21px 0' , width:'32px' , background:'#999' ,  }} />
            </Box>
            <Box sx={{ display:'flex' , alignItems:'center' }}>
             <TextField onChange={(e)=>{setSearchQuery(e.target.value)}} name="artist" type="text"  placeholder="Song Artist or Song Name..." fullWidth sx={{
                            padding: "0", margin: '12px 0', borderRadius:'0',
                            color:'white',
                            "& .MuiOutlinedInput-root": { border: '2px solid white' , color:'white' },
                            "& .MuiOutlinedInput-root.Mui-focused": { "& > fieldset": { border: '1px solid white', color: '#40e0d0' } },
                            "& .MuiOutlinedInput-root.Mui-focused": { "& > fieldset": { border: '1px solid white', color: '#40e0d0' } }
                        }} />
             <Button sx={{ height:'100%' , background:'#eee' , padding:'18px 0' }} >
             <SearchIcon sx={{ color:"#111" }} />
             </Button>
            </Box>
              </Box>
        {
        loading ? (
          <Box sx={{ height:'50vh' , background:'' , display:'flex' , justifyContent:'center' , alignItems
          :'center' , margin:'21px 0' }}>
         <Box sx={{ position: 'relative', display: 'inline-flex' , scale:'12rem' }}>
      <CircularProgress size={"12rem"} variant="determinate" value={percent} sx={{ color:'' }} />
      </Box>
    </Box>
          ) : (
          <>
        <Grid container spacing={6}>
             <Grid item xs={12} lg={12} sx={{ display:Originals.length === 0 ? "none" : "block" }}>
             <Box sx={{ display:'flex' , justifyContent:'space-between' , alignItems:'center' }}>

			 	<Typography fontSize={"32px"} margin={"8px 0"} >Original</Typography>
             
             </Box>
             <Grid container spacing={6}>


              {
                    Originals.map((song , index)=>{
                     if(searchQuery.trim() === ""){
                       return(
                       <Grid key={index} item xs={12} sm={6} md={4} lg={2} >
                          <MusicItem song={song} setOpen={setOpen} />
                        </Grid>
                      )
                     }else if(song.title.toLowerCase().includes(searchQuery.toLowerCase()) || song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ){
                       return(
                       <Grid key={index} item xs={12} sm={6} md={4} lg={2} >
                          <MusicItem song={song} setOpen={setOpen} />
                        </Grid>
                      )
                     } 
                    })
              }
             </Grid>
             </Grid>

             <Grid item xs={12} lg={12} sx={{ display:Mixes.length === 0 ? "none" : "block" }} >
             <Typography fontSize={"32px"} margin={"8px 0"} >Mixes</Typography>
             <Grid container spacing={6}>


              { 
                  Mixes.map((song , index)=>{
                      return(
                       <Grid key={index} item xs={12} sm={6} md={4} lg={2}>
                          <MusicItem song={song} setOpen={setOpen} />
                        </Grid>
                      ) 
                    })
                 
              }
             </Grid>
             </Grid>

             <Grid item xs={12} lg={12} sx={{ display:Remixes.length === 0 ? "none" : "block" }} >
             <Typography fontSize={"32px"} margin={"8px 0"} >Remixes</Typography>
             <Grid container spacing={6}>


              { 
                    Remixes.map((song , index)=>{
                      return(
                       <Grid key={index} item xs={12} sm={6} md={4} lg={2}>
                          <MusicItem song={song} setOpen={setOpen} />
                        </Grid>
                      ) 
                    })
              }
             </Grid>
             </Grid>



            </Grid>


            </>
            )
      }
          
        </Box>
        </Box>
    );
}                            
export default Music;