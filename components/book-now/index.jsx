import PhoneIcon from '@mui/icons-material/Phone';
import { Box, Select, MenuItem, IconButton, Button, Grid, Typography, TextField, Stack } from "@mui/material"
import { useState } from 'react';
import { useSnackbar } from "notistack";
import axios from "axios";
import { GooSpinner } from "react-spinners-kit";
import { PropagateLoader } from "react-spinners";
import { toast } from 'react-toastify';

export const BookNow = () => {
    const enqueueSnackbar = useSnackbar();
    const [isProcessing,setIsProcessing] = useState(false)
    const [booking, setBooking] = useState({
        name: "",
        tel:"",
        requested_artist: "Dj Karlo",
        event_date: "",
        event_name: "",
        event_location: "",
        hospitality: "",
        email: "",
        set_time: "",
        duration: "",
        budget:0
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
            toast.warning("Please fill in all fields.", {
                theme:"dark",
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
              });
          setIsProcessing(false);
        } else {
          axios
            .post("/api/bookTable", {
                name:booking.name,
                tel:booking.tel,
                requested_artist:booking.requested_artist,
                event_date:booking.event_date,
                event_name:booking.event_name,
                event_location:booking.event_location,
                hospitality:booking.hospitality,
                email:booking.email,
                set_time:booking.set_time,
                duration:booking.duration,
                budget:booking.budget,
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
                    name:"",
                    tel:"",
                    requested_artist:"",
                    event_date:"",
                    event_name:"",
                    event_location:"",
                    hospitality:"",
                    email:"",
                    set_time:"",
                    duration:"",
                    budget:""
                });
    
                setIsProcessing(false);
              } else {
                toast.error("Error booking Misguided.", {
                    theme:"dark",
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                  });
    
                setIsProcessing(false);
              }
            })
            .catch((err) => {
                console.log(err)
              setIsProcessing(false);
            });
        }
      };

    return (
        <Box id="book-now" sx={{ backgroundSize:'cover' ,padding: "32px", minHeight: '50vh' }}>
            <Box sx={{ background: '', width: { lg: '40%', xs: '50%' }, padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
                <IconButton sx={{ background: '', border: '3px solid #eee', width: '80px', height: '80px' }}>

                    <PhoneIcon sx={{ fontSize: '32px', color: '#eee' }} />
                </IconButton >
                <Typography variant="p" width={"100%"} color={"#eee"} sx={{ margin: '0 16px', fontSize: { xs: "32px", md: "54px" }, textAlign: '' }} fontWeight={"600"}>Book Now</Typography>
            </Box>
            <Stack sx={{ padding: '21px 4px', background: '' }}>
                <Typography variant="p" width={"100%"} color={"#eee"} sx={{ margin: '12px 0 28px 0 ', fontSize: { xs: "18px", md: "18px" }, textAlign: '' }} fontWeight={"400"}>Fill in the form below and we will respond back to you.</Typography>

                <Grid container columnSpacing={12}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="p" width={"100%"} color={"#eee"} sx={{ fontSize: { xs: "18px", md: "21px" } }} fontWeight={"300"}>Name : </Typography>
                        <TextField onChange={handleFieldChange} name="name" helperText="Example : Misguided Entertainment" placeholder="John Doe." fullWidth sx={{
                            padding: "0", margin: '12px 0',
                            color:'white',
                            "& .MuiOutlinedInput-root": { border: '2px solid white' , color:'white' },
                            "& .MuiOutlinedInput-root.Mui-focused": { "& > fieldset": { border: '3px solid white', color: '#40e0d0' } },
                            "& .MuiOutlinedInput-root.Mui-focused": { "& > fieldset": { border: '3px solid white', color: '#40e0d0' } }
                        }} />

                        <Typography variant="p" width={"100%"} color={"#eee"} sx={{ fontSize: { xs: "18px", md: "21px" } }} fontWeight={"300"}>Email : </Typography>
                        <TextField onChange={handleFieldChange} name="email" type="email" helperText="bookings@misguidedsa.com" placeholder="Email" fullWidth sx={{
                            padding: "0", margin: '12px 0',
                            color:'white',
                            "& .MuiOutlinedInput-root": { border: '2px solid white' , color:'white' },
                            "& .MuiOutlinedInput-root.Mui-focused": { "& > fieldset": { border: '3px solid white', color: '#40e0d0' } },
                            "& .MuiOutlinedInput-root.Mui-focused": { "& > fieldset": { border: '3px solid white', color: '#40e0d0' } }
                        }} />

                        <Typography variant="p" width={"100%"} color={"#eee"} sx={{ fontSize: { xs: "18px", md: "21px" } }} fontWeight={"300"}>Phone Number : </Typography>
                        <TextField onChange={handleFieldChange} name="tel" type="tel" helperText="Contact Number" placeholder="Tel" fullWidth sx={{
                            padding: "0", margin: '12px 0',
                            color:'white',
                            "& .MuiOutlinedInput-root": { border: '2px solid white' , color:'white' },
                            "& .MuiOutlinedInput-root.Mui-focused": { "& > fieldset": { border: '3px solid white', color: '#40e0d0' } },
                            "& .MuiOutlinedInput-root.Mui-focused": { "& > fieldset": { border: '3px solid white', color: '#40e0d0' } }
                        }} />

                        <Typography variant="p" width={"100%"} color={"#eee"} sx={{ fontSize: { xs: "18px", md: "21px" } }} fontWeight={"300"}>Requested Artist : </Typography>
                        <Select onChange={handleFieldChange} name="requested_artist"  value={booking.requested_artist} fullWidth sx={{
                            padding: "0", margin: '12px 0 36px',
                            color:'white',
                            "& .MuiOutlinedInput-root": { border: '2px solid white' , color:'white' },
                            "& .MuiOutlinedInput-root.Mui-focused": { "& > fieldset": { border: '3px solid white', color: '#40e0d0' } },
                            "& .MuiOutlinedInput-root.Mui-focused": { "& > fieldset": { border: '3px solid white', color: '#40e0d0' } }
                        }}>
                            <MenuItem value="Dj Karlo">Dj Karlo </MenuItem>
                            <MenuItem value="Dj Shadzo">Dj Shadzo </MenuItem>
                            <MenuItem value="YKM Thee">YKM Thee MC </MenuItem>
                            <MenuItem value="Dj Karlo + YKM Thee MC">Dj Karlo + YKM Thee MC </MenuItem>
                            <MenuItem value="Dj Shadzo + Dj Karlo">Dj Shadzo + Dj Karlo </MenuItem>
                            <MenuItem value="Dj Shadzo + YKM Thee MC">Dj Shadzo + YKM Thee MC</MenuItem>
                            <MenuItem value="Misguided">Misguided</MenuItem>
                        </Select>
                        <Typography variant="p" width={"100%"} color={"#eee"} sx={{ fontSize: { xs: "18px", md: "21px" } }} fontWeight={"300"}>Event Date : </Typography>
                        <TextField onChange={handleFieldChange} name="event_date" helperText="Artist Set Time" type="date" placeholder="01/01/2023 , 00:00" fullWidth sx={{
                            background: '', padding: "0", margin: '12px 0',
                            color:'white',
                            "& .MuiOutlinedInput-root": { border: '2px solid white' , color:'white' },
                            "& .MuiOutlinedInput-root.Mui-focused": { "& > fieldset": { border: '3px solid white', color: '#40e0d0' } },
                            "& .MuiOutlinedInput-root.Mui-focused": { "& > fieldset": { border: '3px solid white', color: '#40e0d0' } }
                        }} />

                    <Typography variant="p" width={"100%"} color={"#eee"} sx={{ fontSize: { xs: "18px", md: "21px" } }} fontWeight={"300"}>Event Name : </Typography>
                        <TextField onChange={handleFieldChange} name="event_name" helperText="Please enter your event name" placeholder="Old School Fridays" fullWidth sx={{
                            padding: "0", margin: '12px 0',
                            color:'white',
                            "& .MuiOutlinedInput-root": { border: '2px solid white' , color:'white' },
                            "& .MuiOutlinedInput-root.Mui-focused": { "& > fieldset": { border: '3px solid white', color: '#40e0d0' } },
                            "& .MuiOutlinedInput-root.Mui-focused": { "& > fieldset": { border: '3px solid white', color: '#40e0d0' } }
                        }} />

                    </Grid>
                    <Grid item xs={12} md={6}>

                        <Typography variant="p" width={"100%"} color={"#eee"} sx={{ fontSize: { xs: "18px", md: "21px" } }} fontWeight={"300"}>Event Location : </Typography>
                        <TextField onChange={handleFieldChange} name="event_location" helperText="Example : Boksburg , The Classic Indiah Hookah Lounge " placeholder="Roodeport Johanessburg." fullWidth sx={{
                            padding: "0", margin: '12px 0',
                            color:'white',
                            "& .MuiOutlinedInput-root": { border: '2px solid white' , color:'white' },
                            "& .MuiOutlinedInput-root.Mui-focused": { "& > fieldset": { border: '3px solid white', color: '#40e0d0' } },
                            "& .MuiOutlinedInput-root.Mui-focused": { "& > fieldset": { border: '3px solid white', color: '#40e0d0' } }
                        }} />

                        
                        <Typography variant="p" width={"100%"} color={"#eee"} sx={{ fontSize: { xs: "18px", md: "21px" } }} fontWeight={"300"}>Hospitality : </Typography>
                        <TextField onChange={handleFieldChange} name="hospitality" helperText="Hospitality for requested artist." placeholder="Hennesy , Jameson , Jagermeister " fullWidth sx={{
                            padding: "0", margin: '12px 0',
                            color:'white',
                            "& .MuiOutlinedInput-root": { border: '2px solid white' , color:'white' },
                            "& .MuiOutlinedInput-root.Mui-focused": { "& > fieldset": { border: '3px solid white', color: '#40e0d0' } },
                            "& .MuiOutlinedInput-root.Mui-focused": { "& > fieldset": { border: '3px solid white', color: '#40e0d0' } }
                        }} />


                        <Typography variant="p" width={"100%"} color={"#eee"} sx={{ fontSize: { xs: "18px", md: "21px" } }} fontWeight={"300"}>Set Time : </Typography>
                        <TextField onChange={handleFieldChange} name="set_time" helperText="Artist Set Time" type="time" placeholder="01/01/2023 , 00:00" fullWidth sx={{
                            background: '', padding: "0", margin: '12px 0',
                            color:'white',
                            "& .MuiOutlinedInput-root": { border: '2px solid white' , color:'white' },
                            "& .MuiOutlinedInput-root.Mui-focused": { "& > fieldset": { border: '3px solid white', color: '#40e0d0' } },
                            "& .MuiOutlinedInput-root.Mui-focused": { "& > fieldset": { border: '3px solid white', color: '#40e0d0' } }
                        }} />

                        <Typography variant="p" width={"100%"} color={"#eee"} sx={{ fontSize: { xs: "18px", md: "21px" } }} fontWeight={"300"}>Duration : </Typography>
                        <TextField onChange={handleFieldChange} name="duration" type="number" helperText="How long would you like to book the artist" placeholder="2 Hours" fullWidth sx={{
                            padding: "0", margin: '12px 0',
                            color:'white',
                            "& .MuiOutlinedInput-root": { border: '2px solid white' , color:'white' },
                            "& .MuiOutlinedInput-root.Mui-focused": { "& > fieldset": { border: '3px solid white', color: '#40e0d0' } },
                            "& .MuiOutlinedInput-root.Mui-focused": { "& > fieldset": { border: '3px solid white', color: '#40e0d0' } }
                        }} />

                         <Typography variant="p" width={"100%"} color={"#eee"} sx={{ fontSize: { xs: "18px", md: "21px" } }} fontWeight={"300"}>Budget : </Typography>
                        <TextField onChange={handleFieldChange} name="budget" type="number" helperText="What is your budget for the requested artist?" placeholder="Budget price exlcudes hospitality" fullWidth sx={{
                            padding: "0", margin: '12px 0',
                            color:'white',
                            "& .MuiOutlinedInput-root": { border: '2px solid white' , color:'white' , margin:"0px 0 5px" },
                            "& .MuiOutlinedInput-root.Mui-focused": { "& > fieldset": { border: '3px solid white', color: '#40e0d0' } },
                            "& .MuiOutlinedInput-root.Mui-focused": { "& > fieldset": { border: '3px solid white', color: '#40e0d0' } }
                        }} />

                        <Typography variant="p" width={"100%"} color={"transparent"} sx={{ fontSize: { xs: "18px", md: "21px" } }} fontWeight={"300"}>Duration : </Typography>
                        <Box sx={{ height: '58px', margin: '12px 0' }}>
                            <Button sx={{
                                width: { xs: "100%", md: '100%' },
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
                            }} onClick={handleSubmit}> Submit Request </Button>
                        </Box>



                    </Grid>

                </Grid>
            </Stack>
        </Box>
    )
}
