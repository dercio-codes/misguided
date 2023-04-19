import { useState, useEffect } from "react";
import {
  storage,
  googleProvider,
  facebookProvider,
  auth,
  db,
} from "./../firebase/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Box, LinearProgress, Grid, Paper, MenuItem } from "@mui/material";
import Typography from "@mui/material/Typography";
import {
  Button,
  Divider,
  IconButton,
  CircularProgress,
  Select,
  Drawer,
  OutlinedInput,
  TextField,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import {
  query,
  doc,
  collection,
  addDoc,
  deleteDoc,
  setDoc,
  getDocs,
  where,
} from "firebase/firestore";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import React from "react";
import { useDropzone } from "react-dropzone";
import { OpenSongContext } from "./_app";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import Link from "next/link";
import { Navbar } from "../components/navbar";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const Gallery = (props) => {
  // State to store uploaded file
  const [open, setOpen] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [loading, setLoading] = useState(false);

  const handleOpenEvent = (event) => {
    setLoading(true);
    setOpen(event);
    setLoading(false);
  };

  const handleCloseEvent = () => {
    setLoading(true);
    setOpen("");
    setLoading(false);
  };

  let OFS2_Images = [];
  let OldSchoolPicnic_Images = [];

  OFS2.forEach((img) =>
    OFS2_Images.push({
      original: `https://drive.google.com/uc?export=view&id=${img}###k=s1000`,
      thumbnail: `https://drive.google.com/uc?export=view&id=${img}###k=s1000`,
    })
  );
  OldSchoolPicnic.forEach((img) =>
    OldSchoolPicnic_Images.push({
      original: `https://drive.google.com/uc?export=view&id=${img}###k=s1000`,
      thumbnail: `https://drive.google.com/uc?export=view&id=${img}###k=s1000`,
    })
  );
  // useEffect(() => {
  // }, []);

  console.log(OFS2_Images, OldSchoolPicnic_Images);

  const events = [
    {
      image: "/old-school-picnic.jpeg",
      name: "Old School Picnic",
      date: "1 April 2023",
      images: OldSchoolPicnic_Images,
    },
    // {
    //   image: "/old-school.jpeg",
    //   name: "Old School Fridays",
    //   date: "16 December 2022",
    //   images: OFS2_Images,
    // },
  ];

  const images = [
    {
      original: "/12.jpg",
      thumbnail: "/12.jpg",
    },
    {
      original: "/15.jpg",
      thumbnail: "/15.jpg",
    },
    {
      original: "/30.jpg",
      thumbnail: "/30.jpg",
    },
    {
      original: "/35.jpg",
      thumbnail: "/35.jpg",
    },
    {
      original: "/40.jpeg",
      thumbnail: "/40.jpeg",
    },
  ];

  return (
    <Box
      sx={{
        padding: "",
        color: "#eee",
        minHeight: "100vh",
        overflowY: "auto",
        background: "#111",
      }}
    >
      <Navbar />
      {loading ? (
        <CircularProgress size={"12rem"} variant="determinate" />
      ) : open === "" ? (
        <Grid container sx={{ padding: "2.5rem 1rem" }}>
          {events.map((event, index) => {
            return (
              <PastEvent
                key={index}
                handleCloseEvent={handleCloseEvent}
                handleOpenEvent={handleOpenEvent}
                event={event}
              />
            );
          })}
        </Grid>
      ) : (
        <Box
          sx={{
            minHeight: "100vh",
            // background: "pink",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              background: "",
              margin: "32px 0",
              width: "100%",
              padding: "0 12px",
            }}
          >
            <IconButton onClick={handleCloseEvent}>
              <ArrowBackIcon sx={{ color: "#eee", fontSize: "32px" }} />
            </IconButton>
          </Box>
          <Box
            sx={{
              height: "350px",
              width: "250px",
              backgroundImage: `url('${open.image}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              margin: "0 0 21px 0",
            }}
          />
          <Typography
            sx={{
              margin: "12px 0",
              textAlign: "center",
              fontSize: "32px",
              fontWeight: "600",
            }}
          >
            {open.name}
          </Typography>
          <Typography
            sx={{
              margin: "0",
              textAlign: "center",
              fontSize: "24px",
              fontWeight: "400",
            }}
          >
            {open.date}
          </Typography>
          <iframe
            style={{
              borderRadius: "12px",
              margin: "32px 0",
              height: "500px",
              width: "95%",
            }}
            src="https://www.youtube.com/embed/gy6gGT-G6ak"
            width="100%"
            height="315"
            frameBorder="0"
            allowFullScreen=""
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
          <Box sx={{ width: "100%", overflowX: "hidden" }}>
            <ImageGallery
              fullScreen={true}
              lazyLoad={true}
              loading={"lazy"}
              thumbnailLoading={"lazy"}
              // showBullets={true}
              showIndex={true}
              items={open.images}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};
export default Gallery;

const PastEvent = ({ event, handleOpenEvent }) => {
  return (
    <Grid
      item
      xs={6}
      md={2}
      onClick={() => {
        handleOpenEvent(event);
      }}
      sx={{
        scale: "0.90",
        transition: "800ms",
        cursor: "pointer",
        "&:hover": { scale: "0.95" },
      }}
    >
      <Box
        sx={{
          height: "300px",
          backgroundImage: `url('${event.image}')`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          margin: "0 0 21px 0",
        }}
      />
      <Typography
        sx={{
          margin: "12px 0",
          textAlign: "center",
          fontSize: "21px",
          fontWeight: "600",
        }}
      >
        {event.name}
      </Typography>
      <Typography
        sx={{
          margin: "12px 0",
          textAlign: "center",
          fontSize: "18px",
          fontWeight: "400",
        }}
      >
        {event.date}
      </Typography>
    </Grid>
  );
};

const OldSchoolPicnic = [
  "1RqyGekAm1aeZzzpeToEJguEuH_uhgYmj",
  "1hLiA1s4jDkLD-gHQ8G8Rmc2heAjvRLUr",
  "12aOjCd1xB7rVd5O-oXP05fsqYtEOhFcx",
  "1F_OQWdB6pe577KZXJSm6kgezE1rd_ljC",
  "1KljiNNtk-4RXmewlaI0R3zVKt9jLOLUJ",
  "1PeTqgKwqELeI4fUWqNWGLMYQyawqcIWu",
  "1a0TPknJ1O1-237glDyqRB_fJ1rHJtFtK",
  "1gJK3Grmw7ye-37aenqip5s0MQOW68o7P",
  "1n7socqQ8fadVQPpMXBHS2UkIdXtjZ7pL",
  "10VBNhVnk3WgWUSuYavmr0T_fDqFKazFO",
  "13zM7BNTxQX5NrgG5QdGmbjtG56CexSrV",
  "17pfIrCPQa-2wpH6tjl2YIZ02Vt_e4mgj",
  "1DFy8MvvUlQnPDH9sWmVMANImcFnqFAhR",
  "1FCYvPydq1W_Wa6_-YTKCHRsfzMr5NxnI",
  "1Ni0UiaWbHAen0C5vagfcmv6CBWLbUhq_",
  "1TuLjJBhCE2OmpHQQpMgjk9AC3lExRywL",
  "1XznvhcOxy5qpdbTr5f06OI-fyGPX08E7",
  "1LftEsogklMAkLyFGY8q9YIeYnEMNIreK",
  "1bm5qnwhXXxUDPCtmDD6b6EQQnW0DEdCh",
  "1sEpHXglcorhkHsxMDxze2lE6Ia1m2mHF",
  "1D3dILPJztZKZODTi4hbpYNXy8kV_Yl0O",
  "1inRJrZGnQmlUrVclkIPGw1d-mOxKYTsb",
  "1-riXyiplEfAtLXcej-V4ma61G-96KHTr",
  "1EAKeqwd5Cd3KDu3_WbBRuhlGpA4_cjBW",
  "1JYAYg-AEEe2NHhUaXXv5XjyrPESy0-XW",
  "1hJbqFIbtyNcNtSEz3Z1we7We3Wlr-c54",
  "1mE8WUVceppwF_C9OIHLMF2AUroO7h8jT",
  "1p0fFiRvqmIXIlQKbcs7__Tpc673rYSVX",
  "11UjKyv2_06k3tN4C5WCsDgmcyf5Djjv7",
  "195Q3vRcK0BhvhhtGJMUJgRqNt42NAeDM",
  "1Wg6fi4FDh21kl5JlUAXnGT--P0HQEeau",
  "15VCQTpSVvdcB2x-iE7zgKjmneFXKRnA7",
  "1l7vsqFWz3GiSju98N3AjsqTAWqyLWWTQ",
  "1zipiUlPfTe3Qrvz5lSIUA0pIDXmHPORG",
  "1Rb1yGZMkB1xMW_fADdrvSPJ1TnTLowKs",
  "1Y-d-FyPDV7HQq1FVBuCENfoqnNeJ4OWX",
  "1ij2yRPLYaE4BKw753kLbvmFLTP9e5o57",
  "1QfISo6CGQcjjBerofTNi9uI0MM9Ns1hF",
  "1qM_DVxiT6kEQjMx2SQhEca3QC4iVTree",
  "1yRuFc1VIpNE1ds9u1zN5uCzIU9jrr_4p",
  "1Qy9LQqsZvpVYMBACrcH5mklpSM4u9mEG",
  "1on7KbQwd-gI7upHo1wj4I3ftmIFPzVN0",
  "1uxskFK-GusGsM0HWY5MsQMBI1Zjc_zi0",
  "1Bx5KlMd_g-ito1WP-gVaC5_hyXPqpuF6",
  "1V0olNZnk_QeRoNJxHglGlgv10E6Kp7TX",
  "1s_bsby_Sc2NmIpu0nMtknhsfyPJFILzg",
  "1A27kLEpd-fTWjPvRuIHTWVMuztYYLeqo",
  "1lfE21P6DfJiRpQ-E8RiL5ZGRMrLrclue",
  "1cNE8oWLhFqKfDIrZnDElTB9DDXWAdX5b",
  "1vpNt0u6AnJ7m1vrCim0m4MMd1xK5B8OI",
  "1V1O5pL-n6l84Sk3nQPFiVg2VvoElmlfh",
  "1s9AQ9uOJi9fguSMw0ku9MduMoeTOD_Lu",
  "16FSpIBshSRi5RaUxR0QGRw3NdTqO-r-m",
  "1TvG0luV7ScuuWkSwBAL4K0uREouYfnFE",
  "1ZhHKbH-i1rwMNeMAL8WhUEWFAQ_65jvI",
  "1hx5HNcZDUZjAHT5EBGD0jHo9O_1JQ25A",
  "1rcywfNU8AJZlZfWo5aBF5AuG47uOmxRp",
  "1sBxYuolpUqWDwtp_dRSrOmu5-ugHJ7Pk",
  "1uIt5M-TNKq8az-215xi3Wbr5_sW6yQY4",
  "1Af8SKJ1S5CF5iCuDvbqdaUGKSKiQfbUR",
  "1F4k3nafWc6eXezuUsfRieEI_0Sn6wuug",
  "1IiVKpI2LC8N7a0Wfi1Pej1AYhIHb8sT7",
  "1KWvi-X4wyEqPNNkRhHjbZemhodki2sWC",
  "1T2C-UBeI5fD3rPI1f4odpLRQ1CF5PbTT",
  "1W4Ip8Kl-mVgFkm7DRx0XOqCcBvzCCso9",
  "1lB7tUhHgcdJVOXoH2ZG6cPypG379w9h1",
  "116a_SZvMoKcyNmKhD4RqR8MFuM6QmdFY",
  "167y0THGKzSJ3MQ-bc0MOtV0TAZLgHB8I",
  "170Xugl15MC4PBwTYLFY980ADHaA4yI5w",
  "1b2BPft5T8_E7uE1NSsA23hv7LD1ce_BK",
  "1e8Yo9SlI6iNm0lkpLN66EjtAasSmOz8f",
  "1sxXrN5aYEChEYCb4Gr5BLMCgyIucKrTM",
  "1IpMFVt7an-gb7DJ3HSkv0MdBd8qLKSq_",
  "1WKVXpBa7SHfz-OW-5aJ675tsc0xZ41cR",
  "1YZ5G58NORDpz9GnUurZMZ9sQaJCFX-kY",
  "1_jo0fgTMivkyZa3xInmJvodULiF15XaV",
  "1bGuLCxN-pDngCwX8SmeePDszN1SYOOgI",
  "1ojweY76_MVFYVU2NXp6c7VYVoLOuHD6B",
  "1wtgBZfs2ObcNhN6etrxr41tWZy2X5wrd",
  "1ysKiMouoxfl7ceKZpFwbPrwEeEMeU57I",
  "1HpcKfCtyal_owX6DvO85K8Jj0Agf2YRo",
  "1fG4xTy4NBxRVrbC74kH5fhXU0nlgmJ4V",
  "1BUjth0bu7_grJBcVJFHgiDc3KUzZFZms",
  "1BfJ69zH3-yhTnPLUaXGIkjoHqeqF81fR",
  "1TwrFgM5drQvPtOg2heIjv99ijBGUvVjb",
  "1VKpDmCsRfqQfJ6u1GZhhx9PSeAheKBUa",
  "1aYIhtelNyPuwPNikOM0ZmVSQFgvrp1le",
  "1o5IUrY-zVDkshM2hwqfGbpAq9cYtoTba",
  "1pCXF1XTAZHbRPW5shtKb_mIvaxWjy4N2",
  "10xo5rVYeX_eL0IRayoK8fpTQgZd_iS6p",
  "1MrcEEXqksKvboE4n8aGoIZvgvaoJtDgj",
  "1aR9VfXOH5HlqpliAyqPMb-QM82F2si6G",
  "1f3aZDm0kuugRNJxDSWwKQiCS_8w-jwQv",
  "1jYWUk_-XOCUH37h8isBgAhRSNKX3D9Q8",
  "1tbBtJUZgsO02QyyCjvSF6-ZXqfo9-EDJ",
  "10t-EJ_DrK0TudtFqUFypOqwqj7V_NDKP",
  "1OwqeNIkQNsiHdNJGCq2n_WSBn333wyYe",
  "1c8rUuMoU2o2gES0dXQFeIEpSk7xZvPXE",
  "1cFgki_pEFNaointHWxE5SIIK7Cnvv8mS",
  "1w2b8usep9T-3C5wWjeZMyNiWB7S5npoC",
  "1m_Kagxb7Jjy6TZDYNa42ATOGoO3-EwKF",
  "16z1ix3L_F4GpZKokxM4RK1tKkkjgA1Cz",
  "1J5TQgXQ1jwYCJHeN2fKBDw9ekk6yfWd2",
  "1Tm9Ycbh7qXN_sQqmqyVXxCGUoOtwO36d",
  "1WkmjgI4QpiXU7rfJS4K0LRlnps0Qgs5E",
  "1_XEaAfa9_RUepi_ROiWn5gzwlkSaqllj",
  "1d5qgINCOAL0O4Yvkat8LXzRC4LPwpOYm",
  "1qqN7qT556r8pgWsehLilTQyEBuRU3wYA",
  "12wX2ZwR-Q4Yg-Eh5vJVQX0DKnTGM5WiD",
  "1rilXpx43oA6nf9q6MwW10BccMPrb68cl",
  "1W0y9ONpMImU5cQcUGnojuYi0M1usJWp7",
  "1kkLvYj9Z_RO2h6IGerQzcThlZeua4OtM",
  "1sRrpd00DPl1XlXyIFTPKIoko57NcZDIs",
  "166Ghoqoi3wrpQJAP5JYENiEZb1phMcGS",
  "1B1nFPFRfqyUU-35mtLGGtyZFH4y_3PVC",
  "1LZS8OOeb5iICWDDcVPifwowOB9duCCTJ",
  "1Wr3OFqc5xiEuXUWhUopxO1p6mu2-mZEb",
  "1d4nxW2zv_hGmdsHEZyjI7EylzYkFbDjc",
  "1kQBxIfwcxEBxxR3koPiQ1hrljxB_OPSf",
  "1kS2oGx5eZ0OQ-VFeYDjJINGD6dZ4VEVT",
  "1S1FxrjK1GoamkM4-smAM_dtqYO7_m6vJ",
  "1fpWunaaGd8VnQtAqDkVtYhEpnj4j3Exs",
  "1lbf49Lt94q4NfRxF_wx-8zn2fw2dn49i",
  "1vQZynlohaaPYlb889edmLuG2CML83jSL",
  "1wBOFKmr0qKgwqeLA3ZOMQx-yeec-CeFP",
  "1yn84dwyjdoxdUelDxcQxCyyblSSmtsKi",
  "13Kni49gclGybrpaSfwqa_m7sRA06ZuY4",
  "1Dy--tsHW3CUdPP93kguZuk44g3_53FYq",
  "1JFPyOPx9mE7pgmuBSnE2ATjEDbtN9x6v",
  "1MviMEnSgwx5bbCs3FfUiAB0DN365qgbr",
  "1OBi-dafccMTGYyGjLCPlCUegfyTUzQNH",
  "1RUH56XLdt4yFEsUhsBmHGkahoRk3KmqP",
  "1vBvpvIYAZg6ynO_DIXD0DPak9Trb85B-",
  "12QZwSc1da8oqBfl49ADpyEtfa2IFA_6P",
  "16wuSwZJY3L2bpbc7MyheQj4lHvi0xnaL",
  "19o_QkAMWeZ2p-ZUiP8iF-a-7xJJLglgd",
  "1F-2dRXvRkAEq5TWXKLgv7bXiFJJlkVb2",
  "1I8UN-xj-nPNtFwCLdmwT_jVjr3gPiUoK",
  "1PLhL8mZrkulb_BePYb8zfc16InMDL12U",
  "1UI57PoZij8DPRM0NBhfVzbn4oL4kDheE",
  "1GyHajwPFM5jM6sjUeT3qT-N4aVpKIXVq",
  "1LIIrQ56CrCiAc34OVRvvdyW9up37-iLw",
  "1OY7lOByUB_UFMYxF8q_1_XuJSgD92g8c",
  "1Zk8K3ETYYiyR1cV0mwio1wlFZgy7WZ09",
  "1et4c6vv35HUH-jIw6OBNt0Y3n4cYv0PI",
  "1l3dy1KLgDpC_eDSGObq16lZCKf9E7zqu",
  "1l4jJ15GSr7kO8Xvk4ZESJx4hU0Lh2kXg",
  "1syeV-uHb3xjAcfJ2mU3WOpPcHKDQrIOs",
  "11JDuWEjpJ1EYjMHLW-HbY6a6fyhmsxk-",
  "1EcJ8JJ6RD1LFplNOKMt4Fy6itgtcona2",
  "1oTM8e-ES51XMP8sKpyPwppOwjUkqBlpG",
  "1pr8-hoX4KnhUbcuYpLKVoBT6Bm600-NA",
  "1s7xfHgLIHI-NKEUl_BS6c90PeOi5rsxX",
  "1uLyi-Wjib8rj94RIXGt89F9YrfXzae9I",
  "1xT8v9M7L_qwKT5tZe0XhTjKCPznwj_l5",
  "14Nvi6n3j6XUxml3J8RZftF4NAfANi9ke",
  "14oL_ytWQwDhnZ0Aqyz9Zr8GkisoaL3-5",
  "1OvqMN4i-S9dArd2Z_F0jU6gsJiabePP0",
  "1VD6_jUs4WjhsP8wG4-wK1ZQlo7S-H-Le",
  "1W_M-fRP7PfOSytPM6vywmV-k6XmPqUbC",
  "1pHKfEgO3hYqziaBalXR30Vvqc2PsW3qF",
  "14Di9LrpYDvDPbVap_WVSKXB6Fq5nOZcy",
  "1Hr580apyLFajPQms6wEH-1vMNCQDZWNz",
  "1IZ6FYnml4dd_Mp-bwJGeyuhPqdhUAEtl",
  "1TyZfV3Z14zS0V4E0K7xwXkzjN2_TiYNR",
  "1Vh5VkJzymvmLoK2SQ5frLrAWtc4K4IIN",
  "1aaVSEelUEYZbczWQE9S_HFDS2O9Xo4tl",
  "1uXRNykZkCBZdt0svEsW99bM9JngNhHqI",
  "1Ny1NiFC6QmTrAr5-6mWhym2XI7-PMILF",
  "1gsmW79kUy7lU7LKHGvXUIfTPno5YFWJm",
  "1V2Pq3lJpBmZvAsfJaBEqly7MYHejSKki",
  "1fXQ_UYx7HxSfw32PV4vh-VYRpe9bmihl",
  "125mNQ8qbn2lkWcLkdXdX3CeojmxmU9t0",
  "13IbWVVQGgAblT2401KWMUBDXk_Q4mj8j",
  "1ETZrfrJ4PjMIzctkA75CzGzZNEPV1nrC",
  "1Mq_ubZSEWNiO62438raGj26KgzwhMUC-",
  "1SU-fiiAxYzMis-fz7sfxH2LqxdcO-KYY",
  "1sFIA_mpC_nM-cEL8IzHr2vyt7ujY9Igb",
  "1z465ILRf_8BZTTS0yp5XwZlkLcm1zAFJ",
  "1BLFwdW4TESMwRfqCSBK-zJagfpKcYLwA",
  "1DK32ztE2IWhzr6NFJTox-Z9YTCcTZsQQ",
  "1KqeJ9bhszYDwTXESbXLyRD50YH-_RSSV",
  "1SWk14vnQVucpyZibZnK07WC36lTEZNzx",
  "1UgSsSlf0FzprrGfLACEoCw0wECchQ4jM",
  "1nlg066v104GzQ6sppBX_nGA2mmZOioa-",
  "1xOKAUxERqz9ykuIVxDRmDPsUTa8xZJn9",
  "108AWcES6cItflDvuS2XSk1DjqEv5evEM",
  "19IUI3RTBvXENj_ERPk-Y9vaOYpQy-ba8",
  "1KnZsghNAe_2iLzToSLku-FLVsi02Bsjv",
  "1NCS3tI8LhR3OeeDtyuX1QVQBSco-p7oi",
  "1egamFruQjPGftVTZp8P7-gR2kMS1AJHb",
  "1pAsGr9-B5_79qkOy2_XiRrfjNycbuHQx",
  "1tQMtHMU-POJU7RXvBVe_9ywLuZbS2gYh",
  "16M4RY6ZROQXs3NClaAjL-1Ug-N9siqUT",
  "1EUS4KWJwKvLKX-dwjVRBN9K2Xmbz98HH",
  "1iC9e--O3ciPLlC4HsfX-j3B4ykKyxyAL",
  "1k8mB-OYdCX10gzB299RD-i3wVicLSYal",
  "1kct6H45NDHOq-PDHb3dNwuHd6bsBaEeW",
  "1vh_L6JykzOBla4RZ8DmZUuI8brky85JK",
  "1kUxi4G_9_g11h0KEQytZKRYmKpdcwIy1",
  "10CGiTGoMGcsF3euYlQmR0ijeoj8TlMqe",
  "1KgmcjpyN0DduiDgrxatFdA0crmpiv5Wi",
  "1-nhf3HC2fUirR4q_AxT7Qp309Qe8VWtr",
  "1MWEb9aGJwgjRonuEV_Pc_xX906n_FUOS",
  "1nNZazroPi9ylvUeKGWtRplX1h7Mo146w",
  "1qMaYfpz1TGdz2JaA2EG7y44TCYVXdSwR",
  "1wLwIEX9NeT8wyjMmDmCQiba1U_JFhtC8",
  "108yz8YX2N5jeF9wY4ztQ2UoymyC2hX-B",
  "11AVmTJ7RevqrzQmiHUxvLjqpW15yggr",
];

// const OldSchoolPicnic = [
//   "1VqSFgyFr0NRHsdt2-aYBa0pHu42U1K5H",
//   "1J8psDzI1t0PbHBFpnj02LZi5NEwCmhxT",
//   "1zhKIkcSGR0fyFRaiUjeG63JWsaHymwwP",
//   "1FI2J7mPvzGDtygc_s91je8jaxAO-0BJw",
//   "1jPFxkEElxvmgdDEefpaMWeL1x05rGzw5",
//   "14m9eS-TdMapz7ivxvrjKT3ARRCbA7g0Q",
//   "1mqF46QceSpgCN6hZpPU-zyF6oIECwOTs",
//   "1an0kOSWdnMXyl7S_enJWNmYKSkTVlncW",
//   "1UdMYoG7a-zShfrxnzHudjA374NDtcQMI",
//   "1YC6BlNn6442uCRi5Evk5nOrJXWYHQ2qx",
//   "1hdDh6q_PnY7g5VCGDNwfD1X4SgdVzgZq",
//   "17e8NKxCn72qNIW1JdRoE4EhzUAYWTrMh",
//   "1kXTNTcvkJ_lZRbGaihbZEqyYvtB879Kp",
//   "1TR-BLvjcr4n35ioV0rmvvy62u8ErrakR",
//   "1wvxFnc5-0k4-MgfIS_UdNvjdxMln2lBM",
//   "1ISY_kY100_bK0MLN1KVn46HAeMmhrD5q",
//   "1TJ92IIS5TjAa1ExdV-t6-3BcQTpK-S-W",
//   "1CyFoppYj1U2bzSf6irOlJe1_39RK4l7c",
//   "1u85MCnNUp967TAmJ9pSPsUcjz4ZKzpaY",
//   "1A7_hAv8XnCDZ1oDe65x_yBHqCOVkVpXq",
//   "1d2_v1J14CU2GdBaVvZK8NkDOam32G0Gq",
//   "1_oeuoHgN3mATltWo9NQC9MtepTVVJWbk",
//   "1Dov8pcGfIlB6N-J3wgJFw1ApisVJ0LA8",
//   "1biozZLn-G7oTRDID9DtcvfTC69af2jKL",
//   "15doZSEYfAJL_cC7e4Yu_LQKB6GUWIjwg",
//   "1mquDQbQ7JZQbNs4G4Rey7PDPDb9Qvg-6",
//   "1ggk8Om9jjNUPfaJpwLUZjSGPuKwnbCNS",
//   "1SuYRI4VR6B3SDgHaCEgwAVrmHdNbErj1",
//   "1KMZUqkqwby4M4kgimzBLIk-NWIQ1SbR0",
//   "1yUy09BkHwIW8wvQ7F5_czBcapzu5UnTL",
//   "1lyrA88TAaWBnYnmJdcZLaSa8A1gUvu0I",
//   "1pN-SAjyEu5I159oneut5U-HPxvoc-TZQ",
//   "1UiMZ-xWg-_ZOHMtzQAABrZbObZMZuy9v",
//   "1GT9Hhs3fJ7BH7jg92Ukm4btYncugsN9g",
//   "1Q6_8cIa3D06HO_CYtjE_tZU7oYxk0QHQ",
//   "1FZ2RjwldL8L9XflqT0PWIeeBU1FC8nTj",
//   "1LYGpEWVu31qPUP6hq8RGoKdfJ68OiKyL",
//   "1UtEv50Krx0qP-pKIbzX2bEAt0nOaz3k_",
//   "1FyVFnljEweXkO0Oiu4MnRlt0CvLHY4ZC",
//   "1tGiUzPx5XCyDjAJo1RVNpcrZaFbZUMxY",
//   "1PevRIEHmMdkvMhIvtyRyA-fbR5ZxEVQy",
//   "1dEqT7mqoskpeZUv_S9odb23zaEiQ0Ptn",
//   "14xEGCrpsiNUnbmSu4bHMo824uYZkYwVm",
//   "12uvbUQFkYDWvdCHf5omsYWDikTy_YNSw",
//   "1NYERJjxGXUK7u_0y5tfMfbG-0066-gXS",
//   "1k6zwd1ubWuZfQscF3WYoG3VNMUR9k5A8",
//   "15LWY1fMN-wsbLYtgAbWnhp_dyYPI5xBw",
//   "1z493mFRDQ7GXWdb1L7a1DmgE9Uhwl4KV",
//   "1949AcsbsyUKfzuuvbPawSPpBv-Cmm9Er",
//   "1QCIj9pmAZE2Lb9NFAQpbg-yZci5EI5Yg",
//   "1WpjDa7h37WGsjYmtmnL8MFTILMjPsGZG",
//   "1xpLHCWMmkeW5zBXFC-bYevBtm9goXEB8",
//   "1_I6b_92HGXLT91A-aVjaXkYjP-KTuQIU",
//   "1OT_J3a5uvBQnch-aJOxgfLUteqsxVBn8",
//   "1aa0_JosX18CMpafKooAyW3xcjKy3W5wQ",
//   "1lDTdzjPvj41pENIvlGbvQd5Px0iHfa46",
//   "1KYUIoiffSmiWBV_1hZybF2jZKCrbX-jG",
//   "1Fw0cD5Lp24dG5FadYAtI3KlcNxMnZcLg",
//   "1icj_eVOL0BKDRMQeEYmm_bvXOmb5bhwD",
//   "1vk_TLOWb0TjSfW03HYx3xtEuArsoJLVo",
//   "1yn_e3-lVVMom9t5szBmIYPh71AKSL_VN",
//   "1EaXRmCJ-i-5GTE3WV9xYhrhm3VX46L3n",
//   "1Kdxb2ebmn8IKWOAe9lTxEvWECA4m2L7b",
//   "1hwRrpOB_msFsP-0uX_pDfpNmdnFl2yE_",
//   "1Y79f4fefsjOsXyPJ-xrzv8Q1F8Kjp5Kj",
//   "1marmZp_HxjJYIpa9CgiAfxr-DeNoyIUp",
//   "1LGovNpHg0tKwpPnPZqGYxOGvaic8t6By",
//   "12kgwG8gWQgicXdMH1GtCoHUHEnOEgFU1",
//   "19-aehWv910ZhylPqroGK55Qe8DGBhpBc",
//   "1eRO7OKc1QznxTCI8VpHYCd90LL9xnapj",
//   "1e6E92AtXnR9sp7Ar66PPtpZWqF3I16aF",
//   "1a7sV4rJQqrier9jF2-4YANLRSVEuYpoT",
//   "1tmx__zTeGuKKNtBXOhfmJfAFqaZZfr8I",
//   "11LUaTdiIwo_M_YM0NYuzFdnQaDMfDi7H",
//   "1dLiBuPphCEkzHRPZ5kONw3jiyUyOSfAv",
//   "1BYdxQZPfldtf7aO0e1Leigi2VDepi0uj",
//   "184ISfTSF_Op9AmFnLX8OHeheUTkM1Znj",
//   "1kSVtX4oerFPceXC9xA9mlz65i5Zi8Hlf",
//   "1CkMc8dTJ8GWn68KgZtUc4sZSE8SzMe58",
//   "1QJQPPUS8-KJoDOpwL3zS16p3usG9p9jB",
//   "1odT6nlXHMr7wfMDUlIQ4JTv3PuiVZZS3",
//   "15QwWNQEgbnRffNPMgyC0C3ZT0zUVqi96",
//   "1HjVidDo3iiBly7W7UzWuOY3uYdKM-sat",
//   "1rz5KAZW0VFfjnoNctfQxRceMHnhYqUxh",
//   "1_hiJmYNyyndVw0u0SoBeSJExYFvSl9ON",
//   "1jN7n7otrSfmJl1NZ7oNCfAQ860G4zWSt",
//   "1r03vCjz8hArx1_DsD9vkHV8ty8pGqL7c",
//   "1HEOWc6HqPe7XPUcVc79dz13OGASm56tj",
//   "1bbIgmsujSYcc-fhktxxC96ZGXEoLB15d",
//   "1K1rCjPfZYeoaNi7WDg7FXjliY1XtkMpj",
//   "1mVdtMh1OxMFBqrXipNW5lFWFCYNtLSq_",
//   "1iFozJtnRlLJXCBybHUU2jTXv8woU6lH1",
//   "1TjWMAL-pLGUY98G69oAdU6TCo8qKQ5iU",
//   "1vkNvmswkT154Yhw9vX8lERj-kUYM7MHg",
//   "1C5gZwLotBfr-bKVbtqYUD98bZ9o6LMbX",
//   "18vswqo-nlNZ4kRYBokBUMg-SMd19Ebu7",
//   "1_-INFoM05b9Zu1pr0mQdJcTIuIMVJkCH",
//   "1OSn4CkglQTtK1nprDay0q63hgYdrHeYa",
//   "1oiIpv6FSmQGgbWJpsniVxNVE7cX6-EaB",
//   "1MbCxNmmwljUUvAO6bG1O4E6vAuae_iWs",
//   "1gO_Y_ZKeDNlVqFhfF4VGnR9__-0hV0lG",
//   "1W5gD0TbNNJ0oy7n6CtA3XbG8HzElDl0J",
//   "1bkN7L0RjipoJJ_khxPairFpNjMO3PIiG",
//   "1AeDr6RBK4y11r42kPT1Tna9Hd2zeK1Vf",
//   "1shnOiBwUEmncFZ46EGBQDH0Rv_irCgl6",
//   "1ued56xSN0f4fxUGWooSkMoUGU5NNtlbc",
//   "1Qb3BSY-h7mmvyhk6wlx7HgbS6qp0P47v",
//   "1rfPPdPTUyj8glZvVC4eTgPErqEj6X6pc",
//   "1AXB8Hb2ngUvi-px_VUX9RxlV8lp7Yao9",
//   "1-9g1SqBDXQMuy-T0Uz4k03G0uKbsTATP",
//   "15U3SGAjoHTZcvVUwLt3c2U5YkwpRphQl",
//   "1JnWkrsQwLIRRjApA4cE53LHryfUXSmyd",
//   "1q1l6Y6Y79hqI0BmpZyhgv9jLlXK49JPO",
//   "1Esy6CIk417sy6zoehekkPnsM7_nCPKc6",
//   "1CW2UfMzYjHch1nHEfJ2ZzVoP6e3QNTWC",
//   "1D3M_bWBdxxgJmZho9mkYXglq0V0sw_t9",
//   "1XHs9qXMBGor9Va7iequXjsmCC5BhO3y8",
//   "1GeLNBJO7LGPJEp6B3eziMnV9sukfSKEp",
//   "1_J9MSAARkyQMqCyAWcoJi6ZIHLuz37fa",
//   "1dsCfSIwQcpY0pXmarkxuG6csKp3X93ss",
//   "1SwglQ2a2BAgItv586OfF_tBB-DKuS9Bw",
//   "150ANVRGfS9fGIOKvr5G8RIX-Ybfiyuo_",
//   "1cd6j6HiT6Zwz77CCBttgKAjqf-mQq3WW",
//   "1t5RqKZzXFOPsJvqn8uBMnKr7S58VYeZ2",
//   "1yRr1MgrhXP9yoYddXbVytJGCyum18VrR",
//   "1HsweB3bxri5zxZzXbCNG6OIAtBowP9rs",
//   "1LB-_w_7NKWLPeWqQfL3pfYuLP2tH0QEd",
//   "1TyCBtlUskUQ_nFsZYx8Q8H-q_gxfIKWL",
//   "1pjR86tsJdKE97HxM9dqFB55jmdx-vsWm",
//   "1aQzgdcS12v5Q6YhyeEixZE3e-xVwubC9",
//   "1fP44dlwpVHMUhE4puErRQXnCVOBTpcCd",
//   "12GH6_pJhrUQVxWViQwgaiaqWkJJkRZEq",
//   "1Pj-Slr_D2PZ6toH9eievui92MoQkPEM4",
//   "1Gidv_dArNF2-1Ucv7wabe6cvkybnW9Q0",
//   "1p_9jrAhARU7N1aQg2CIMIJQVNdLI5KF1",
//   "17MPSS_zqUuTcAIKRcovjKgke-M-LMvjT",
//   "1z7M9gcTa2JeCNhpph3Oi3hRDMsn2f2zP",
//   "1WGFFHwuNMUswYyF-2Xb4z1JUX62uzIiR",
//   "1s4b8ck4dIHn-UiClp7KdIVZsEBIbMwDV",
//   "1NFGLxp4ju6erW6ul-d3slkSDcoRTNGk8",
//   "1XNHiaQNE9Dc4yAa0BYSbGiC8BB2Umcgk",
//   "1CyTEwWEZ7DbB0aiBrjHB9jv4K0aIK7of",
//   "1YdZDubyX2Cbt_It-dZKBLVoAvV2uDoyW",
//   "111dKpo6e0c7s39Y_4Ii0_vfkq3k1ZV7T",
//   "1YVEqOV4Mqf0Gjh8iP1mgZIO3osLxPhP8",
//   "1Icy4zoS33kDHOmnBiHD6KVfvtMdzAtPQ",
//   "1Jgsm9AanZ75zAk8Y6zg4Xt2q9ABj2pE3",
//   "1KaiVXb0bATdau3-ALg4XJRyPM95WL3-7",
//   "1pFmSfJNyP9YEZDY4Sug0HWAKX_SgYh78",
//   "1cWOxkU7xAFK54jZumWrw52T6Qv_fz4Hv",
//   "1ehvFILqG32H6EEF97WSs4Y3TncH-cEU2",
//   "1fwcQtNryH3AlvuAsaiYNwvLjdZOF4YkL",
//   "1nGBm2U-MXSP_alqqdzmQmWBZiQZ5tfXD",
//   "1HXhrFLFQH472f3wU2EuGls7Bs6JAbw2i",
//   "1PspVWd4bPWqIzv_xMkxiAf3PkCxTfhbb",
//   "1RaYO2GTbJUoIXRvkL4W5GNC4t7Rq3TRu",
//   "1CEUKKKp-rX-T9FDr0UbXMdy_UdNARZFE",
//   "1G306U326EesX2_6UHWuOzABWdYXDjhat",
//   "1dvFMXdbnVpw7UiUiiuCjFSOXpaYO8WIj",
//   "1ikNPbEuSDZ8scgf56TBAkp-Wca1lyyuB",
//   "1lBbKURpvhrHdnzugYpZkSku6Yt-1OVEP",
//   "193doJ1aJ5hFImvWUAR1xSdy5ZKs7XTH2",
//   "1hlgwSUTXyup-jNgeOfXxxqQXX7tkyMOi",
//   "1U6qBRCEbYEElL2I7um9KpVLdmj46zPL5",
//   "1yo-xQ4S6fxjymAhhAln10-M-IELBp8xm",
//   "16Na7XJ0DgCdcbCSwPQnXEn5laDr29k9s",
//   "1P1awAZsCnKfBfMbwkXaKyjr5mofXUJ3M",
//   "1-CWPU8_Q0H7ehmgAQMn7y6h8xyVq1N5m",
//   "1uoXNCd1Z8BrCTqi5raSGQM8_2rHouqmZ",
//   "12ZJP3xvDNb8Ch_u7i5TA6EVb0_8IPIEg",
//   "1JmwgQO2oLwg8oHB9PBOMUOlSO3-oUl9h",
//   "1tMdgJx1nf5ayDLsoh0cuneokKHTDzbSk",
// ];

const OFS2 = [
  "1vARvCNRsENFG9p9CM_mqCsuecJusT6kh",
  "1AHukiebRpLA7cnjoeU5iMHp42F3WOTRV",
  "15ziqDETQFM6wGGU5PIausSJL9ThBWwCn",
  "1LPrErnh4cSjy6bxkKkspWS0I71zvT8eo",
  "1yplKRAutGwHUVPGzGyNlXgUczIsCUCHu",
  "19mAVqtjxkBEMZrDUiy9S2DqeW_SMdoz4",
  "1qNkyV0C8xO70RmF-mAC8Wn-0T-1K80rJ",
  "1DEnRXbQ7ZGu05OrVpS8TTVTuZQcDLfiq",
  "1J0IoUqM4WK1KS17Y8QzTY-v2AWEZEV6k",
  "1SDMdpxiuzkKzFObAAllzyD9yu3jvbwWK",
  "1ZY5CjFrqDbvewwFGZ-6tHjuA1vlZ0qjH",
  "1nZQ5Yo7M1ZwBL1mxQC9q-5QSiG5BIq0u",
  "1iznbSDDuJ0-ValeDzP0eNnuWRHeJdly3",
  "14FrpOSN2Cao_FL0nBKoyM3XQ7vHl949_",
  "13EOEpfqaaorOfRGnDmNkgYkoRRto3Gpv",
  "1GCrbk2S-zwSaOyWDeUqDaba5b3nlcCGZ",
  "1foR5rESLP5WJLygY-as7ZU4D_Mv4ycgc",
  "1m4HNlrtwwiHvXXgIkx5I3hyrpc9mARsP",
  "1SxGvushp2rHn--99FsIQQ7H0gD7GSUQQ",
  "1Y8TD-NDVrKLu68jvIPTvz-X3EF37ttA7",
  "16NPDKZKI4JxVKm7AcyfgHjrrbMJ6Hm5n",
  "1KC1X7JWtyCOBlSdqaqhFse7s3AHycFmy",
  "1vIytWmaKY1_P_8_kMrxrgDCCaOlzGEdu",
  "1Bj9kOq2ohnXa5G3h9RRZSpSKd4m_UZW5",
  "1b5dApvIbTzIa4yp0HXZh2NO8XajGxGLG",
  "1wKJdUm6xTJciqeguuXHDNj2V3UbMuMp_",
  "1WBeoijLqhgTLx9Kl8iUiigl8rWG5f5q9",
  "1vbusyF-v_pWVXW_XkhoADZ6WatnVY9ia",
  "1TYUaf76_qoVsTFQvhXfL7tQRHaTXIeoK",
  "1wObsSrUbyN3-pw1sp89iYqyV4zxMq4eQ",
  "1xwDd1k74mApfOZL7w2fdu2dzRu4bfnAA",
  "16vJSBlRONn8yujvshsI5YcD1V4RARwMP",
  "1PMzmjMAbIVaNlxXnahNDhYWunBVzzOnZ",
  "11OZPMCqwErF3FvDKNdo382BANxHg8j-8",
  "1DrP41jE0ClqeCemv6N5YV3go6sORiA4S",
  "1eCOk9yvVPr1Fwo1UYPj38qciqxOs0zaB",
  "1YlJApfdMRaV1EzzpCuQfXhbmj5GV37Z_",
  "1JwqEL4FfCYU9CEEusYKkHJXrX-nmcv0D",
  "1gDzxPlzrFuumNkuoGvtk6ebD8YRLJHo_",
  "1ZxJPK7fcuICJHmsYNBRH7pwnldSVDz9Y",
  "1Z2eiEzh-yElYy-S50cIPKVg1K2wVrgUt",
  "1yd45XlTqZBuYwl8WOstZXYfBOHGKHJdK",
  "1w96CjHShR0FxbWjr4fkgprdQuermNLia",
  "1sBawo3hUAx_AVVGT_4TsNTOqWnl9xmWk",
  "1gAQq3mHbFoZPP1pj9NUoM05lJCxT4zYA",
  "1V8ErBN9WY8-aUM9d3wP6Rb6nWSO1L-1M",
  "1J9BoKo85YISUW8ABtbRooQNArji1uxPR",
  "1WIszdNtzpR3jU5DW6Udc8f8F4bgpmqG_",
  "1QXPZUHOtMOftnUJK5wooeFwKWSBLfjC_",
  "1qA_x976HQAz8qOkr2mQuriQrK8WprJSU",
  "1UgBtyuyys9mazPrQAWhgybbdAbetyQEY",
  "1L5bSADpOY_DhomRCrSPohwenyS7KvNVU",
  "1F_C-pAlEEFKLXDkf7a2vE8Eru_0LWsx8",
  "1nugigKDzrz7rjFXIS1dpw2zk4ia6b6Fi",
  "1AH0s4sYpATPoiRaWDKBaqYxkVhchWzv4",
  "1mBS6w-ESyyfXxrzLCFBC118ih0V0woME",
  "12XUAIgUibGgYIW_4JKTvtBIpkVBnSaAm",
  "1pzq3cA1GlpVfYqvXsQHtvgRlTzpFy2Bq",
  "1YbhU3BNB5z1S9V61P5TRssjY3UW1h5R0",
  "1CMZBNNy8vmHat2zg-o4YQ6xcCeMn8R8U",
  "1NiXBcZW_N3xr_xVAv2nkuugHuA6UMfgF",
  "1wykdqpkPalIRkq_rJ-17VDVBU4uDnwkG",
  "1WKlah3_SfHxuOexS6_Lddp2fdtDhJt95",
  "1NFUQ6yl05FdqpXAEQkZhNlUKgxGhg0sV",
  "10MvD2k5gnGv2Xwgny8D6wenk1890MLlj",
  "1w8coAzcGenizanJKjOOc5XF0FJBb8hDP",
  "18tb9N9dCDfm0TUYC6aGNzARSevDzK_Tk",
  "1B42E0mAf-u1x3ygDtNlFWa2_p1VxUjE_",
  "11HNcH3RL0RRcclmIRDN2EzrIxJXADebl",
  "1Qat8nBHgSegwmYQAFQaCwKLqobyEGnwl",
  "1ZtfKFn5LLg0PlMOy3-mxm3DNC29ngO9-",
  "1PhVW16AxHFnD_UGt2zAMWuUUkz6ceICK",
  "1gbTUQVc8Po8AvgdZ3IGs6_Rw2FG2z5hJ",
  "1x9lFJCfy3S5tosgWWc-cP9F4eLG38TuQ",
  "1LmIHF6ONpBoHiMqiQQ433SBAiM34OKvI",
  "1EkukRKCqZ7aMi8lj6t70ijORk_oY6AFD",
  "1un2Lgw_QM3dSBl-QLF5l6DAgSCKs5bD-",
  "1mgtaBRq2KGE1yIAtqCf-6lcTPI-v1kZP",
  "1iM6FXf4U1Nr_N8XoXb8N6xAfTsa7ZjwE",
  "1MpFu02426eU7vkM8-MJAcK5svqZt85LI",
  "1t1PQzWiWdJSwGiBhcJk405Gd_DVC2-mM",
  "1TIl8X49B3Kzq6kyEoj7q5SvcQbf9_liw",
  "1cGtiKkcd6nigAdCN0ktE4AS-NOG53jfI",
  "1NP-1b_8_9DhUcrSH4pEaCCsZ4TQzCjAm",
  "1Re4Q1widbjkWDzBPK7bm1LlbsISUGFSS",
  "1lRzrqGGMdtvkpR-avMooHFMdaXoLGm9G",
  "1s7W2ucd410ShPCc_Cb56is6pjAjyQ09f",
  "1GNWu-1BfMiEka4RlTmkB4Saa1prP4bzH",
  "1TvbkdvKNPMIOIgywpPjVqygotNphnaz4",
  "1vd3GATLyqaxqpCl5-I-qY9cGD3OvEa-A",
  "1JEJZYLuE20IyBM5iINVmXtP-d4cw22zD",
  "17eO2w3mB8bLZb329s2RxWUppM8Y2NuYW",
  "1L7r4-86ZnmLwR-hdz-IxZWhI4PF2J_AO",
  "1TQhEd5ieINadqHKjsyvJNLLCVCaATljw",
  "1dqJKxg8s3zFcBQ6pT4V49vP-iPfpifLQ",
  "1ETY2XfFIK7t_8spiyyE1e7QtOSf8HzWb",
  "1WMwli5hOIOU4Ia73t5-AbtDDMMirygi1",
  "1982s8Np7c5w3L5XRc6K1oZytjJsSEwxQ",
  "1-sZN00mduCHt5oHa8XoR4UJ2qGSTc3MR",
  "1ew72DM9HEnLWUB3m6okcnVfIzPmHQ1C7",
  "15tHA69cDvwj-fBe2nORjIssLHFGU_8BF",
  "1sneV6etBzMQde6LBWNeGbMKllpFq1NLv",
  "1waxB2am6oTYZhbdjOH74u8JV1E8it9p2",
  "1YzTPRHSCt209-Pu254I2P3To_odwNl9S",
  "1gFaN9iE-eaAZHV9ccPBQL7jfltKgxBkR",
  "1Mu1m4SykVP4k0uv8UpYZ1LXHgs_1glf3",
  "1GYtHggHYtwvQNlobzeNJ4aB_foaYKRy6",
  "1qGQEgKfpw_KTAQ55VDWWqCLlBf3FWeuH",
  "16qGaDqzeaR2cZ8zt9aVNrTlkjUzn6HEs",
  "1Ing8mpVyaFk-h97XEQETMfu1u6BNFCFi",
  "1ZvZxrp5xXrZW1wJDLEurKHtR4U5TbF9I",
  "1pJizqxXJu6IQYmdibPohAHwvIwY1cmwt",
  "1JdEsTV5d9EESOtPxMbZ1LxW_rqretnf3",
  "1xD6k3V-Pwe2CMiGjsRW8qm2ktdc9S-au",
  "1Onv8zSXbTSB-5iSfk6wO3irAm_jIv-yi",
  "1DdYLfUrEJDMg_-Wzz9m5dZEWWloAuE5x",
  "1xaaulaQWEuaf0yXI_SiScbWu6gObfMcl",
  "1XwvH644aF3rje2jIV7zZL4whwbJ541ub",
  "1BISLDOTDUTNCGaoGRRUp_7w81fLO0PqY",
  "138eta2vO_vpFTTu6R_t3VsXZy-t7I4XD",
  "1YrZ9Iy09tZnegs3cohYSs25QdxX9miqm",
  "1gCi15_mJui32Ur7o__m07cWxnC4DH3j0",
  "1fAf4J1LZc6XBwoDxAALXm6rCURj97iaw",
  "1XSX8GvKhe2qLRh_sHLLfidljLxjcdI7_",
  "1epbJN-FwmpYRXQQprD464wWT71-JQ5fI",
  "1Vuh8Brihd1ZEtIi_PcZGAKw_dlW5NQgi",
  "1LLxuBYyOaO4vAHU2XS-0bXrz6PeSfqjd",
  "1uVNiCtxEUW9oyxMmfWAm6GoRPLLAj3Vf",
  "1j55qQ9jt33md6lJk6mUBHX4GlbCLn-ko",
  "1Z3jdBZUAhiOMhMsNkuKUnSvGA3xzGojp",
  "1czZ56nQXWTJPp2dB2-agcFf9ZNVEQTYs",
  "18UV-hPTga0ydfRPLSAUHMZveLJS9P5v5",
  "183HAu8FkxnIBgL43D3vMabXp_SR1Wh9z",
  "1u921lXdmvtYRGPLEutm0q6Q_TF5wULd3",
  "1XLHmZgpvPmiq2q3vBEvfNk4j727Q5fDa",
  "104ES3T9KMpVsHl1wgUmAoBqlzBwjyokV",
  "1l0yeBrZ_jZrQL4l8b7x8wsdoysBZ5KC8",
  "1dfXmSfbrIAQsk9m0_BWOcU8jm9bLJbhP",
  "10UO9sYtmJqmKhPsD07x8410TjL1_3HAg",
  "1U2WDhIEvATlfDpB3ydtDxIFhiCAedRlP",
  "1sSW9qFqnUF_X_2-2tJScCpLeltnLqurY",
  "1G-BxzhzLWswQFhoBrXAOFuyBr4mRy9SX",
  "1RQV5BWlaN_FsysKCDECHZOAr8iKzEKRm",
  "1Hj3X2tIGioBlCYigXpAriF0f0gyH1Ftp",
  "1274O6WTslAG0jGHEhbqNMl1XoM8nQbQg",
  "1OGUO9CBkChYcCcpreH4yx_hHYSIOKhrP",
  "13Nhq5FcwbSxp5XsU25kTsA-_P154aHgV",
  "1a-yXQPeRZskU_dqOwUDOdiAQGJ9qhYXD",
  "1jBC_WCxbTyZWhLx3ac6EHcQes3u99vKY",
  "1RNFjUBZfY_prHsUYUk4EpmXJqNCjwsh6",
  "1u-_sAJlP-xeQZBW9TpD5M161B34ZHjJe",
  "1DrCWVJ7QM3kUxayapUd7AdPdAFBj69CD",
  "1rR-Xm4Bsp_2cPNnWX3bAPEnSTaQXxh1J",
  "1izjI1iUOLXAWUFAK6qfuZ0f1J-mD-DQ0",
  "1VHM3iG28hDaaGHwkn8mdTuPXnPBPF3Ou",
  "1nuOMD3_CMo5odNN_NstJKHWe49_lbuii",
  "1FTYRzg7Ie7TOhRHLkgdlDXNYIEn-ffQS",
  "17TdT1Lo-WGpgvxg8sdYcDw59VHCSKTSi",
  "11UaB_71-3uDJd3Bl4UwY_2lYW1A6IDW0",
  "1iUKuvucLforwDx_lK0CMkTApAh544YtW",
  "1HQo_5o78Q_i6GKOY0m86wWh-RQjlSVkL",
  "1gUjl05Hy38zCCYW04x-ChVpKir76ULX0",
  "1rCTr_SOcCR4nJBjgtpnf1fLQUsrRFwxR",
  "1iRt7AJgfOQOLA-uC0_IVBLv2e903ZELu",
  "1sqSW8A9u25qa1nm4eyWDj2K4P2_F33jX",
  "1JrFnk6NgqcLR6DGOqoZM2o-q-p0nDeX4",
  "1JfyCorKAgRagHHdAuYyOKDH7RQoN_I3_",
  "1TJaLJhYAZNGnUV-lbsjPk7IHsVaCb4K4",
  "1C8_qbnOxKSWXlEAoQ2AAr5QOeO3R_C-s",
  "1Pr4q14QmJoBBmA8VyEP0ZwpsWO4nFq1n",
  "1s8YwTR14c2K02nX0NX7YNP_dWNotamzB",
  "13Fbv3qFf6-2Vx7Gt5N9chaf14rDi1IQQ",
  "1kUuo-mU9oz0gD2cEMClCCjEY8-vGhaDR",
  "1fdLw8c34JyR7o7I4uF59nbnUqkNVZnhU",
  "1BdeaN-vroO4rqlPu17rTypHBFuamIV28",
  "1j-OQfBEJCj54tNLx8EVZVgXPYpqTJvn4",
  "1i4GdfHZHEcrZtEWnAgFSHTgE8gOioaC-",
  "1NGsLnjTZN-3iyNcpuPJWCA0GlxRl5dD1",
  "1fymqb_rZZP-95TqwiyRRUt3U5dn7UU3H",
  "1PVHIcFsS84wh6xk8bYDIGKAiDZ72Dyt_",
  "1EHEW_JSwMvl_LuAwlYWsyYJtjUXQwlMw",
  "1fD2-DEpDCdbUyKUur74DhQC-iykR21GZ",
  "15OZkURbDeWCTZolhuukhS0Z-h6Bfo9v7",
  "1g_Ov3T-NFxy3w62EDUXDN26kqL_kcXIr",
  "1mAveRP3hTyGrt2yWblLg6JMk5bndzIni",
  "13L9PuSdA4OrEwdClkNJyprSjBsea8OM9",
  "1oCRt0xPWsi240Onv6QV_W-mvjAOxtPCN",
  "1fUO_NsDjP3uNHiL9rZFPITY2bh5AqAj0",
  "1ALYuokyusTNUfLZiHD2W3qAZrB1PGBKl",
  "1Mlckrupj3xoASY82vCieQNoMoB0wETQq",
  "1foaM_T6N8nYSadK2uc3W5of6YBuZR89e",
  "14SwxBUwjR4SgLXdxRErcELvPgNPSLjsN",
  "1fKhrDCzfLO8Ognt8JJOPGMu4zaASFQR_",
];
