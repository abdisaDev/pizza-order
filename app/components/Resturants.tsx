"use client";
import { Box, CircularProgress, Typography } from "@mui/material";
import Resturant from "./Resturant";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";

function Resturants() {
  const [resturats, setResturants] = useState([]);
  useEffect(() => {
    (async () => {
      const data = await fetch("/api/resturants");
      const resturantsData = await data.json();
      const resturants = resturantsData.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (resturant: { name: any; orders: string | any[] }) => {
          return {
            name: resturant.name,
            amount: resturant.orders.length.toString(),
            description:
              "We serve fresh, handcrafted pizzas with classic and unique flavors for dine-in.",
          };
        }
      );
      setResturants(resturants);
    })();
  }, []);

  return (
    <Box
      sx={{
        height: "700px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        pl: "50px",
        rowGap: 10,
        background:
          "linear-gradient(0deg, rgba(255,248,241,1) 0%, rgba(253,209,163,1) 60%, rgba(255,248,241,1) 100%)",
      }}
    >
      <Box ml="100px">
        <Typography variant="h3" fontWeight="bolder">
          Top Resturants
        </Typography>
      </Box>
      {resturats.length ? (
        <Slider arrows={false} variableWidth={true}>
          {resturats.map(
            (
              resturant: { name: string; amount: string; description: string },
              index
            ) => (
              <Box key={index} sx={{ mx: "20px" }}>
                <Resturant
                  name={resturant.name}
                  amount={resturant.amount}
                  description={resturant.description}
                />
              </Box>
            )
          )}
        </Slider>
      ) : (
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress color="warning" />
        </Box>
      )}
    </Box>
  );
}

export default Resturants;
