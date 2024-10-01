import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import HeroImage from "@/app/assets/hero-image.svg";
import Image from "next/image";
import { Search as SearchIcon } from "@mui/icons-material";

function HeroPage() {
  return (
    <Box
      sx={{
        height: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background:
          "linear-gradient(0deg, rgba(255,248,241,1) 0%, rgba(253,209,163,1) 60%, rgba(255,248,241,1) 100%)",
      }}
    >
      <Box sx={{ width: "50%", height: "80%", mx: "7%" }}>
        <Typography
          variant="h1"
          fontWeight="bolder"
          sx={{
            color: "#FA8C16",
            backgroundImage:
              "linear-gradient(to right, #FA8C16 42%, #FCBE71 75%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            textFillColor: "transparent",
            WebkitTextFillColor: "transparent",
            fontSize: "200px",
          }}
        >
          Order us
        </Typography>
        <Typography variant="h5" ml={4}>
          We offer fresh, handcrafted pizzas with classic and unique flavors.
          Enjoy dine-in, takeout, or delivery for a delicious experience every
          time!
        </Typography>
        <Box>
          <TextField
            placeholder="Search"
            fullWidth
            slotProps={{
              input: {
                sx: {
                  borderRadius: "50px",
                  background: "#fff",
                  border: "none",
                  p: "10px 30px",
                  m: "30px",

                  "& ::placeholder": {
                    fontSize: "20px",
                    fontWeight: "bolder",
                  },
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      sx={{
                        background: "#FA8910",
                        color: "#fff",
                        p: "fit-content",
                      }}
                    >
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>
      </Box>
      <Box>
        <Image src={HeroImage} priority={true} alt="hero-image" />
      </Box>
    </Box>
  );
}

export default HeroPage;
