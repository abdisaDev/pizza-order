import { Box, Button, Divider, Typography } from "@mui/material";
import Image from "next/image";
import PizzaOne from "@/app/assets/pizza-one.svg";
import Me from "@/app/assets/me.jpg";

function PizzaCard() {
  return (
    <>
      <Box
        sx={{
          background: "#fff",
          width: "fit-content",
          borderRadius: "10px",
          justifyContent: "center",
          p: "30px 20px 0 20px",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Image
            src={PizzaOne}
            alt="pizza-image"
            style={{
              width: "250px",
            }}
          />
        </Box>
        <Box sx={{ my: 2 }}>
          <Typography variant="h4" fontWeight="bolder">
            Margherita
          </Typography>
          <Typography>
            Tomato, Mozzarella, Bell Peppers, Onions, Olives
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-around", my: 2 }}>
            <Typography variant="h5" color="success">
              150 <sup>Birr</sup>
            </Typography>
            <Button variant="contained" color="warning" disableElevation>
              Order
            </Button>
          </Box>
          <Box my={1}>
            <Divider />
          </Box>
          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                my: 2,
              }}
            >
              <Box>
                <Image
                  src={Me}
                  alt="charge"
                  style={{ width: "70px", borderRadius: "50%" }}
                />
              </Box>
              <Box>
                <Typography variant="h5" fontWeight="bolder">
                  Abdisa Dev
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default PizzaCard;
