import { Box, Modal, Typography } from "@mui/material"

export const EventModal = ({ state, openImage }) => {
    const { open, setOpen } = state;
    return (
        <Modal open={open}  onBackdropClick={() => { setOpen(false) }} sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ background: '', height: '70vh', margin: 'auto 0', width: '100%' }}>
                <img src={openImage} alt={openImage} style={{ height: '70vh', width: '100%', objectFit: 'contain', margin: "auto 0" }} />
                <Box sx={{ width: '75%', margin: "0 auto", background: 'rgba(1,1,1,.9)' }}>

                    <Typography className="heartbeat" textAlign={"center"} color={"#eee"}> Click outside the image to zoom out.</Typography>
                </Box>

            </Box>

        </Modal>
    )
}