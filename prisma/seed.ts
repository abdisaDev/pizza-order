import prisma from "@/app/util/prisma";

async function main() {
  const superuser = await prisma.user.create({
    data: {
      name: "Abdisa Dev",
      email: "abdisadev@gmail.com",
      status: true,
      password: "password",
      location: "addis ababa",
      phone_number: "0988242371",
      type: "RESTURANT",
      // orders: {connect: },
    },
  });

  const topping1 = await prisma.topping.create({
    data: { name: "Tomato" },
  });

  const topping2 = await prisma.topping.create({
    data: { name: "Mozzarella" },
  });

  const topping3 = await prisma.topping.create({
    data: { name: "Basil" },
  });

  const topping4 = await prisma.topping.create({
    data: { name: "Pepperoni" },
  });

  const topping5 = await prisma.topping.create({
    data: { name: "Bell Peppers" },
  });

  const topping6 = await prisma.topping.create({
    data: { name: "Onions" },
  });

  const topping7 = await prisma.topping.create({
    data: { name: "Olives" },
  });

  const restaurant = await prisma.resturant.create({
    data: {
      name: "Abdisa Resturant",
      total_orders: 0,
      admin_id: "unique-admin-id", 
  });

  const pizza1 = await prisma.pizza.create({
    data: {
      name: "Margherita",
      price: "270",
      resturant_id: restaurant.id, 
      toppings: {
        connect: [
          { id: topping6.id },
          { id: topping3.id },
          { id: topping5.id },
          { id: topping7.id },
        ],
      },
      order_id: "",
    },
  });

  const pizza2 = await prisma.pizza.create({
    data: {
      name: "Pepperoni",
      price: "350", 
      resturant_id: restaurant.id, 
      toppings: {
        connect: [
          { id: topping1.id },
          { id: topping2.id },
          { id: topping4.id },
          { id: topping7.id },
        ],
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
