import { Cancel, CloseOutlined } from "@mui/icons-material";
// import { Box, Modal, Typography } from "@mui/material"
import PhoneIcon from '@mui/icons-material/Phone';
import { Box, Select, Modal,Drawer ,  MenuItem, IconButton, Button, Grid, Typography, TextField, Stack, Divider } from "@mui/material"
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import SendIcon from "@mui/icons-material/Send";
import { useSnackbar } from "notistack";
import axios from "axios";
import { GooSpinner } from "react-spinners-kit";
import { PropagateLoader } from "react-spinners";

export const TableBookings = ({ state, openEvent }) => {
    const { openTableBooking, setOpenTableBooking } = state;
    return (
        <Modal open={openTableBooking} onBackdropClick={() => { setOpenTableBooking(false) }} sx={{ border: 'none', display: 'flex', alignItems: 'center' , background:'transparent' ,justifyContent:'center' }}>
            <Box sx={{ background: '', height: '100vh', overflow: 'auto', padding: '21px', margin: 'auto 0', border: 'none', width: '100%', display: 'flex', alignItems: 'center' , justifyContent:'center' }}>

                <BookTable openEvent={openEvent} setOpenTableBooking={setOpenTableBooking} />

            </Box>

        </Modal>
    )
}


const BookTable = ({ openEvent, setOpenTableBooking }) => {

    const enqueueSnackbar = useSnackbar();
    const [isProcessing,setIsProcessing] = useState(false)
    const [booking, setBooking] = useState({
        event_name: openEvent.title,
        indoor_or_outdoor: "",
        name: "",
        cell:"",
        email:"",
        num_of_people:0,
        names_of_people:[]
    });
    const [newName, setNewName] = useState("")

    const removeName = (item) => {
        const copy = booking.names_of_people.filter(function(value) {
            return item !== value
        })
        setBooking({
            ...booking,
            names_of_people: copy,
        })
    }

    const handleNames = (e) => {
        setNewName(e.target.value)
    }

    const submitName = () => {
        if(booking.names_of_people.length < booking.num_of_people ){
            if(newName == ""){
                toast.error(`Please enter name for person at table..`, {
                    theme:"dark",
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                  });  
            }else if(booking.names_of_people.includes(newName)){
                toast.error(`Already added this person.Please add a last name.`, {
                    theme:"dark",
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                  });  
            }
            else{
                setBooking({
                    ...booking,
                    names_of_people: [...booking.names_of_people , newName],
                })
                setNewName("")
            }
        }else{
            toast.error(`Exceeded the limit set on number of people by table.`, {
                theme:"dark",
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
              });  
        }
    }

    const handleFieldChange = (e) => {
        setBooking({
            ...booking,
            [e.target.name]: e.target.value,
        })

        console.log(booking)
    }

    // const handleSubmit = ()  =>  console.log(booking)
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsProcessing(true);
        console.log(booking)

        if(booking.names_of_people.length < booking.num_of_people){
            toast.error(`Names entered does not match the number of people you booked the table for.`, {
                theme:"dark",
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
              });
        }else{    
        const bookingValues = Object.values(booking);
    
        if (bookingValues.includes("")) {
            toast.error(`Fill in all fields`, {
                theme:"dark",
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
              });

          setIsProcessing(false);
        } else {
          axios
            .post("/api/email", {
              event_name: booking.event_name,
              indoor_or_outdoor: booking.indoor_or_outdoor,
              name: booking.name,
              num_of_people: booking.num_of_people,
              names_of_people: booking.names_of_people,
              cell: booking.cell,
              email: booking.email,
              image_link:"https://misguided.vercel.app/" + openEvent.img
            })
            .then((res) => {
              if (res.data.message == "MAIL_SENT") {
                toast.success("Email Succesfully sent to Misguided.", {
                    theme:"dark",
                    position: "top-right",
                    icon:"🚀",
                    autoClose: 5000,
                    hideProgressBar: false,
                  });
    
                setBooking({
                    event_name: openEvent.title,
                    indoor_or_outdoor: "",
                    name: "",
                    num_of_people:0,
                    names_of_people:[]
                });
    
                setIsProcessing(false);
              } else {
                toast.error(`Failed to send email : ${res.data.err.message}`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                  });
    
                setIsProcessing(false);
              }
            })
            .catch((err) => {
                console.log(err)
                alert(err.mesage)
            //   enqueueSnackbar(`Failed to send email : ${err.message}`, {
            //     variant: "error",
            //   });
    
        });
        setIsProcessing(false);
        setOpenTableBooking(false)
        }
    }

      };

    return (
        <Box id="book-now" sx={{ background: '#111', margin: 'suto 0', padding: "32px", maxHeight:'80vh' , overflowY:'auto' }}>
            <Box sx={{ background: '', width: { lg: '100%', xs: '100%' }, padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', }}>
                    <IconButton sx={{ background: '', border: '3px solid #eee', width: '80px', height: '80px' }}>

                        <PhoneIcon sx={{ fontSize: '32px', color: '#eee' }} />
                    </IconButton >
                    <Typography variant="p" width={"100%"} color={"#eee"} sx={{ margin: '0 16px', fontSize: { xs: "32px", md: "54px" }, textAlign: '' }} fontWeight={"600"}>Book Table</Typography>

                </Box>
                <Box sx={{ width: '150px', height: '150px', background: '', backgroundRepeat:'no-repeat' , backgroundPostion: 'center', backgroundImage: `url(${openEvent.img})`, backgroundSize: 'contain' }} />
            </Box>
            <Stack sx={{ padding: '21px 4px', background: '' }}>
                <Typography variant="p" width={"100%"} color={"#eee"} sx={{ margin: '12px 0 28px 0 ', fontSize: { xs: "18px", md: "18px" }, textAlign: '' }} fontWeight={"400"}>Fill in the form below and we will respond back to you.</Typography>

                <Grid container columnSpacing={12}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="p" width={"100%"} color={"#eee"} sx={{ fontSize: { xs: "18px", md: "21px" } }} fontWeight={"300"}>Name : </Typography>
                        <TextField onChange={handleFieldChange} name="name" placeholder="John Doe." fullWidth sx={{
                            padding: "0", margin: '12px 0',color:'white',
                            "& .MuiOutlinedInput-root": { border: '2px solid white' },
                            "& .MuiOutlinedInput-root.Mui-focused": { "& > fieldset": { border: '3px solid white', color: '#40e0d0' } },
                            "& .MuiOutlinedInput-root.Mui-focused": { "& > fieldset": { border: '3px solid white', color: '#40e0d0' } }
                        }} />

                        <Typography variant="p" width={"100%"} color={"#eee"} sx={{ fontSize: { xs: "18px", md: "21px" } }} fontWeight={"300"}>Cell Number : </Typography>
                        <TextField pattern="[0-9]+" onChange={handleFieldChange} name="cell" placeholder="011 - 123 - 4545" fullWidth sx={{
                            padding: "0", margin: '12px 0',color:'white',
                            "& .MuiOutlinedInput-root": { border: '2px solid white' },
                            "& .MuiOutlinedInput-root.Mui-focused": { "& > fieldset": { border: '3px solid white', color: '#40e0d0' } },
                            "& .MuiOutlinedInput-root.Mui-focused": { "& > fieldset": { border: '3px solid white', color: '#40e0d0' } }
                        }} />


                        <Typography variant="p" width={"100%"} color={"#eee"} sx={{ fontSize: { xs: "18px", md: "21px" } }} fontWeight={"300"}>Email : </Typography>
                        <TextField onChange={handleFieldChange} name="email" placeholder="mail@example.com" fullWidth sx={{
                            padding: "0", margin: '12px 0',color:'white',
                            "& .MuiOutlinedInput-root": { border: '2px solid white' },
                            "& .MuiOutlinedInput-root.Mui-focused": { "& > fieldset": { border: '3px solid white', color: '#40e0d0' } },
                            "& .MuiOutlinedInput-root.Mui-focused": { "& > fieldset": { border: '3px solid white', color: '#40e0d0' } }
                        }} />

                        <Typography variant="p" width={"100%"} color={"#eee"} sx={{ fontSize: { xs: "18px", md: "21px" } }} fontWeight={"300"}>Indoor or Outdoor : </Typography>
                        <Select onChange={handleFieldChange} name="indoor_or_outdoor" value={booking.indoor_or_outdoor} fullWidth sx={{
                            padding: "0", margin: '12px 0', color:'white',                            "& .MuiOutlinedSelect-root": { border: '2px solid white' },
                            "& .MuiOutlinedSelect-root.Mui-focused": { "& > fieldset": { border: '3px solid white', color: '#40e0d0' } },
                            "& .MuiOutlinedSelect-root.Mui-focused": { "& > fieldset": { border: '3px solid white', color: '#40e0d0' } }
                        }}>
                            <MenuItem value="Indoor">Indoor </MenuItem>
                            <MenuItem value="Outdoor">Outdoor </MenuItem>
                        </Select>




                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="p" width={"100%"} color={"#eee"} sx={{ fontSize: { xs: "18px", md: "21px" } }} fontWeight={"300"}>Number of People at Table : </Typography>
                        <TextField onChange={handleFieldChange} name="num_of_people" type="number" min={2} max={12} placeholder="6" fullWidth sx={{
                            padding: "0", margin: '12px 0',color:'white',
                            "& .MuiOutlinedInput-root": { border: '2px solid white' },
                            "& .MuiOutlinedInput-root.Mui-focused": { "& > fieldset": { border: '3px solid white', color: '#40e0d0' } },
                            "& .MuiOutlinedInput-root.Mui-focused": { "& > fieldset": { border: '3px solid white', color: '#40e0d0' } }
                        }} />


                        <Typography variant="p" width={"100%"} color={"#eee"} sx={{ fontSize: { xs: "18px", md: "21px" } }} fontWeight={"300"}>Name of People at Table : </Typography>
                       <Box sx={{ display:'flex' , alignItems:'center'}}>

                        <TextField onChange={handleNames} name="names_of_people" type="text" min={2} max={12} placeholder="" value={newName} fullWidth sx={{
                            padding: "0", margin: '12px 0',color:'white',
                            "& .MuiOutlinedInput-root": { border: '2px solid white' },
                            "& .MuiOutlinedInput-root.Mui-focused": { "& > fieldset": { border: '3px solid white', color: '#40e0d0' } },
                            "& .MuiOutlinedInput-root.Mui-focused": { "& > fieldset": { border: '3px solid white', color: '#40e0d0' } }
                        }} />
                        <Button onClick={submitName} sx={{
                                width: { xs: "48%", md: '48%' },
                                height: '100%',
                                fontWeight: "600",
                                fontSize: '12px',
                                height:'100%',
                                margin:'0 0px 0px 8px ',
                                padding: { xs: '20px 8px' },
                                background: '#eee',
                                color: '#111',
                                "&:hover": {
                                    color: '#eee',
                                    background: '#111',
                                }}} >
                            Add Person
                        </Button>
                        </Box>

                        {
                         booking.names_of_people && booking.names_of_people.map((item , index)=>{
                                return(
                                    <Box sx={{  width:'100%' , padding:' 8px 8px' }}>
                                        <Box sx={{display:'flex' , alignItems:'center' , padding:'12px 0' , justifyContent:'space-between' ,}}>

                                        <Typography key={index} variant="p" width={"100%"} color={"#eee"} sx={{ width: "100%",fontSize: { xs: "18px", md: "21px" } }} fontWeight={"300"}>{item} </Typography>
                                        <Cancel title="Remove Person" sx={{ fill: "red" , color:'red' , cursor:'pointer'}} onClick={() => removeName(item)} />
                                        </Box>
                                        <Divider sx={{ width:'21px' , color:'#555' }} />
                                    </Box>

                                )
                            })
                        }


                        <Typography variant="p" width={"100%"} color={"transparent"} sx={{ fontSize: { xs: "18px", md: "21px" } }} fontWeight={"300"}>How Many Hours : </Typography>
                        <Box sx={{ height: '58px', margin: '12px 0', display: 'flex', justifyContent: 'space-between' }}>
                            <Button sx={{
                                width: { xs: "48%", md: '48%' },
                                height: '100%',
                                fontWeight: "600",
                                fontSize: '16px',
                                padding: { xs: '18px 0', md: '12px 0' },
                                background: 'red',
                                color: '#eee',
                                "&:hover": {
                                    color: '#eee',
                                    background: '#111',
                                }
                            }} onClick={() => setOpenTableBooking(false)} > Cancel </Button>
                            <Button sx={{
                                width: { xs: "48%", md: '48%' },
                                height: '100%',
                                fontWeight: "600",
                                fontSize: '16px',
                                padding: { xs: '18px 0', md: '12px 0' },
                                background: '#eee',
                                color: '#111',
                                "&:hover": {
                                    color: '#eee',
                                    background: '#111',
                                }
                            }} onClick={handleSubmit}> { isProcessing ? <PropagateLoader /> : "Submit Request"} </Button>
                        </Box>

                            {/* <ToastContainer toastStyle={{ backgroundColor: "#eee" , color:'#eee' }} /> */}

                    </Grid>

                </Grid>
            </Stack>
        </Box >
    )
}