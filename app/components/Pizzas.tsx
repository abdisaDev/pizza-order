import { Box, Typography } from '@mui/material';
import PizzaOne from '@/app/assets/pizza-one.svg';
import PizzaTwo from '@/app/assets/pizza-two.svg';
import PizzaThree from '@/app/assets/pizza-three.svg';
import PizzaCard from './PizzaCard';
import React from 'react';

const popularPizzasData = [
  {
    name: 'Margherita',
    image: PizzaOne,
    toppings: ['Tomato', 'Mozzarella', 'Bell Peppers', 'Onions', 'Olives'],

    price: '250',
  },
  {
    name: 'Margherita',
    image: PizzaTwo,
    toppings: ['Tomato', 'Mozzarella', 'Bell Peppers', 'Onions', 'Olives'],

    price: '150',
  },
  {
    name: 'Margherita',
    image: PizzaThree,
    toppings: ['Tomato', 'Mozzarella', 'Bell Peppers', 'Onions', 'Olives'],

    price: '350',
  },
  {
    name: 'Margherita',
    image: PizzaOne,
    toppings: ['Tomato', 'Mozzarella', 'Bell Peppers', 'Onions', 'Olives'],

    price: '250',
  },
  {
    name: 'Margherita',
    image: PizzaTwo,
    toppings: ['Tomato', 'Mozzarella', 'Bell Peppers', 'Onions', 'Olives'],

    price: '150',
  },
  {
    name: 'Margherita',
    image: PizzaThree,
    toppings: ['Tomato', 'Mozzarella', 'Bell Peppers', 'Onions', 'Olives'],
    price: '350',
  },
];
function Pizzas(props: {
  title: string;
  action: 'button' | 'status';
  actionValue?: string;
}) {
  return (
    <>
      <Box sx={{ m: '70px 150px' }}>
        <Typography variant='h3' fontWeight='bolder'>
          {props.title}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box
          sx={{
            display: 'grid',
            justifyContent: 'center',
            rowGap: '40px',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: 'repeat(2, 1fr)',
            width: '80%',
            justifySelf: '',
          }}
        >
          {popularPizzasData.map((pizzaData, index) => (
            <PizzaCard
              key={index}
              name={pizzaData.name}
              image={pizzaData.image}
              toppings={pizzaData.toppings}
              price={pizzaData.price}
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
