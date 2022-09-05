import { Box } from "@mui/material";
import { Banners } from "../components/banners";
import { Events } from "../components/events";
import { Navbar } from "../components/navbar";


export default function Home() {
  return (
    <Box sx={{ overflowY:'auto' }}>

    <Navbar />
    <Banners />
    <Events />
    </Box>
  );
}
