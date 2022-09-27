import { Box, Avatar, Grid, Typography } from "@mui/material";
import { Events } from "../components/events";
import { Navbar } from "../components/navbar";
import { Socials } from "../components/socials";

const Shadzo = () => {
  return (
    <Box sx={{ background: "#000" }}>
      <Navbar />
      <Box
        sx={{
          height: "60vh",
          backgroundImage: 'url("/shadzo-logo-dark.jpg")',
          backgroundSize: "contain",
          backgroundPosition: "bottom",
          backgroundRepeat: "no-repeat",
        }}
      ></Box>
      <Box
        sx={{
          minHeight: "170vh",
          background: "#222",
          padding: { xs: "30px 8px", lg: "8px 48px" },
        }}
      >
        <Grid container>
          <Grid
            item
            xs={12}
            sx={{
              height: "fit-content",
              background: "",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                lineHeight: "2rem",
                background: "",
                justifyContent: { xs: "center", lg: "space-between" },
                width: { lg: "60%" },
                padding: { xs: "21px" },
              }}
            >
              <Avatar
                src={"/shadzo-2.jpeg"}
                alt={"boom"}
                sx={{
                  width: { xs: "180px" },
                  height: { xs: "180px" },
                }}
              />
              <Typography
                variant="h4"
                width={"100%"}
                color={"#eee"}
                fontWeight={"600"}
                textAlign={"center"}
                sx={{ margin: "16px 0" }}
              >
                Dj Shadzo
              </Typography>
              <Typography
                variant="p"
                width={"90%"}
                color={"#eee"}
                fontWeight={"600"}
                sx={{ textAlign: "center" }}
              >
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              height: "",
              background: "",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: { xs: "90%", lg: "60%" },
                // margin: "0 auto",
              }}
            >
              <Events text={"Catch me at."} artist={true} />
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            // margin:"48px 0",
            display: "flex",
            padding: { xs: "21px", md: "21px 0" },
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "500px",
            background: "",
          }}
        >
          <Typography
            variant="h5"
            width={"100%"}
            color={"#eee"}
            fontWeight={"600"}
            textAlign={"center"}
            sx={{ marginTop: "48px", marginBottom: "21px" }}
          >
            Connect with Artists
          </Typography>
          <Box sx={{ width: "250px", background: ""  , margin:'21px 0' , background:''}}>
            <Socials artistPage={true} artist={{ name: "Dj Shadzo" }} />
          </Box>

          <Grid container>
            <Grid item xs={12} md={6} sx={{ display:'flex' , alignItems:'center' ,background:'' , height:'50vh'  }}>
              <iframe
                style={{margin:'0 auto', borderRadius: "12px" }}
                src="https://open.spotify.com/embed/artist/5JuA3291INTaMk0R8xMkZK?utm_source=generator&theme=0"
                width="95%"
                height="380"
                frameBorder="0"
                allowFullScreen=""
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              ></iframe>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display:'flex' , alignItems:'center' ,background:'' , height:'50vh'  }}>
              <iframe
                style={{margin:'0 auto', borderRadius: "12px" }}
                width="95%"
                height="380"
                src="https://www.youtube.com/embed/videoseries?list=OLAK5uy_l5-VPNRmMyktsEG2A6Q4dGEdYXfiFXQfo"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Shadzo;
