"use client";
import {
  Box,
  IconButton,
  Checkbox,
  Typography,
  FormControlLabel,
  Button,
} from "@mui/material";
import Image from "next/image";
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  CallMade as CallMadeIcon,
} from "@mui/icons-material";
import NavigationBar from "../components/NavigationBar";
import FastingPizzas from "../components/FastingPizzas";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

function Order() {
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [isorderSending, setIsorderSending] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [isChecked, setIsChecked] = useState<any[]>([]);
  const [orderDetail, setOrderDetail] = useState({
    name: "",
    toppings: "",
    image: "",
    price: 0,
    pizza_id: "",
    resturant: { id: "" },
  });
  const displayOrderFailed = orderDetail ? "" : "There Is No Order To Display.";
  const { data } = useSession();

  useEffect(() => {
    const sessionStorageData = sessionStorage.getItem("order");
    setOrderDetail(JSON.parse(sessionStorageData as string));
  }, []);

  useEffect(() => {
    setIsChecked([]);
    setOrderQuantity(1);
  }, []);

  return (
    <Box width="99vw">
      <NavigationBar />
      {orderDetail ? (
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
              <Image src={orderDetail.image} alt="pizza-image" />
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
              <Image src={orderDetail.image} alt="pizza-image" />
              <Image src={orderDetail.image} alt="pizza-image" />
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
              {orderDetail.name}
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
                },
              }}
            >
              {orderDetail.toppings
                .split(", ")
                .map((topping: string, index) => (
                  <Box key={index}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={isChecked.includes(topping)}
                          onChange={(event) => {
                            const { checked } = event.target;
                            if (checked)
                              setIsChecked((prev) => [...prev, topping]);
                            else
                              setIsChecked((prev) =>
                                prev.filter(
                                  (checkedTopping) => topping !== checkedTopping
                                )
                              );
                          }}
                        />
                      }
                      label={topping}
                    />
                  </Box>
                ))}
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
              <IconButton
                sx={{ border: "2px, solid #4d4d4d" }}
                size="large"
                onClick={() => {
                  setOrderQuantity((prev) => --prev);
                }}
                disabled={orderQuantity <= 1}
              >
                <RemoveIcon fontSize="large" />
              </IconButton>
              <Typography fontSize="40px">{orderQuantity}</Typography>
              <IconButton
                sx={{ border: "2px, solid #4d4d4d" }}
                size="large"
                onClick={() => {
                  setOrderQuantity((prev) => ++prev);
                }}
              >
                <AddIcon fontSize="large" />
              </IconButton>
              <Typography variant="h4" fontWeight="bolder" color="success">
                {orderDetail.price * orderQuantity}
                <sup> Birr</sup>
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
                onClick={async () => {
                  setIsorderSending(true);
                  const { name, price, resturant, pizza_id } = orderDetail;
                  const toppings = isChecked.map((topping) => {
                    return { name: topping };
                  });

                  const finalOrder = {
                    pizzas: [
                      {
                        id: pizza_id,
                        name,
                        quantity: orderQuantity,
                        toppings,
                        price,
                      },
                    ],
                    status: "Ordered",
                    user_id: data?.user?.id,
                    resturant_id: resturant.id,
                    total_price: String(orderDetail.price * orderQuantity),
                  };

                  const orderData = await fetch("/api/order", {
                    method: "POST",
                    body: JSON.stringify(finalOrder),
                  });
                  // console.log(await orderData.json());
                  const order = await orderData.json();
                  if (order) {
                    setIsorderSending(false);
                  }
                }}
                disabled={isorderSending}
              >
                {isorderSending ? "Ordering Your Pizza . . ." : "Order"}
                <CallMadeIcon />
              </Button>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h5" fontWeight="bolder">
            {displayOrderFailed}
          </Typography>
        </Box>
      )}
      <Box>
        <FastingPizzas title="Related" ml="50px" />
      </Box>
      <Box>
        <Footer />
      </Box>
    </Box>
  );
}

export default Order;
