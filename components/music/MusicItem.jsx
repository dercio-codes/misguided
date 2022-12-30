import { useState , useEffect } from "react";
import { storage , googleProvider , facebookProvider , auth , db } from "./../../firebase/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Box , LinearProgress , Grid , Paper , MenuItem } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Button , IconButton , CircularProgress ,Select ,Drawer ,OutlinedInput,TextField } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import { query, doc ,  collection, addDoc , deleteDoc , setDoc, getDocs, where } from "firebase/firestore";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import React from "react";
import { useDropzone } from "react-dropzone";
import { OpenSongContext } from "./../../pages/_app" 
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import Link from "next/link";


export const MusicItem = (props) => {
    const {open, setOpen} = React.useContext(OpenSongContext);
    console.log(setOpen)
  return(
    <Box sx={{ width:'100%' }} >
    <Paper elevation={3} sx={{ width:'100%' , height:'300px' , color:'#eee' , background:'rgba(200,200,200,.1)' , "&:hover":{ background:'rgba(200,200,200,.2)' , scale:'1.03' }, transition:'850ms' , scale:'1.00'  , padding:'0 12px' , display:'flex' , flexDirection:'column' , justifyContent:'space-evenly' }}>
                <Box sx={{ height:'200px' , background:`url("${props.song.artwork}")` , backgroundSize:'cover' , backgroundRepeat:'no-repeat' , backgroundPostion:'center'  }}/>
                <Box sx={{ display:'flex' , background:''  ,justifyContent:"center" ,  }}>
                <Box sx={{ display:'flex' , flexDirection:'column' , background:'' , flex:'10' , justifyContent:"center"}}>
                <Typography noWrap={true} sx={{ fontSize:'16px' , fontWeight:'600' }} > {props.song.title} </Typography>
                <Typography noWrap={true} sx={{ fontSize:'14px' , fontWeight:'300' }} > {props.song.artist} </Typography>
                </Box>
                <Box sx={{ display:'flex' , flexDirection:'column' , justifyContent:'center' , alignItems:'center' , background:'' , flex:'2' }}>
                                  <IconButton sx={{ color:'#eee'}} onClick={()=> setOpen(props.song)} >
                  <PlayCircleOutlineIcon sx={{ cursor:'pointer', fontSize:'21px' , scale:'1.15' , transition:'800ms' , "&:hover":{scale:'1.3'} }} />
                </IconButton>
                                                  <IconButton sx={{ color:'#eee'}} onClick={()=> setOpen(props.song)} >
                  <Link href={props.song.url}>
                  <a>
                  <CloudDownloadIcon sx={{ cursor:'pointer', fontSize:'21px' , scale:'1.15' , transition:'800ms' , "&:hover":{scale:'1.3'} }} />
                  </a>
                  </Link>
                </IconButton>
                

</Box>
                </Box>
              </Paper>
              

    </Box>
    )
}
