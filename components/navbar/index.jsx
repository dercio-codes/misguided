import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import CelebrationIcon from "@mui/icons-material/Celebration";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Link from "next/link";
import MicExternalOnIcon from '@mui/icons-material/MicExternalOn';
// impty 

const drawerWidth = 240;
const navItems = [
  {
    title: "Artists",
    icon: <HeadphonesIcon sx={{ fontSize: "16px", marginRight: "8px" }} />,
  },
  {
    title: "Events",
    icon: <CelebrationIcon sx={{ fontSize: "16px", marginRight: "8px" }} />,
  },
  {
    title: "Book Now",
    icon: <BookOnlineIcon sx={{ fontSize: "16px", marginRight: "8px" }} />,
  },
];

const artistLinks = [
  {
    title:"Dj ShadzO",
    url:"/shadzo",
    icon:'/dj-2.png'
  },
  {
    title:"Karlo",
    url:"/karlo",
    icon:'/dj.png'
  },
  {
    title:"Ykm Thee Mc",
    url:"/ykm",
    icon:'/mic.png'
  },
]

export const Navbar = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        padding: "16px 0",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        background: "#000",
        color: "#eee",
      }}
    >
      <Box>
        <Typography variant="h6" sx={{ my: 2 }}>
          <Box
            sx={{
              height: "100px",
              backgroundPosition: "center",
              filter: "invert(1)",
              backgroundRepeat: "no-repeat",
              margin:"0 auto",
              width: "70%",
              backgroundImage: 'url("/misguided-logo.jpg")',
              backgroundSize: "contain",
            }}
          />
        </Typography>
        <Divider />
        <List>
          {navItems.map((item) => (
            <Link
              key={item.title}
              href={
                item.title === "Book Now"
                  ? "#book-now"
                  : "#" + item.title.toLowerCase()
              }
            >
              <a>
                <ListItem disablePadding>
                  <ListItemButton sx={{ textAlign: "center" }}>
                    {item.icon}
                    <ListItemText primary={item.title} />
                  </ListItemButton>
                </ListItem>
              </a>
            </Link>
          ))}
          {artistLinks.map((item) => (
            <Link
              key={item.title}
              href={item.url}
            >
              <a>
                <ListItem disablePadding>
                  <ListItemButton sx={{ textAlign: "center" }}>
                    <Box sx={{ width:'21px' , filter:'invert(1)' , height:'21px' , backgroundImage:`url("${item.icon}")` , backgroundSize:"cover" }} />
                    <ListItemText primary={item.title} />
                  </ListItemButton>
                </ListItem>
              </a>
            </Link>
          ))}
        </List>
        {/* <Accordion sx={{ background: "transparent", color: "#eee" }}>
          <AccordionSummary
            onClick={(e) => e.preventDefault()}
            expandIcon={
              <ExpandMoreIcon
                sx={{ color: "#eee", fontSize: "16px", marginRight: "8px" }}
              />
            }
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <HeadphonesIcon sx={{ fontSize: "16px", marginRight: "8px" }} />
            <Typography>Artists</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Link href={"/shadzo"}>
              <a>
                <ListItem disablePadding>
                  <ListItemButton sx={{ textAlign: "center" }}>
                    <ListItemText primary={"ShadzO"} />
                  </ListItemButton>
                </ListItem>
              </a>
            </Link>
            <Link href={"/karlo"}>
              <a>
                <ListItem disablePadding>
                  <ListItemButton sx={{ textAlign: "center" }}>
                    <ListItemText primary={"Karlo"} />
                  </ListItemButton>
                </ListItem>
              </a>
            </Link>
            <Link href={"/ykm"}>
              <a>
                <ListItem disablePadding>
                  <ListItemButton sx={{ textAlign: "center" }}>
                    <ListItemText primary={"YKM THE MC"} />
                  </ListItemButton>
                </ListItem>
              </a>
            </Link>
          </AccordionDetails>
        </Accordion> */}
      </Box>

      <Typography fontSize={12}>2022 Misguided Original</Typography>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar sx={{ background: "#000", color: "#fff" ,  }} component="nav">
        <Toolbar sx={{display:{xs:'flex' , } , justifyContent:'space-between' , background:''}}>
          <Box sx={{ background:'', flex:1, display: { sm: "none" }}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          </Box>
          <Box sx={{ background:'' , flex:{xs:1 , sm:0},display:'flex' , justifyContent:{ xs:'flex-end' , md:'flex-start'} }}>

          <Typography
            variant="h6"
            component="div"
            sx={{ display: { xs: "flex", sm: "block" } }}
          >
            <Box
              sx={{
                height: "100px",
                filter: "invert(1)",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                width: {xs:"120px"},
                backgroundImage: 'url("/misguided-logo.jpg")',
                backgroundSize: "contain",
              }}
            />
          </Typography>
          </Box>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Link
                key={item.title}
                href={
                  item.title === "Book Now"
                    ? "#book-now"
                    : "#" + item.title.toLowerCase()
                }
              >
                <a>
                  <Button
                    sx={{
                      color: "#fff",
                      margin: "0 8px",
                      "&:hover": { color: "#40e0d0" },
                    }}
                  >
                    {item.icon}
                    {item.title}
                  </Button>
                </a>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            background: "rgba(1,1,1,.3)",
            color: "#eee",
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

Navbar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};
