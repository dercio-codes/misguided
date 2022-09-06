import { Box, Select, MenuItem, IconButton, Button, Grid, Typography, TextField, Stack } from "@mui/material"

export const ParallaxEffect = ({ img }) => {
    // background-attachment: fixed;
    // background-position: center;
    // background-repeat: no-repeat;
    // background-size: cover;
    return (
        
        <Box sx={{
            width: '100%',
            height: '120px',
            backgroundImage: `url(${img})`,
            backgroundAttachment: "fixed",
            backgroundPosition: "top",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
        }}>
        <Box sx={{ background:'rgba(1,1,1,.9)' ,height:'100%' , width:'100%'}}>

hi
        </Box>
            </Box>
    )
}