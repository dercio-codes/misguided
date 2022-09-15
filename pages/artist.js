import { Box, Avatar, Grid, Typography } from "@mui/material";
import { Events } from "../components/events";
import { Navbar } from "../components/navbar";
import { Socials } from "../components/socials";

const Artist = () => {
  return (
    <Box sx={{ background:'#000' }}>
      <Navbar />
      <Box
        sx={{
          height: "60vh",
          backgroundImage: 'url("/ykm-logo.jpeg")',
          backgroundSize: "contain",
          backgroundPosition: "bottom",
          backgroundRepeat:'no-repeat',
        }}
      ></Box>
      <Box
        sx={{
          minHeight: "100vh",
          background: "#222",
          padding: { xs: "30px 8px", lg: "90px 48px" },
        }}
      >
        {/* <Grid container>
          <Grid
            item
            md={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: {
                xs: "90vh",
                md: "fit-content",
              },
              background: "",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: { xs: "center", lg: "space-between" },
                background: "",
                width: "100%",
                padding: { xs: "0 6px" },
              }}
            >
              <Avatar
                src={"boom"}
                alt={"boom"}
                sx={{
                  width: { xs: "120px", md: "120px", lg: "180px" },
                  height: { xs: "120px", md: "120px", lg: "180px" },
                }}
              />
              <Typography
                variant="h4"
                width={"100%"}
                color={"#eee"}
                fontWeight={"600"}
                textAlign={"center"}
              >
                Meet The Artists
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: {
                  xs: "center",
                  md: "left",
                },
                justifyContent: "center",
                background: "",
                lineHeight: "2rem",
                width: "100%",
                padding: "21px 0",
              }}
            >
              <Typography
                variant="p"
                width={"90%"}
                color={"#eee"}
                fontWeight={"600"}
                textAlign={""}
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
            md={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "500px",
              background: "",
            }}
          >
            <Events text={"Catch me at."} artist={true} />
          </Grid>
        </Grid> */}
        <Grid container>
        <Grid item xs={6} sx={{ height:'100vh' , background:'red' , display:'flex' , flexDirection:'column' , justifyContent:'center' }}>
        <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: { xs: "center", lg: "space-between" },
                background: "",
                width: "100%",
                padding: { xs: "0 6px" },
              }}
            >
              <Avatar
                src={"boom"}
                alt={"boom"}
                sx={{
                  width: { xs: "120px", md: "120px", lg: "180px" },
                  height: { xs: "120px", md: "120px", lg: "180px" },
                }}
              />
              <Typography
                variant="h4"
                width={"100%"}
                color={"#eee"}
                fontWeight={"600"}
                textAlign={"center"}
              >
                Meet The Artists
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: {
                  xs: "center",
                  md: "left",
                },
                justifyContent: "center",
                background: "",
                lineHeight: "2rem",
                width: "100%",
                padding: "21px 0",
              }}
            >
              <Typography
                variant="p"
                width={"90%"}
                color={"#eee"}
                fontWeight={"600"}
                textAlign={""}
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
        <Grid item xs={6} sx={{ height:'100vh' , background:'green', display:'flex' , flexDirection:'column' , justifyContent:'center' }}>
          
        <Events text={"Catch me at."} artist={true} />
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
          <Box sx={{ width: "250px", background: "" }}>
            <Socials artistPage={true} artist={{ name: "Dj Shadzo" }} />
          </Box>
          <iframe
            style={{ borderRadius: "12px", margin: "18px 0" }}
            src="https://open.spotify.com/embed/artist/5JuA3291INTaMk0R8xMkZK?utm_source=generator"
            width="100%"
            height="500"
            frameBorder="0"
            allowFullScreen=""
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
          ,{/* <Socials /> */}
        </Box>
      </Box>
    </Box>
  );
};

export default Artist;
