import { CloseOutlined } from "@mui/icons-material";
import { Box, Modal, Typography, IconButton } from "@mui/material";

export const EventModal = ({ state, openEvent }) => {
  const { open, setOpen } = state;
  return (
    <Modal
      open={open}
      onBackdropClick={() => {
        setOpen(false);
      }}
      sx={{ border: "none", display: "flex", alignItems: "center" }}
    >
      <Box
        sx={{
          background: "",
          height: "70vh",
          margin: "auto 0",
          border: "none",
          width: "100%",
          display: "flex",
          alignItems: "",
          flexDirection: "column",
        }}
      >
        <IconButton onClick={() => setOpen(false)}>
          <CloseOutlined
            sx={{
              color: "white",
              fontSize: "50px",
              position: "fixed",
              top: 12,
              right: "12px",
            }}
          />
        </IconButton>

        <Box
          sx={{
            height: "70vh",
            width: "100%",
            border: "none",
            backgroundImage: `url("${openEvent.image}")`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            // background:'red',
            backgroundPosition: "center",
            margin: "auto 0",
          }}
        />
      </Box>
    </Modal>
  );
};
