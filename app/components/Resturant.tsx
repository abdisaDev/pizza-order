import { Box, Typography } from "@mui/material";
import ResturantLogo from "@/app/assets/pizza.svg";
import Image from "next/image";
import Charge from "@/app/assets/charge.svg";

function Resturant(props: {
  description: string;
  name: string;
  amount: string;
}) {
  return (
    <Box
      sx={{
        width: "fit-content",
        display: "flex",
        alignItems: "center",
        gap: 5,
        background: "#fff",
        borderRadius: "15px",
        p: "15px 20px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "400px",
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Image
            src={ResturantLogo}
            priority={true}
            alt="user"
            style={{
              width: "50px",
              // borderRadius: "50%",
              transform: `rotate(${Math.floor(Math.random() * 180)}deg)`,
            }}
          />
          <Typography variant="h5" fontWeight="bolder">
            {props.name}
          </Typography>
        </Box>
        <Box>
          <Typography>{props.description}</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 5,
          background: "#F2F9F2",
          p: "20px 40px",
          borderRadius: "10px",
        }}
      >
        <Box>
          <Image src={Charge} alt="charge" priority={true} />
        </Box>
        <Box>
          <Typography>Number of order</Typography>
          <Typography variant="h2" fontWeight="bolder" color="warning">
            {props.amount}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Resturant;
