"use client";
import { Box, Typography } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PizzaCard from "./PizzaCard";
import PizzaOne from "@/app/assets/pizza-one.svg";
import PizzaTwo from "@/app/assets/pizza-two.svg";
import PizzaThree from "@/app/assets/pizza-three.svg";

const popularPizzasData = [
  {
    name: "Margherita",
    image: PizzaOne,
    toppings: ["Tomato", "Mozzarella", "Bell Peppers", "Onions", "Olives"],

    price: "250",
  },
  {
    name: "Margherita",
    image: PizzaTwo,
    toppings: ["Tomato", "Mozzarella", "Bell Peppers", "Onions", "Olives"],

    price: "150",
  },
  {
    name: "Margherita",
    image: PizzaThree,
    toppings: ["Tomato", "Mozzarella", "Bell Peppers", "Onions", "Olives"],

    price: "350",
  },
  {
    name: "Margherita",
    image: PizzaOne,
    toppings: ["Tomato", "Mozzarella", "Bell Peppers", "Onions", "Olives"],

    price: "250",
  },
  {
    name: "Margherita",
    image: PizzaTwo,
    toppings: ["Tomato", "Mozzarella", "Bell Peppers", "Onions", "Olives"],

    price: "150",
  },
  {
    name: "Margherita",
    image: PizzaThree,
    toppings: ["Tomato", "Mozzarella", "Bell Peppers", "Onions", "Olives"],
    price: "350",
  },
];

function FastingPizzas(props: { title: string; ml?: string }) {
  return (
    <>
      <Box ml={props.ml ? props.ml : "150px"}>
        <Box sx={{ my: "70px " }}>
          <Typography variant="h3" fontWeight="bolder">
            {props.title}
          </Typography>
        </Box>
        <Slider variableWidth={true} arrows={false}>
          {popularPizzasData.map((pizzaData, index) => (
            <Box key={index} sx={{ mx: "20px" }}>
              <PizzaCard
                name={pizzaData.name}
                image={pizzaData.image}
                toppings={pizzaData.toppings}
                price={pizzaData.price}
                action="button"
              />
            </Box>
          ))}
        </Slider>
      </Box>
    </>
  );
}

export default FastingPizzas;
