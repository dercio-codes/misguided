import PhoneIcon from '@mui/icons-material/Phone';
import { Box, Select, MenuItem, IconButton, Button, Grid, Typography, TextField, Stack } from "@mui/material"
import { useState } from 'react';

export const BookNow = () => {

    const [booking, setBooking] = useState({
        name: "",
        requested_artist: "Dj Karlo",
        event_date: "",
        event_name: "",
        event_location: "",
        rider: "",
        guestlist_amount: "",
        event_time: "",
        how_many_hours: "",
    });

    const handleFieldChange = (e) => {
        setBooking({
            ...booking,
            [e.target.name]: e.target.value,
        })

        console.log(booking)
    }

    return (
        <Box id="book-now" sx={{ background: '#111', padding: "32px", minHeight: '50vh' }}>
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
                        <TextField onChange={handleFieldChange} name="name" placeholder="John Doe." fullWidth sx={{
                            padding: "0", margin: '12px 0',
                            "& .MuiOutlinedInput-root": { border: '2px solid white' },
                            "& .MuiOutlinedInput-root.Mui-focused": { "& > fieldset": { border: '3px solid white', color: '#40e0d0' } },
                            "& .MuiOutlinedInput-root.Mui-focused": { "& > fieldset": { border: '3px solid white', color: '#40e0d0' } }
                        }} />

                        <Typography variant="p" width={"100%"} color={"#eee"} sx={{ fontSize: { xs: "18px", md: "21px" } }} fontWeight={"300"}>Requested Artist : </Typography>
                        <Select onChange={handleFieldChange} name="requested_artist" value={booking.requested_artist} fullWidth sx={{
                            padding: "0", margin: '12px 0',
                            "& .MuiOutlinedInput-root": { border: '2px solid white' },
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
                            "& .MuiOutlinedInput-root": { border: '2px solid white' },
                            "& .MuiOutlinedInput-root.Mui-focused": { "& > fieldset": { border: '3px solid white', color: '#40e0d0' } },
                            "& .MuiOutlinedInput-root.Mui-focused": { "& > fieldset": { border: '3px solid white', color: '#40e0d0' } }
                        }} />

                        <Typography variant="p" width={"100%"} color={"#eee"} sx={{ fontSize: { xs: "18px", md: "21px" } }} fontWeight={"300"}>Event Name : </Typography>
                        <TextField onChange={handleFieldChange} name="event_name" helperText="Please enter your event name" placeholder="Old School Fridays" fullWidth sx={{
                            padding: "0", margin: '12px 0',
                            "& .MuiOutlinedInput-root": { border: '2px solid white' },
                            "& .MuiOutlinedInput-root.Mui-focused": { "& > fieldset": { border: '3px solid white', color: '#40e0d0' } },
                            "& .MuiOutlinedInput-root.Mui-focused": { "& > fieldset": { border: '3px solid white', color: '#40e0d0' } }
                        }} />

                        <Typography variant="p" width={"100%"} color={"#eee"} sx={{ fontSize: { xs: "18px", md: "21px" } }} fontWeight={"300"}>Event Location : </Typography>
                        <TextField onChange={handleFieldChange} name="event_location" placeholder="Roodeport Johanessburg." fullWidth sx={{
                            padding: "0", margin: '12px 0',
                            "& .MuiOutlinedInput-root": { border: '2px solid white' },
                            "& .MuiOutlinedInput-root.Mui-focused": { "& > fieldset": { border: '3px solid white', color: '#40e0d0' } },
                            "& .MuiOutlinedInput-root.Mui-focused": { "& > fieldset": { border: '3px solid white', color: '#40e0d0' } }
                        }} />




                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="p" width={"100%"} color={"#eee"} sx={{ fontSize: { xs: "18px", md: "21px" } }} fontWeight={"300"}>Rider : </Typography>
                        <TextField onChange={handleFieldChange} name="rider" placeholder="Diesel 500." fullWidth sx={{
                            padding: "0", margin: '12px 0',
                            "& .MuiOutlinedInput-root": { border: '2px solid white' },
                            "& .MuiOutlinedInput-root.Mui-focused": { "& > fieldset": { border: '3px solid white', color: '#40e0d0' } },
                            "& .MuiOutlinedInput-root.Mui-focused": { "& > fieldset": { border: '3px solid white', color: '#40e0d0' } }
                        }} />

                        <Typography variant="p" width={"100%"} color={"#eee"} sx={{ fontSize: { xs: "18px", md: "21px" } }} fontWeight={"300"}>Guestlist Amount : </Typography>
                        <TextField onChange={handleFieldChange} name="guestlist_amount" type="number" placeholder="4 People ( Excluding Artist. )" fullWidth sx={{
                            padding: "0", margin: '12px 0',
                            "& .MuiOutlinedInput-root": { border: '2px solid white' },
                            "& .MuiOutlinedInput-root.Mui-focused": { "& > fieldset": { border: '3px solid white', color: '#40e0d0' } },
                            "& .MuiOutlinedInput-root.Mui-focused": { "& > fieldset": { border: '3px solid white', color: '#40e0d0' } }
                        }} />

                        <Typography variant="p" width={"100%"} color={"#eee"} sx={{ fontSize: { xs: "18px", md: "21px" } }} fontWeight={"300"}>Event Date : </Typography>
                        <TextField onChange={handleFieldChange} name="event_time" helperText="Artist Set Time" type="time" placeholder="01/01/2023 , 00:00" fullWidth sx={{
                            background: '', padding: "0", margin: '12px 0',
                            "& .MuiOutlinedInput-root": { border: '2px solid white' },
                            "& .MuiOutlinedInput-root.Mui-focused": { "& > fieldset": { border: '3px solid white', color: '#40e0d0' } },
                            "& .MuiOutlinedInput-root.Mui-focused": { "& > fieldset": { border: '3px solid white', color: '#40e0d0' } }
                        }} />

                        <Typography variant="p" width={"100%"} color={"#eee"} sx={{ fontSize: { xs: "18px", md: "21px" } }} fontWeight={"300"}>How Many Hours : </Typography>
                        <TextField onChange={handleFieldChange} name="how_many_hours" type="number" helperText="How long would you like to book the artist" placeholder="2 Hours" fullWidth sx={{
                            padding: "0", margin: '12px 0',
                            "& .MuiOutlinedInput-root": { border: '2px solid white' },
                            "& .MuiOutlinedInput-root.Mui-focused": { "& > fieldset": { border: '3px solid white', color: '#40e0d0' } },
                            "& .MuiOutlinedInput-root.Mui-focused": { "& > fieldset": { border: '3px solid white', color: '#40e0d0' } }
                        }} />

                        <Typography variant="p" width={"100%"} color={"transparent"} sx={{ fontSize: { xs: "18px", md: "21px" } }} fontWeight={"300"}>How Many Hours : </Typography>
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
                            }}> Submit Request </Button>
                        </Box>



                    </Grid>

                </Grid>
            </Stack>
        </Box>
    )
}