"use client";

import { Box, Button, Divider, Typography } from "@mui/material";
import Image from "next/image";
import ResturantLogo from "@/app/assets/pizza.svg";
import { useRouter } from "next/navigation";

function PizzaCard(props: {
  pizza_id: string;
  name: string;
  toppings: string[];
  image: string;
  price: string;
  resturant: { id: string; name: string };
  action: "button" | "status";
  actionValue?: string;
  removeFooter?: boolean;
}) {
  const router = useRouter();
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
      <Box
        sx={{
          my: props.removeFooter ? 4 : 1,
          display: "flex",
          flexDirection: "column",
          rowGap: props.removeFooter ? 4 : 2,
        }}
      >
        <Typography variant="h4" fontWeight="bolder" textAlign="center">
          {props.name}
        </Typography>
        <Typography textAlign="center">{props.toppings}</Typography>
        {!props.removeFooter && (
          <>
            <Box
              sx={{ display: "flex", justifyContent: "space-around", my: 4 }}
            >
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
                  onClick={() => {
                    sessionStorage.setItem("order", JSON.stringify(props));
                    router.push("/order");
                    router.refresh();
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
                    src={ResturantLogo}
                    alt="charge"
                    priority={true}
                    style={{
                      width: "50px",
                      transform: `rotate(${Math.floor(
                        Math.random() * 180
                      )}deg)`,
                    }}
                  />
                </Box>
                <Box>
                  <Typography variant="h5" fontWeight="bolder">
                    {props.resturant.name}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}

export default PizzaCard;
