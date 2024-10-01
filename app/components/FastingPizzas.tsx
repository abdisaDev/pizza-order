"use client";
import { Box, CircularProgress, Typography } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PizzaCard from "./PizzaCard";
import PizzaOne from "@/app/assets/pizza-one.svg";
import PizzaTwo from "@/app/assets/pizza-two.svg";
import PizzaThree from "@/app/assets/pizza-three.svg";
import { useEffect, useState } from "react";
import _ from "lodash";

const pizzaImages = [PizzaOne, PizzaTwo, PizzaThree];

function FastingPizzas(props: { title: string; ml?: string }) {
  const [pizzas, setPizzas] = useState([]);
  useEffect(() => {
    (async () => {
      const data = await fetch("/api/pizzas");
      const pizzaData = await data.json();

      const pizzas = pizzaData.map((pizza) => {
        const toppings = pizza.toppings.map((topping) => topping.name);
        return {
          name: pizza.name,
          price: pizza.price,
          toppings: toppings.join(", "),
          resturant: pizza.resturant.name,
        };
      });
      setPizzas(pizzas);
    })();
  }, []);
  return (
    <Box ml={props.ml ? props.ml : "150px"}>
      <Box sx={{ my: "70px " }}>
        <Typography variant="h3" fontWeight="bolder">
          {props.title}
        </Typography>
      </Box>
      {pizzas.length ? (
        <Slider variableWidth={true} arrows={false}>
          {pizzas.map((pizzaData, index) => (
            <Box key={index} sx={{ mx: "20px" }}>
              <PizzaCard
                name={pizzaData.name}
                image={_.sample(pizzaImages)}
                toppings={pizzaData.toppings}
                price={pizzaData.price}
                resturant={pizzaData.resturant}
                action="button"
              />
            </Box>
          ))}
        </Slider>
      ) : (
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress color="warning" />
        </Box>
      )}
    </Box>
  );
}

export default FastingPizzas;
