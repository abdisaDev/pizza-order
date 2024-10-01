import { Box, Button, Divider, Typography } from "@mui/material";
import Image from "next/image";
import Me from "@/app/assets/me.jpg";

function PizzaCard(props: {
  name: string;
  toppings: string[];
  image: string;
  price: string;
  resturant: string;
  action: "button" | "status";
  actionValue?: string;
}) {
  return (
    <Box
      sx={{
        background: "#fff",
        width: "450px",
        height: "fit-content",
        borderRadius: "20px",
        justifyContent: "center",
        p: "40px 40px 5px",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Image
          src={props.image}
          alt="pizza-image"
          priority={true}
          style={{
            width: "250px",
            borderRadius: "50%",
            background: "#FBE6CC",
            padding: "20px",
          }}
        />
      </Box>
      <Box sx={{ my: 2 }}>
        <Typography variant="h4" fontWeight="bolder">
          {props.name}
        </Typography>
        <Typography>{props.toppings}</Typography>
        <Box sx={{ display: "flex", justifyContent: "space-around", my: 4 }}>
          <Typography variant="h4" color="success" fontWeight="bolder">
            {props.price} <sup>Birr</sup>
          </Typography>
          {props.action === "button" ? (
            <Button
              variant="contained"
              color="warning"
              disableElevation
              sx={{
                p: "15px 40px",
                borderRadius: "10px",
              }}
            >
              Order
            </Button>
          ) : (
            <Typography
              variant="h4"
              color={
                props.actionValue?.toLowerCase() === "recived"
                  ? "success"
                  : "warning"
              }
              fontWeight="bolder"
            >
              {props.actionValue}
            </Typography>
          )}
        </Box>
        <Box my={1}>
          <Divider />
        </Box>
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              m: 2,
            }}
          >
            <Box>
              <Image
                src={Me}
                alt="charge"
                style={{ width: "70px", borderRadius: "50%" }}
                priority={true}
              />
            </Box>
            <Box>
              <Typography variant="h5" fontWeight="bolder">
                {props.resturant}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default PizzaCard;
