import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";

function Banner(props: {
  title: string;
  discount: string;
  description: string;
  image: string;
  backgroundColor: string;
}) {
  return (
    <Box sx={{ display: "flex", my: 15, height: "400px" }}>
      <Box
        sx={{
          mx: "10%",
          width: "100%",
          backgroundColor: props.backgroundColor,
          borderRadius: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          color: "#fff",
          gap: 2,
        }}
      >
        <Box sx={{ width: "55%", p: "50px" }}>
          <Typography variant="h3" fontWeight="bolder" mb={3}>
            {props.title}
            <Box component="span" color="#FA9922">
              {props.discount}
            </Box>
          </Typography>
          <Typography variant="h6" mb={5}>
            {props.description}
          </Typography>
          <Button
            variant="contained"
            color="warning"
            disableElevation
            sx={{ p: "15px 40px" }}
          >
            Order Now
          </Button>
        </Box>
        <Box
          sx={{
            width: "600px",
            height: "600px",
            position: "relative",
            left: "70px",
          }}
        >
          <Image
            src={props.image}
            alt="pizza-image"
            priority={true}
            style={{ width: "600px", height: "600px" }}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default Banner;
