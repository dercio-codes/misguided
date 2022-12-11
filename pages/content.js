import { Box, Avatar, Grid, Typography } from "@mui/material";
import { Events } from "../components/events";
import { Navbar } from "../components/navbar";
import Upload  from "../components/upload";
import Head from 'next/head';

const Content = () => {
  return (
    <Box sx={{ background: "#000" }}>
      <Navbar />
      <Typography sx={{ color:"#eee" }}>
      Upload Now
      </Typography>

      <Upload />
    </Box>
  );
};

export default Content;
