import { Box, Avatar, Grid, Typography } from "@mui/material";
import { Events } from "../components/events";
import { Navbar } from "../components/navbar";
import { Socials } from "../components/socials";

const Karlo = () => {
  return (
    <Box sx={{ background: "#000" }}>
      <Navbar />
      <Box
        sx={{
          height: "60vh",
          backgroundImage: 'url("/karlo-logo.jpg")',
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
                src={"/Karlo-1.jpeg"}
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
                Karlo
              </Typography>
              <Typography
                variant="p"
                width={"90%"}
                color={"#eee"}
                fontWeight={"350"}
                sx={{ textAlign: "center" }}
              >
                An authentic dj that brings a nostalgic vibe like no other, with
                over ten years experience in the industry his versatile style
                takes you on a journey filled with soulful vibes. Karl "Karlo"
                Martin started his musical career at the tender age of 12 years
                old. His humble beginnings are rooted in the house music genre
                but over time he has evolved to become a RNB & Hip Hop
                phenomenon.
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
            Connect with Karlo
          </Typography>
          <Box
            sx={{
              width: "250px",
              background: "",
              margin: "21px 0",
              background: "",
            }}
          >
            <Socials artistPage={true} artist={{ name: "Karlo Dj" }} />
          </Box>

          <Grid container>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "",
                height: "50vh",
              }}
            >
              <iframe
                style={{ borderRadius: "12px", margin: "0 0" }}
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/-J0fR8UMfIc"
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

export default Karlo;
