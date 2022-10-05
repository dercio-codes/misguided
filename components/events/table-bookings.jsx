import { CloseOutlined } from "@mui/icons-material";
// import { Box, Modal, Typography } from "@mui/material"
import PhoneIcon from '@mui/icons-material/Phone';
import { Box, Select, Modal, MenuItem, IconButton, Button, Grid, Typography, TextField, Stack } from "@mui/material"
import { useState } from 'react';

import SendIcon from "@mui/icons-material/Send";
import { useSnackbar } from "notistack";
import axios from "axios";
import { GooSpinner } from "react-spinners-kit";
import { PropagateLoader } from "react-spinners";

export const TableBookings = ({ state, openEvent }) => {
    const { openTableBooking, setOpenTableBooking } = state;
    return (
        <Modal open={openTableBooking} onBackdropClick={() => { setOpenTableBooking(false) }} sx={{ border: 'none', display: 'flex', alignItems: 'center' , justifyContent:'center' }}>
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
        num_of_people:0,
    });

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
    
        const bookingValues = Object.values(booking);
    
        if (bookingValues.includes("")) {
          enqueueSnackbar("please fill in all fields", {
            variant: "warning",
          });
          setIsProcessing(false);
        } else {
          axios
            .post("/api/email", {
              event_name: booking.event_name,
              indoor_or_outdoor: booking.indoor_or_outdoor,
              name: booking.name,
              num_of_people: booking.num_of_people,
              image_link:"https://misguided.vercel.app/" + openEvent.img
            })
            .then((res) => {
              if (res.data.message == "MAIL_SENT") {
                enqueueSnackbar("Email successfully sent", {
                  variant: "success",
                });
    
                setBooking({
                    event_name: openEvent.title,
                    indoor_or_outdoor: "",
                    name: "",
                    num_of_people:0
                });
    
                setIsProcessing(false);
              } else {
                enqueueSnackbar(`Failed to send email : ${res.data.err.message}`, {
                  variant: "error",
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
    
              setIsProcessing(false);
            });
        }
      };

    return (
        <Box id="book-now" sx={{ background: '#111', margin: 'suto 0', padding: "32px", minHeight: '50vh' }}>
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
                            padding: "0", margin: '12px 0',
                            "& .MuiOutlinedInput-root": { border: '2px solid white' },
                            "& .MuiOutlinedInput-root.Mui-focused": { "& > fieldset": { border: '3px solid white', color: '#40e0d0' } },
                            "& .MuiOutlinedInput-root.Mui-focused": { "& > fieldset": { border: '3px solid white', color: '#40e0d0' } }
                        }} />

                        <Typography variant="p" width={"100%"} color={"#eee"} sx={{ fontSize: { xs: "18px", md: "21px" } }} fontWeight={"300"}>Indoor or Outdoor : </Typography>
                        <Select onChange={handleFieldChange} name="indoor_or_outdoor" value={booking.indoor_or_outdoor} fullWidth sx={{
                            padding: "0", margin: '12px 0',
                            "& .MuiOutlinedSelect-root": { border: '2px solid white' },
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
                            padding: "0", margin: '12px 0',
                            "& .MuiOutlinedInput-root": { border: '2px solid white' },
                            "& .MuiOutlinedInput-root.Mui-focused": { "& > fieldset": { border: '3px solid white', color: '#40e0d0' } },
                            "& .MuiOutlinedInput-root.Mui-focused": { "& > fieldset": { border: '3px solid white', color: '#40e0d0' } }
                        }} />


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



                    </Grid>

                </Grid>
            </Stack>
        </Box >
    )
}