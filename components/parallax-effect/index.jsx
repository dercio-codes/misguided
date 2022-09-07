import { Box, Select, MenuItem, IconButton, Button, Grid, Typography, TextField, Stack } from "@mui/material"

export const ParallaxEffect = ({ img }) => {
    // background-attachment: fixed;
    // background-position: center;
    // background-repeat: no-repeat;
    // background-size: cover;
    return (
        
        <Box sx={{
            // width: {md:'60%' ,lg:'45%'},
            margin:'0 auto',
            width: '100v%',
            height: '70px',
            backgroundImage: `url(${img})`,
            backgroundAttachment: "fixed",
            backgroundPosition: "top center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
        }}>
        <Box sx={{ background:'rgba(1,1,1,.5)' ,height:'100%' , width:'100%'}}>


        </Box>
            </Box>
    )
}