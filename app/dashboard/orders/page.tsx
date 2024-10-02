/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import DataTable from "@/app/components/DataTable";
import { RemoveRedEye } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
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

const colors = [
  "default",
  "info",
  "primary",
  "secondary",
  "success",
  "warning",
  "error",
];

function OrderListPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [orderDetail, setOrderDetail] = useState({});

  useEffect(() => {
    (async () => {
      const session = await getSession();
      const data = await fetch("/api/resturants");
      const resturantData = await data.json();

      const resturants = resturantData.find((resturant: { id: string }) => {
        return session?.user?.resturant.id === resturant.id;
      });
      console.log(resturants.orders);
      const orderList = resturants.orders.map(
        (orderData: {
          user: any;
          created_at: any;
          pizzas: any;
          id: any;
          status: any;
        }) => {
          const { user, created_at, pizzas, id, status } = orderData;

          return {
            id,
            name: user.name,
            customer_number: user.phone_number,
            created_at: format(new Date(created_at), "dd/MM/yyyy"),
            // quantity: pizzas[0].quantity,
            status,
          };
        }
      );
      setOrders(orderList);
      setIsLoading(false);
    })();
  }, []);

  const handleOrderStausChange = async (status: string, id: string) => {
    await fetch("/api/orders", {
      method: "POST",
      cache: "no-store",
      body: JSON.stringify({
        id,
        status,
      }),
    });
  };
  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>,
      },
      {
        accessorKey: "topping",
        header: "Topping",
        Cell: ({ row }) => (
          <span>
            <Button
              variant="text"
              color="warning"
              onClick={() => {
                setOpenDialog(true);
                setOrderDetail(row.original);
                // console.log(row.original);
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

        Cell: ({ row, renderedCellValue }) => (
          // row.original.status.toLowerCase() === 'delivered' ? (
          <FormControl fullWidth>
            <InputLabel id="status">Status</InputLabel>
            <Select
              labelId="status"
              id="status"
              name="status"
              value={renderedCellValue}
              label="Status"
              // onChange={(event) => {
              //   console.log(row.original.status.toLowerCase());
              //   setSelectedOrderID(row.original.id);
              // }}
              size="small"
            >
              <MenuItem
                value="ordered"
                sx={{ color: "#FFA500" }}
                onClick={(event) => {
                  handleOrderStausChange(event.target.value, row.original.id);
                }}
              >
                Ordered
              </MenuItem>
              <MenuItem value="preparing" sx={{ color: "#FFA500" }}>
                Preparing
              </MenuItem>
              <MenuItem value="ready" sx={{ color: "green" }}>
                Ready
              </MenuItem>
              <MenuItem value="delivered" sx={{ color: "green" }}>
                Delivered
              </MenuItem>
            </Select>
          </FormControl>
        ),
        // ) : (
        //   <Box>
        //     <Typography>Delivered</Typography>
        //   </Box>
        // ),
      },
    ],
    []
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
                  Name: &emsp;{orderDetail.name}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", flexWrap: "wrap", columnGap: 1 }}>
                <Typography variant="h5">Toppings: </Typography>
                {orderDetail.topping?.map((topping, index) => (
                  <Chip label={topping} key={index} color={_.sample(colors)} />
                ))}
              </Box>
              <Box>
                <Typography variant="h5">
                  Quantity: &emsp;{orderDetail.quantity}
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
