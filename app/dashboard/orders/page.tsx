"use client";

import DataTable from "@/app/components/DataTable";
import { RemoveRedEye } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useMemo } from "react";

const data = [
  {
    name: "Pizza",
    topping: "Toppings",
    quantity: 4,
    customer_number: "+251988242371",
    created_at: new Date().toLocaleDateString(),
    status: "pending",
  },
  {
    name: "Pizza",
    topping: "Toppings",
    quantity: 4,
    customer_number: "+251988242371",
    created_at: new Date().toLocaleDateString(),
    status: "pending",
  },
  {
    name: "Pizza",
    topping: "Toppings",
    quantity: 4,
    customer_number: "+251988242371",
    created_at: new Date().toLocaleDateString(),
    status: "pending",
  },
  {
    name: "Pizza",
    topping: "Toppings",
    quantity: 4,
    customer_number: "+251988242371",
    created_at: new Date().toLocaleDateString(),
    status: "pending",
  },
];

function OrderListPage() {
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
        Cell: () => (
          <span>
            <Button variant="text" color="warning">
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

        Cell: ({ renderedCellValue }) => (
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
