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
import _ from "lodash";
import { forwardRef, useMemo, useState } from "react";

const data = [
  {
    name: "Pizza",
    topping: ["Toppings", "Toppings", "Toppings", "Toppings"],
    quantity: 4,
    customer_number: "+251988242371",
    created_at: new Date().toLocaleDateString(),
    status: "pending",
  },
];

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
  const [openDialog, setOpenDialog] = useState(false);
  const [orderDetail, setOrderDetail] = useState({});

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

        Cell: () => (
          <FormControl fullWidth>
            <InputLabel id="status">Status</InputLabel>
            <Select
              labelId="status"
              id="status"
              value={10}
              label="Status"
              //   onChange={handleChange}
              size="small"
            >
              <MenuItem value={10} sx={{ color: "#FFA500" }}>
                Preparing
              </MenuItem>
              <MenuItem value={20} sx={{ color: "green" }}>
                Ready
              </MenuItem>
              <MenuItem value={30} sx={{ color: "green" }}>
                Delivered
              </MenuItem>
            </Select>
          </FormControl>
        ),
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
        data={data}
        columns={columns}
        topToolbarAction={
          <Typography variant="h6" sx={{ m: "10px" }}>
            Packages
          </Typography>
        }
      />
    </Box>
  );
}

export default OrderListPage;
