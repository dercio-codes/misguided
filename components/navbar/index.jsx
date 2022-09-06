import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import CelebrationIcon from '@mui/icons-material/Celebration';
import BookOnlineIcon from '@mui/icons-material/BookOnline';

const drawerWidth = 240;
const navItems = [
    {
        title: 'Artists',
        icon: <HeadphonesIcon sx={{ fontSize: '16px', marginRight: '8px' }} />
    },
    {
        title: 'Events',
        icon: <CelebrationIcon sx={{ fontSize: '16px', marginRight: '8px' }} />
    },
    {
        title: 'Book Now',
        icon: <BookOnlineIcon sx={{ fontSize: '16px', marginRight: '8px' }} />
    },
];

export const Navbar = (props) => {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ padding: "16px 0", textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', background: '#111', color: '#eee' }}>
            <Box>
                <Typography variant="h6" sx={{ my: 2 }}>
                    MUI
                </Typography>
                <Divider />
                <List>
                    {navItems.map((item) => (
                        <ListItem key={item} disablePadding>
                            <ListItemButton sx={{ textAlign: 'center', }}>
                                {item.icon}
                                <ListItemText primary={item.title} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>

            <Typography fontSize={12}>2022 Misguided Original</Typography>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar sx={{ background: '#111', color: '#fff' }} component="nav">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        {/* <Box sx={{ width: '200px', backgroundColor:'red', backgroundImage: 'url("https://scontent.fgcj1-1.fna.fbcdn.net/v/t39.30808-1/294392418_443400361133119_2145925794388923220_n.jpg?stp=cp0_dst-jpg_e15_p120x120_q65&_nc_cat=101&ccb=1-7&_nc_sid=dbb9e7&_nc_ohc=Mol1whVDGK8AX-xqbSB&_nc_ht=scontent.fgcj1-1.fna&oh=00_AT9NTGpy4n5Ws0IiGIxmJ5hqMdrziYAGBZ6uaQuT4yktKw&oe=631AF11A")', backgroundSize: 'contain', height: '100%' }} /> */}
                        MUI
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {navItems.map((item) => (
                            <Button key={item.title} sx={{ color: '#fff', margin: '0 8px', "&:hover": { color: "#40e0d0" } }}>
                                {item.icon}
                                {item.title}
                            </Button>
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
                        display: { xs: 'block', sm: 'none' },
                        background: 'rgba(1,1,1,.3)', color: '#eee',
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>

        </Box>
    );
}

Navbar.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

