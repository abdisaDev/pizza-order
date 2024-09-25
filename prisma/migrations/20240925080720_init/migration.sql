-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "password" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resturants" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "admin_id" TEXT NOT NULL,

    CONSTRAINT "resturants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pizzas" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "resturant_id" TEXT NOT NULL,

    CONSTRAINT "pizzas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "toppings" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "toppings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "total_amount" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PizzaToppings" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "resturants_admin_id_key" ON "resturants"("admin_id");

-- CreateIndex
CREATE UNIQUE INDEX "pizzas_resturant_id_key" ON "pizzas"("resturant_id");

-- CreateIndex
CREATE UNIQUE INDEX "orders_user_id_key" ON "orders"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "_PizzaToppings_AB_unique" ON "_PizzaToppings"("A", "B");

-- CreateIndex
CREATE INDEX "_PizzaToppings_B_index" ON "_PizzaToppings"("B");

-- AddForeignKey
ALTER TABLE "resturants" ADD CONSTRAINT "resturants_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pizzas" ADD CONSTRAINT "pizzas_resturant_id_fkey" FOREIGN KEY ("resturant_id") REFERENCES "resturants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PizzaToppings" ADD CONSTRAINT "_PizzaToppings_A_fkey" FOREIGN KEY ("A") REFERENCES "pizzas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PizzaToppings" ADD CONSTRAINT "_PizzaToppings_B_fkey" FOREIGN KEY ("B") REFERENCES "toppings"("id") ON DELETE CASCADE ON UPDATE CASCADE;
