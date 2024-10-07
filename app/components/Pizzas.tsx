/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Box, CircularProgress, Typography } from '@mui/material';
import PizzaOne from '@/app/assets/pizza-one.svg';
import PizzaTwo from '@/app/assets/pizza-two.svg';
import PizzaThree from '@/app/assets/pizza-three.svg';
import PizzaCard from './PizzaCard';
import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

const pizzaImages = [PizzaOne, PizzaTwo, PizzaThree];

function Pizzas(props: {
  title: string;
  action: 'button' | 'status';
  actionValue?: string;
}) {
  const [pizzas, setPizzas] = useState([]);
  const [orders, setOrders] = useState([]);
  const path = usePathname();
  const session = useSession();

  useEffect(() => {
    (async () => {
      const data = await fetch('/api/pizzas');
      const pizzaData = await data.json();

      const pizzas = pizzaData.map(
        (pizza: {
          toppings: any[];
          id: any;
          name: any;
          price: any;
          resturant_id: any;
          resturant: { name: any };
        }) => {
          const toppings = pizza.toppings.map((topping) => topping.name);
          return {
            id: pizza.id,
            name: pizza.name,
            price: pizza.price,
            toppings: toppings.join(', '),
            resturant: { id: pizza.resturant_id, name: pizza.resturant.name },
          };
        }
      );
      setPizzas(pizzas);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const data = await fetch(
        `/api/orders?filter=${(session.data?.user as any).id}&search=`
      );
      const orderData = await data.json();

      const orders = orderData.map(
        (order: {
          toppings: any[];
          status: any;
          total_price: any;
          resturant: { name: any };
          pizzas: any;
        }) => {
          const toppings = order.toppings.map((topping) => topping.name);
          return {
            name: order.pizzas[0]?.pizza.name,
            price: order.total_price,
            toppings: toppings.join(', '),
            resturant: { name: order.resturant.name },
            status:
              order.status.toLowerCase() === 'delivered'
                ? 'Recived'
                : 'Ordered',
          };
        }
      );
      setOrders(orders);
    })();
  }, []);

  return (
    <>
      <Box sx={{ m: '70px 150px' }}>
        <Typography variant='h3' fontWeight='bolder'>
          {props.title}
        </Typography>
      </Box>
      {path !== '/order-history' ? (
        pizzas.length ? (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box
              sx={{
                display: 'grid',
                justifyContent: 'center',
                rowGap: '40px',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gridTemplateRows: 'repeat(2, 1fr)',
                width: '80%',
              }}
            >
              {pizzas.map((pizzaData: any, index) => (
                <PizzaCard
                  key={index}
                  pizza_id={pizzaData.id}
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
        ) : (
          <Box sx={{ textAlign: 'center' }}>
            <CircularProgress color='warning' />
          </Box>
        )
      ) : orders.length ? (
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
            {orders.map((orderData: any, index) => (
              <PizzaCard
                key={index}
                pizza_id={orderData.id}
                name={orderData.name}
                image={_.sample(pizzaImages)}
                toppings={orderData.toppings}
                price={orderData.price}
                resturant={orderData.resturant}
                action={props.action}
                actionValue={orderData.status}
              />
            ))}
          </Box>
        </Box>
      ) : (
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress color='warning' />
        </Box>
      )}
    </>
  );
}

export default Pizzas;
