import { Box, Avatar, Grid, Typography } from "@mui/material";
import { Events } from "../components/events";
import { Navbar } from "../components/navbar";
import { Socials } from "../components/socials";

const YKM = () => {
  return (
    <Box sx={{ background: "#000" }}>
      <Navbar />
      <Box
        sx={{
          height: { xs: "30vh" , md: "40vh"},
          backgroundImage: 'url("/ykm-logo.jpeg")',
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
                src={"/ykm-2.jpeg"}
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
                YKM THE MC
              </Typography>
              <Typography
                variant="p"
                width={"90%"}
                color={"#eee"}
                fontWeight={"350"}
                sx={{ textAlign: "center" }}
              >
                {`Ykmtheemc Mr lovers and friends and if you don't know, now you
                know niggaaa.
                Ykmtheemc is versatile Mc, life of the party,
                people's favorite. An MC that can manoeuvre any given crowd,
                with his splended personality that rubs off anyone and everyone
                that's watching him perform. Ykm isn't just an ordinary Mc, as
                he dances and makes his own music. He started off as a rapper
                but grew into being an MC which gives him more than 5 years
                experience in the particular field. Mongi Mokoena aka
                "Ykmtheemc" got his alter ego "Mr lovers and friends" from the
                love he has for rnb/hiphop and how effective it is to have him
                on an rnb/hiphop set which will turn into endless singalongs.
                All in all any given genre, trust ykm to turn up with the whole
                crowd vibing, screaming and dancing till the night falls`}
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
            Connect with YKM
          </Typography>
          <Box
            sx={{
              width: "250px",
              background: "",
              margin: "21px 0",
              background: "",
            }}
          >
            <Socials artistPage={true} artist={{ name: "YKM THEE MC" }} />
          </Box>

          <Grid container>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent:'center',
                background: "",
                height: "50vh",
              }}
            >
              <iframe
                style={{ borderRadius: "12px", margin: "0" }}
                width="95%"
                height="315"
                src="https://www.youtube.com/embed/gy6gGT-G6ak"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default YKM;
