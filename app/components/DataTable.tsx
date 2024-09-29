"use client";

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
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
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
/
function DataTable(props: { data?: any[]; columns?: any[] }) {
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
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
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

  const table = useMaterialReactTable({
    data,
    columns,
    renderTopToolbarCustomActions: () => (
      <Typography variant="h6" sx={{ m: "10px" }}>
        Packages
      </Typography>
    ),
    muiTablePaperProps: { sx: { p: 5, borderRadius: "10px" } },
  });
  return (
    <>
      <Box sx={{ p: 2 }}>
        <MaterialReactTable table={table} />
      </Box>
    </>
  );
}

export default DataTable;
