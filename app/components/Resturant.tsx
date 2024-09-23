import { Box, Typography } from "@mui/material";
import Me from "@/app/assets/me.jpg";
import Image from "next/image";
import Charge from "@/app/assets/charge.svg";
function Resturants() {
  return (
    <>
      <Box
        sx={{
          // height: "150px",
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
              src={Me}
              alt="user"
              style={{
                width: "70px",
                borderRadius: "50%",
              }}
            />
            <Typography variant="h5" fontWeight="bolder">
              Abdisa Dev
            </Typography>
          </Box>
          <Box>
            <Typography>
              In publishing and graphic design, Lorem ipsum is a placeholder
              text commonly used to...
            </Typography>
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
            <Image src={Charge} alt="charge" />
          </Box>
          <Box>
            <Typography>Number of order</Typography>
            <Typography variant="h2" fontWeight="bolder" color="warning">
              2K
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Resturants;
