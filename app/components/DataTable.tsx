"use client";

import { Box } from "@mui/material";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import React, { useEffect, useState } from "react";

function DataTable(props: {
  data: any[];
  columns: any[];
  isLoading: boolean;
  topToolbarAction: React.ReactNode;
}) {
  const [isGlobalFilterLoading, setIsGlobalFilterLoading] = useState(false);
  const [globalFilter, setGlobalFilter] = useState("");
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsGlobalFilterLoading(true);
      const filteredData = await fetch(`/api/users?search=${globalFilter}`);
      const result = await filteredData.json();
      setData([...result]);
      setIsGlobalFilterLoading(false);
    };
    fetchData();
  }, [globalFilter]);

  const table = useMaterialReactTable({
    data,
    columns: props.columns,
    renderTopToolbarCustomActions: () => props.topToolbarAction,
    muiTablePaperProps: { sx: { p: 4, borderRadius: "10px" } },
    muiSkeletonProps: {
      animation: "wave",
    },
    enableRowNumbers: true,
    rowNumberDisplayMode: "original",
    manualFiltering: true,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      isLoading: props.isLoading || isGlobalFilterLoading,
      globalFilter,
    },
  });
  return (
    <Box sx={{ p: 2 }}>
      <MaterialReactTable table={table} />
    </Box>
  );
}

export default DataTable;
