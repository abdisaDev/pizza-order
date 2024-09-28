import {
  Box,
  IconButton,
  Checkbox,
  Typography,
  FormControlLabel,
  Button,
} from "@mui/material";
import PizzaOne from "@/app/assets/pizza-one.svg";
import Image from "next/image";
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  CallMade as CallMadeIcon,
} from "@mui/icons-material";
import NavigationBar from "../components/NavigationBar";
import FastingPizzas from "../components/FastingPizzas";
import Footer from "../components/Footer";

function Order() {
  return (
    <>
      <Box width="99vw">
        <NavigationBar />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            columnGap: 5,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              columnGap: 5,
              width: "50%",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: "40%",
                "& > *": {
                  background: "#FBE0C1",
                  p: 5,
                  borderRadius: "50%",
                },
              }}
            >
              <Image src={PizzaOne} alt="pizza-image" />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "20%",
                gap: 5,
                "& > *": {
                  background: "#D9D9D9",
                  p: 2,
                  borderRadius: "50%",
                },
              }}
            >
              <Image src={PizzaOne} alt="pizza-image" />
              <Image src={PizzaOne} alt="pizza-image" />
            </Box>
          </Box>
          <Box
            sx={{
              width: "45%",
              display: "flex",
              flexDirection: "column",
              gap: 5,
            }}
          >
            <Typography variant="h1" fontWeight="bolder">
              Margahrita
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                columnGap: 3,
                flexWrap: "wrap",

                "& > *": {
                  display: "flex",
                  alignItems: "center",
                  columnGap: 1,
                  fontSize: "30px",
                },
              }}
            >
              <Box>
                <FormControlLabel control={<Checkbox />} label="Onion" />
              </Box>
              <Box>
                <FormControlLabel control={<Checkbox />} label="Onion" />
              </Box>
              <Box>
                <FormControlLabel control={<Checkbox />} label="Onion" />
              </Box>
              <Box>
                <FormControlLabel control={<Checkbox />} label="Onion" />
              </Box>
              <Box>
                <FormControlLabel control={<Checkbox />} label="Onion" />
              </Box>
              <Box>
                <FormControlLabel control={<Checkbox />} label="Onion" />
              </Box>
              <Box>
                <FormControlLabel control={<Checkbox />} label="Onion" />
              </Box>
              <Box>
                <FormControlLabel control={<Checkbox />} label="Onion" />
              </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
              <IconButton sx={{ border: "2px, solid #4d4d4d" }} size="large">
                <RemoveIcon fontSize="large" />
              </IconButton>
              <Typography fontSize="40px">1</Typography>
              <IconButton sx={{ border: "2px, solid #4d4d4d" }} size="large">
                <AddIcon fontSize="large" />
              </IconButton>
              <Typography variant="h4" fontWeight="bolder" color="success">
                150<sup> Birr</sup>
              </Typography>
            </Box>
            <Box>
              <Button
                variant="contained"
                disableElevation
                color="warning"
                fullWidth
                sx={{
                  py: 3,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                Order <CallMadeIcon />
              </Button>
            </Box>
          </Box>
        </Box>
        <Box>
          <FastingPizzas title="Related" ml="50px" />
        </Box>
        <Box>
          <Footer />
        </Box>
      </Box>
    </>
  );
}

export default Order;
