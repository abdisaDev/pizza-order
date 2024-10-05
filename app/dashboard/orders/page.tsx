/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import DataTable from "@/app/components/DataTable";
import OrderStatusMenu from "@/app/components/OrderStatusMenu";
import { Check, RemoveRedEye } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { format } from "date-fns";
import _ from "lodash";
import { getSession } from "next-auth/react";
import { forwardRef, useEffect, useMemo, useState } from "react";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const colors: Array<
  "default" | "primary" | "secondary" | "success" | "error" | "info" | "warning"
> = ["default", "info", "primary", "secondary", "success", "warning", "error"];

function OrderListPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [orderDetail, setOrderDetail] = useState<{
    quantity: string;
    toppings: { id: string; name: string }[];
    name: string;
  }>();

  useEffect(() => {
    (async () => {
      const session = await getSession();
      const data = await fetch("/api/resturants");
      const resturantData = await data.json();

      const resturants = resturantData.find((resturant: { id: string }) => {
        return (session?.user as any)?.resturant.id === resturant.id;
      });

      const orderList = resturants.orders.map(
        (orderData: {
          user: any;
          created_at: any;
          pizzas: any;
          id: any;
          status: any;
          quantity: any;
        }) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { user, created_at, pizzas, id, status, quantity } = orderData;
          console.log(pizzas[0].pizza.toppings);
          return {
            id,
            name: user.name,
            customer_number: user.phone_number,
            created_at: format(new Date(created_at), "dd/MM/yyyy - HH:mm"),
            quantity,
            toppings: pizzas[0].pizza.toppings,
            status,
          };
        }
      );
      setOrders(orderList);
      setIsLoading(false);
    })();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>,
      },
      {
        accessorKey: "toppings",
        header: "Topping",
        Cell: ({ row }) => (
          <span>
            <Button
              variant="text"
              color="warning"
              onClick={() => {
                console.log(orderDetail);

                setOpenDialog(true);
                setOrderDetail(row.original);
              }}
            >
              <RemoveRedEye /> &ensp; Topping
            </Button>
          </span>
        ),
      },
      {
        accessorKey: "quantity",
        header: "Quantity",
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>,
      },
      {
        accessorKey: "customer_number",
        header: "Customer No.",
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>,
      },
      {
        accessorKey: "created_at",
        header: "Created At.",
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>,
      },
      {
        accessorKey: "status",
        header: "Status",

        Cell: ({ row, renderedCellValue }) => {
          console.log(renderedCellValue);
          return renderedCellValue.toString().toLowerCase() === "delivered" ? (
            <Box sx={{ display: "flex", columnGap: 1 }}>
              <Check color="success" />
              <Typography color="success">Delivered</Typography>
            </Box>
          ) : (
            <OrderStatusMenu order={row.original} status={renderedCellValue} />
          );
        },
      },
    ],
    [orderDetail]
  );

  return (
    <Box>
      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => {
          setOpenDialog(false);
        }}
        PaperProps={{
          sx: { borderRadius: "20px" },
        }}
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            fontSize: "30px",
            fontWeight: "bolder",
          }}
        >
          Order Details
        </DialogTitle>
        <DialogContent sx={{ px: 10 }}>
          <Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box>
                <Typography variant="h5">
                  Name: &emsp;{orderDetail?.name}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", flexWrap: "wrap", columnGap: 1 }}>
                <Typography variant="h5">Toppings: </Typography>
                {orderDetail?.toppings?.map((topping, index) => (
                  <Chip
                    label={topping.name}
                    key={index}
                    color={_.sample(colors)}
                  />
                ))}
              </Box>
              <Box>
                <Typography variant="h5">
                  Quantity: &emsp;{orderDetail?.quantity}
                </Typography>
              </Box>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
      <DataTable
        data={orders}
        columns={columns}
        topToolbarAction={
          <Typography variant="h6" sx={{ m: "10px" }}>
            Packages
          </Typography>
        }
        isLoading={isLoading}
        path="orders"
      />
    </Box>
  );
}

export default OrderListPage;
