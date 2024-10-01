"use client";

import { Box, Typography } from "@mui/material";
import PizzaOne from "@/app/assets/pizza-one.svg";
import PizzaTwo from "@/app/assets/pizza-two.svg";
import PizzaThree from "@/app/assets/pizza-three.svg";
import PizzaCard from "./PizzaCard";
import React, { useEffect, useState } from "react";
import _ from "lodash";

const pizzaImages = [PizzaOne, PizzaTwo, PizzaThree];

function Pizzas(props: {
  title: string;
  action: "button" | "status";
  actionValue?: string;
}) {
  const [pizzas, setPizzas] = useState([]);
  useEffect(() => {
    (async () => {
      const data = await fetch("/api/pizzas");
      const pizzaData = await data.json();
      console.log(pizzaData);

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
    <>
      <Box sx={{ m: "70px 150px" }}>
        <Typography variant="h3" fontWeight="bolder">
          {props.title}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            display: "grid",
            justifyContent: "center",
            rowGap: "40px",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridTemplateRows: "repeat(2, 1fr)",
            width: "80%",
            justifySelf: "",
          }}
        >
          {pizzas.map((pizzaData, index) => (
            <PizzaCard
              key={index}
              name={pizzaData.name}
              image={_.sample(pizzaImages)}
              toppings={pizzaData.toppings}
              price={pizzaData.price}
              resturant={pizzaData.resturant}
              action={props.action}
              actionValue={props.actionValue}
            />
          ))}
        </Box>
      </Box>
    </>
  );
}

export default Pizzas;
