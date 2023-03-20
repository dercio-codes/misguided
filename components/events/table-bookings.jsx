import { Cancel, CloseOutlined } from "@mui/icons-material";
// import { Box, Modal, Typography } from "@mui/material"
import PhoneIcon from "@mui/icons-material/Phone";
import {
  Box,
  Select,
  Modal,
  Drawer,
  MenuItem,
  IconButton,
  Button,
  Grid,
  Typography,
  TextField,
  Stack,
  Divider,
} from "@mui/material";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import SendIcon from "@mui/icons-material/Send";
import { useSnackbar } from "notistack";
import axios from "axios";
import { GooSpinner } from "react-spinners-kit";
import { PropagateLoader } from "react-spinners";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination, Navigation } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";

export const TableBookings = ({ state, openEvent }) => {
  const { openTableBooking, setOpenTableBooking, loading, setLoading } = state;
  return (
    <Drawer
      anchor={"bottom"}
      open={openTableBooking}
      onBackdropClick={() => {
        setOpenTableBooking(false);
      }}
      sx={{
        border: "none",
        display: "flex",
        alignItems: "center",
        background: "rgba(1,1,1,.7)",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          background: "rgba(1,1,1,.7)",
          height: "100vh",
          overflow: "auto",
          padding: "0",
          margin: "auto 0",
          border: "none",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <BookTable
          openEvent={openEvent}
          setOpenTableBooking={setOpenTableBooking}
          loading={loading}
          setLoading={setLoading}
        />
      </Box>
    </Drawer>
  );
};

const BookTable = ({ openEvent, setOpenTableBooking, loading, setLoading }) => {
  const enqueueSnackbar = useSnackbar();
  const [isProcessing, setIsProcessing] = useState(false);
  const [booking, setBooking] = useState({
    event_name: openEvent.event_name,
    indoor_or_outdoor: "",
    name: "",
    cell: "",
    email: "",
    num_of_people: 6,
    tablePackage: "",
    names_of_people: [
      "Dercio",
      "YKM",
      "Karlo",
      "Caitlyin",
      "Shadzo",
      "Kailiegh",
    ],
  });
  const [newName, setNewName] = useState("");

  const removeName = (item) => {
    const copy = booking.names_of_people.filter(function (value) {
      return item !== value;
    });
    setBooking({
      ...booking,
      names_of_people: copy,
    });
  };

  const handleNames = (e) => {
    setNewName(e.target.value);
  };

  const submitName = () => {
    if (booking.names_of_people.length < booking.num_of_people) {
      if (newName == "") {
        toast.error(`Please enter name for person at table..`, {
          theme: "dark",
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
        });
      } else if (booking.names_of_people.includes(newName)) {
        toast.error(`Already added this person.Please add a last name.`, {
          theme: "dark",
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
        });
      } else {
        setBooking({
          ...booking,
          names_of_people: [...booking.names_of_people, newName],
        });
        setNewName("");
      }
    } else {
      toast.error(`Exceeded the limit set on number of people by table.`, {
        theme: "dark",
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
      });
    }
  };

  const Packages = [
    {
      Package_Name: "Classic Package",
      Perks: "Entrance and table for 6",
      Alcohol: "A bottle of Jameson plus mixers",
      Price: "R1500",
    },
    {
      Package_Name: "Premium Package",
      Perks: "Entrance and table for 6",
      Alcohol: "A bottle of Hennessy VS plus mixers",
      Price: "R2000",
    },
    {
      Package_Name: "Premium Package 2",
      Perks: "Entrance and table for 6",
      Alcohol: "A bottle of Hennessy VSOP plus mixers",
      Price: "R2500",
    },
    {
      Package_Name: "Big Boy Combo",
      Perks: "Entrance and table for 6",
      Alcohol: "A bottle of Vodka ( Ciroc, Sky, absolute) plus mixers",
      Price: "R1500",
    },
    {
      Package_Name: "Run Jozi Combo",
      Perks: "Entrance and table for 6",
      Alcohol: "A bottle of rum plus mixers",
      Price: "R1300",
    },
    {
      Package_Name: "Gin and Juice combo",
      Perks: "Entrance and table for 6",
      Alcohol: "A bottle of gin (Tanqueray, Bombay) + Mixers",
      Price: "R1300",
    },
    {
      Package_Name: "Life of The Party Combo",
      Perks: "Entrance and table for 6",
      Alcohol: "Jager meister 1L plus mixers ",
      Price: "R1400",
    },
  ];

  const handleFieldChange = (e) => {
    setBooking({
      ...booking,
      [e.target.name]: e.target.value,
    });

    console.log(booking);
  };

  // const handleSubmit = ()  =>  console.log(booking)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setLoading(true);
    console.log(booking);

    if (booking.names_of_people.length < booking.num_of_people) {
      toast.error(
        `Names entered does not match the number of people you booked the table for.`,
        {
          theme: "dark",
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
        }
      );
    } else {
      const bookingValues = Object.values(booking);

      if (bookingValues.includes("")) {
        toast.error(`Fill in all fields`, {
          theme: "dark",
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
        });

        setIsProcessing(false);
      } else {
        console.log({
          event_name: booking.event_name,
          indoor_or_outdoor: booking.indoor_or_outdoor,
          name: booking.name,
          num_of_people: booking.num_of_people,
          names_of_people: booking.names_of_people,
          cell: booking.cell,
          email: booking.email,
          tablePackage: booking.tablePackage,
          image_link: "https://misguidedsa.co.za/" + openEvent.image,
        });
        await axios
          .post("/api/email", {
            event_name: booking.event_name,
            indoor_or_outdoor: booking.indoor_or_outdoor,
            name: booking.name,
            num_of_people: booking.num_of_people,
            names_of_people: booking.names_of_people,
            cell: booking.cell,
            email: booking.email,
            tablePackage: booking.tablePackage,
            image_link: "https://misguidedsa.co.za" + openEvent.image,
          })
          .then((res) => {
            if (res.data.message == "MAIL_SENT") {
              toast.success("Email Succesfully sent to Misguided.", {
                theme: "dark",
                position: "top-right",
                icon: "🚀",
                autoClose: 5000,
                hideProgressBar: false,
              });

              setBooking({
                event_name: openEvent.title,
                indoor_or_outdoor: "",
                name: "",
                num_of_people: 0,
                names_of_people: [],
              });

              setIsProcessing(false);
            } else {
              toast.error(`Failed to send email : ${res.data.err.message}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
              });

              setIsProcessing(false);
            }
          })
          .catch((err) => {
            console.log(err);
            alert(err);
            //   enqueueSnackbar(`Failed to send email : ${err.message}`, {
            //     variant: "error",
            //   });
          });
        setIsProcessing(false);
        setOpenTableBooking(false);
        setLoading(false);
      }
    }
  };

  return (
    <Box
      id="book-now"
      sx={{
        background: "rgba(1,1,1,.7)",
        margin: "suto 0",
        padding: "32px",
        maxHeight: "100vh",
        overflowY: "auto",
      }}
    >
      <script src="https://js.yoco.com/sdk/v1/yoco-sdk-web.js"></script>

      <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
        <Button
          onClick={() => setOpenTableBooking(false)}
          sx={{ margin: "21px 0", fontSize: "32px", color: "#eee" }}
        >
          X
        </Button>
      </Box>
      <Box
        sx={{
          background: "",
          width: { lg: "100%", xs: "100%" },
          padding: "0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            sx={{
              background: "",
              border: "3px solid #eee",
              width: "80px",
              height: "80px",
            }}
          >
            <PhoneIcon sx={{ fontSize: "32px", color: "#eee" }} />
          </IconButton>
          <Typography
            variant="p"
            width={"100%"}
            color={"#eee"}
            sx={{
              margin: "0 16px",
              fontSize: { xs: "32px", md: "54px" },
              textAlign: "",
            }}
            fontWeight={"600"}
          >
            Book Table
          </Typography>
        </Box>
        <Box
          sx={{
            width: "150px",
            height: "150px",
            background: "",
            backgroundRepeat: "no-repeat",
            backgroundPostion: "center",
            backgroundImage: `url(${openEvent.image})`,
            backgroundSize: "contain",
          }}
        />
      </Box>
      <Stack sx={{ padding: "21px 4px", background: "" }}>
        <Typography
          variant="p"
          width={"100%"}
          color={"#eee"}
          sx={{
            margin: "12px 0 28px 0 ",
            fontSize: { xs: "18px", md: "18px" },
            textAlign: "",
          }}
          fontWeight={"400"}
        >
          Fill in the form below and we will respond back to you.
        </Typography>

        <Grid container columnSpacing={12}>
          <Grid item xs={12} md={12}>
            <Typography
              variant="p"
              width={"100%"}
              color={"#eee"}
              sx={{ fontSize: { xs: "18px", md: "21px" } }}
              fontWeight={"300"}
            >
              Name :{" "}
            </Typography>
            <TextField
              onChange={handleFieldChange}
              name="name"
              placeholder="John Doe."
              fullWidth
              sx={{
                padding: "0",
                margin: "12px 0",
                color: "white",
                "& .MuiOutlinedInput-root": { border: "2px solid white" },
                "& .MuiOutlinedInput-root.Mui-focused": {
                  "& > fieldset": {
                    border: "3px solid white",
                    color: "#40e0d0",
                  },
                },
                "& .MuiOutlinedInput-root.Mui-focused": {
                  "& > fieldset": {
                    border: "3px solid white",
                    color: "#40e0d0",
                  },
                },
              }}
            />

            <Typography
              variant="p"
              width={"100%"}
              color={"#eee"}
              sx={{ fontSize: { xs: "18px", md: "21px" } }}
              fontWeight={"300"}
            >
              Cell Number :{" "}
            </Typography>
            <TextField
              pattern="[0-9]+"
              onChange={handleFieldChange}
              name="cell"
              placeholder="011 - 123 - 4545"
              fullWidth
              sx={{
                padding: "0",
                margin: "12px 0",
                color: "white",
                "& .MuiOutlinedInput-root": { border: "2px solid white" },
                "& .MuiOutlinedInput-root.Mui-focused": {
                  "& > fieldset": {
                    border: "3px solid white",
                    color: "#40e0d0",
                  },
                },
                "& .MuiOutlinedInput-root.Mui-focused": {
                  "& > fieldset": {
                    border: "3px solid white",
                    color: "#40e0d0",
                  },
                },
              }}
            />

            <Typography
              variant="p"
              width={"100%"}
              color={"#eee"}
              sx={{ fontSize: { xs: "18px", md: "21px" } }}
              fontWeight={"300"}
            >
              Email :{" "}
            </Typography>
            <TextField
              onChange={handleFieldChange}
              name="email"
              placeholder="mail@example.com"
              fullWidth
              sx={{
                padding: "0",
                margin: "12px 0",
                color: "white",
                "& .MuiOutlinedInput-root": { border: "2px solid white" },
                "& .MuiOutlinedInput-root.Mui-focused": {
                  "& > fieldset": {
                    border: "3px solid white",
                    color: "#40e0d0",
                  },
                },
                "& .MuiOutlinedInput-root.Mui-focused": {
                  "& > fieldset": {
                    border: "3px solid white",
                    color: "#40e0d0",
                  },
                },
              }}
            />

            <Typography
              variant="p"
              width={"100%"}
              color={"#eee"}
              sx={{ fontSize: { xs: "18px", md: "21px" } }}
              fontWeight={"300"}
            >
              Indoor or Outdoor :{" "}
            </Typography>
            <Select
              onChange={handleFieldChange}
              name="indoor_or_outdoor"
              value={booking.indoor_or_outdoor}
              fullWidth
              sx={{
                padding: "0",
                margin: "12px 0",
                color: "white",
                "& .MuiOutlinedSelect-root": { border: "2px solid white" },
                "& .MuiOutlinedSelect-root.Mui-focused": {
                  "& > fieldset": {
                    border: "3px solid white",
                    color: "#40e0d0",
                  },
                },
                "& .MuiOutlinedSelect-root.Mui-focused": {
                  "& > fieldset": {
                    border: "3px solid white",
                    color: "#40e0d0",
                  },
                },
              }}
            >
              <MenuItem value="Indoor">Indoor </MenuItem>
              <MenuItem value="Outdoor">Outdoor </MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} md={12} sx={{ margin: "32px 0" }}>
            <Typography
              sx={{
                // textAlign: "center",
                fontWeight: 300,
                color: "#eee",
                fontSize: "24px",
                margin: "0 0 21px 0",
              }}
            >
              Select Table Package :
            </Typography>
            <Swiper
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              loop={true}
              pagination={{
                type: "progressbar",
              }}
              autoplay={{
                delay: booking.tablePackage === "" ? 2500 : 1000000,
                disableOnInteraction: false,
              }}
              slidesPerView={1}
              // slidesPerView={1 }
              navigation={true}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
              className="mySwiper"
            >
              {Packages.map((item, index) => {
                return (
                  <Box data-aos="zoom-in" key={index} data-aos-duration="2000">
                    <SwiperSlide data-zoomable key={index}>
                      <Box
                        sx={{
                          padding: "21px",
                          minHeight: "30vh",
                          width: { xs: "100%", md: "50%" },
                          display: "flex",
                          flexDirection: "column",
                          // alignItems: "center",
                          justifyContent: "center",
                          background:
                            booking.tablePackage === item.Package_Name
                              ? "rgba(142, 208, 192, .7)"
                              : "rgba(1,1,1,.3)",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            // alignItems: "center",
                            justifyContent: "center",
                            width: "100%",
                          }}
                        >
                          <Typography
                            sx={{
                              // textAlign: "center",
                              fontWeight: 600,
                              color: "#eee",
                              fontSize: "32px",
                              // margin: "21px 0",
                            }}
                          >
                            {item.Package_Name}
                          </Typography>

                          <ul
                            style={{
                              width: "100%",
                              padding: "21px",
                              margin: "32px 0",
                              // padding: "0 0 0 70px"
                            }}
                          >
                            <li>
                              <Typography
                                sx={{
                                  // textAlign: "center",
                                  fontWeight: 300,
                                  color: "#eee",
                                  fontSize: "18px",
                                  // margin: "21px 0",
                                }}
                              >
                                {item.Alcohol}
                              </Typography>
                            </li>
                            <li>
                              <Typography
                                sx={{
                                  // textAlign: "center",
                                  fontWeight: 300,
                                  color: "#eee",
                                  fontSize: "18px",
                                  // margin: "21px 0",
                                }}
                              >
                                {item.Perks}
                              </Typography>
                            </li>
                          </ul>

                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "flex-end",
                              padding: "0 0px 0 0",
                            }}
                          >
                            <Typography
                              sx={{
                                // textAlign: "center",
                                fontWeight: 300,
                                color: "#eee",
                                fontSize: "18px",
                                // margin: "21px 0",
                              }}
                            >
                              Total :
                            </Typography>
                            <Typography
                              sx={{
                                // textAlign: "center",
                                fontWeight: 600,
                                color: "#eee",
                                fontSize: "21px",
                                // margin: "21px 0",
                              }}
                            >
                              {item.Price}
                            </Typography>
                          </Box>
                        </Box>
                        <Button
                          onClick={() => {
                            setBooking({
                              ...booking,
                              tablePackage: item.Package_Name,
                            });
                          }}
                          sx={{
                            width: { xs: "100%", md: "100%" },
                            height: "100%",
                            fontWeight: "600",
                            fontSize: "12px",
                            width: "100%",
                            margin: "12px auto",
                            padding: { xs: "20px 8px" },
                            background: "#eee",
                            color: "#111",
                            "&:hover": {
                              color: "#eee",
                              background: "#111",
                            },
                          }}
                        >
                          Select
                        </Button>
                      </Box>
                    </SwiperSlide>
                  </Box>
                );
              })}
            </Swiper>
            {/* <Typography
              variant="p"
              width={"100%"}
              color={"#eee"}
              sx={{ fontSize: { xs: "18px", md: "21px" } }}
              fontWeight={"300"}
            >
              Number of People at Table :{" "}
            </Typography>
            <TextField
              onChange={handleFieldChange}
              name="num_of_people"
              type="number"
              min={2}
              max={12}
              placeholder="6"
              fullWidth
              sx={{
                padding: "0",
                margin: "12px 0",
                color: "white",
                "& .MuiOutlinedInput-root": { border: "2px solid white" },
                "& .MuiOutlinedInput-root.Mui-focused": {
                  "& > fieldset": {
                    border: "3px solid white",
                    color: "#40e0d0",
                  },
                },
                "& .MuiOutlinedInput-root.Mui-focused": {
                  "& > fieldset": {
                    border: "3px solid white",
                    color: "#40e0d0",
                  },
                },
              }}
            /> */}

            <Typography
              variant="p"
              width={"100%"}
              color={"#eee"}
              sx={{ fontSize: { xs: "18px", md: "21px" } }}
              fontWeight={"300"}
            >
              Name of People at Table :{" "}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <TextField
                onChange={handleNames}
                name="names_of_people"
                type="text"
                min={2}
                max={12}
                placeholder=""
                value={newName}
                fullWidth
                sx={{
                  padding: "0",
                  margin: "12px 0",
                  color: "white",
                  "& .MuiOutlinedInput-root": { border: "2px solid white" },
                  "& .MuiOutlinedInput-root.Mui-focused": {
                    "& > fieldset": {
                      border: "3px solid white",
                      color: "#40e0d0",
                    },
                  },
                  "& .MuiOutlinedInput-root.Mui-focused": {
                    "& > fieldset": {
                      border: "3px solid white",
                      color: "#40e0d0",
                    },
                  },
                }}
              />
              <Button
                onClick={submitName}
                sx={{
                  width: { xs: "48%", md: "48%" },
                  height: "100%",
                  fontWeight: "600",
                  fontSize: "12px",
                  height: "100%",
                  margin: "0 0px 0px 8px ",
                  padding: { xs: "20px 8px" },
                  background: "#eee",
                  color: "#111",
                  "&:hover": {
                    color: "#eee",
                    background: "#111",
                  },
                }}
              >
                Add Person
              </Button>
            </Box>

            {booking.names_of_people &&
              booking.names_of_people.map((item, index) => {
                return (
                  <Box key={index} sx={{ width: "100%", padding: " 8px 8px" }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        padding: "12px 0",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        key={index}
                        variant="p"
                        width={"100%"}
                        color={"#eee"}
                        sx={{
                          width: "100%",
                          fontSize: { xs: "18px", md: "21px" },
                        }}
                        fontWeight={"300"}
                      >
                        {item}{" "}
                      </Typography>
                      <Cancel
                        title="Remove Person"
                        sx={{ fill: "red", color: "red", cursor: "pointer" }}
                        onClick={() => removeName(item)}
                      />
                    </Box>
                    <Divider sx={{ width: "21px", color: "#555" }} />
                  </Box>
                );
              })}

            <Typography
              variant="p"
              width={"100%"}
              color={"transparent"}
              sx={{ fontSize: { xs: "18px", md: "21px" } }}
              fontWeight={"300"}
            >
              How Many Hours :{" "}
            </Typography>
            <Box
              sx={{
                height: "58px",
                margin: "12px 0",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button
                sx={{
                  width: { xs: "48%", md: "48%" },
                  height: "100%",
                  fontWeight: "600",
                  fontSize: "16px",
                  padding: { xs: "18px 0", md: "12px 0" },
                  background: "red",
                  color: "#eee",
                  "&:hover": {
                    color: "#eee",
                    background: "#111",
                  },
                }}
                onClick={() => setOpenTableBooking(false)}
              >
                {" "}
                Cancel{" "}
              </Button>
              <Button
                sx={{
                  width: { xs: "48%", md: "48%" },
                  height: "100%",
                  fontWeight: "600",
                  fontSize: "16px",
                  padding: { xs: "18px 0", md: "12px 0" },
                  background: "#eee",
                  color: "#111",
                  "&:hover": {
                    color: "#eee",
                    background: "#111",
                  },
                }}
                onClick={handleSubmit}
              >
                {" "}
                {isProcessing ? <PropagateLoader /> : "Submit Request"}{" "}
              </Button>
            </Box>

            {/* <ToastContainer toastStyle={{ backgroundColor: "#eee" , color:'#eee' }} /> */}
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
};
