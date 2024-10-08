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
import { getSession, useSession } from "next-auth/react";
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
  const session = useSession();

  useEffect(() => {
    (async () => {
      const session = await getSession();
      const data = await fetch(
        (session?.user as any)?.type !== "CUSTOMER"
          ? `/api/orders?filter=${
              (session?.user as any)?.resturant.id
            }&search=&by=resturant`
          : "?filter=&search=&by=resturant"
      );
      const resturants = await data.json();

      const orderList = resturants.map(
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

          return {
            id,
            name: pizzas ? pizzas[0]?.pizza.name : null,
            customer_number: user?.phone_number,
            created_at: created_at
              ? format(new Date(created_at), " HH:mm a - dd/MM/yyyy")
              : null,
            quantity,
            toppings: pizzas ? pizzas[0]?.pizza.toppings : null,
            status: status ? status : null,
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
      },
      {
        accessorKey: "customer_number",
        header: "Customer No.",
      },
      {
        accessorKey: "created_at",
        header: "Created At.",
      },
      {
        accessorKey: "status",
        header: "Status",

        Cell: ({ row, renderedCellValue }) => {
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
        path="orders"
        filter={(session.data?.user as any)?.resturant.id}
        topToolbarAction={
          <Typography variant="h6" sx={{ m: "10px" }}>
            Packages
          </Typography>
        }
        isLoading={isLoading}
      />
    </Box>
  );
}

export default OrderListPage;
