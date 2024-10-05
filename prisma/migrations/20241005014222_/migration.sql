-- CreateTable
CREATE TABLE "_OrderToppings" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_OrderToppings_AB_unique" ON "_OrderToppings"("A", "B");

-- CreateIndex
CREATE INDEX "_OrderToppings_B_index" ON "_OrderToppings"("B");

-- AddForeignKey
ALTER TABLE "_OrderToppings" ADD CONSTRAINT "_OrderToppings_A_fkey" FOREIGN KEY ("A") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrderToppings" ADD CONSTRAINT "_OrderToppings_B_fkey" FOREIGN KEY ("B") REFERENCES "toppings"("id") ON DELETE CASCADE ON UPDATE CASCADE;
