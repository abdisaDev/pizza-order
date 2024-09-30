'use client';

import { Box, Typography } from '@mui/material';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function DataTable(props: {
  data: any[];
  columns: any[];
  isLoading: boolean;
  topToolbarAction: React.ReactNode;
}) {
  const table = useMaterialReactTable({
    data: props.data,
    columns: props.columns,
    renderTopToolbarCustomActions: () => props.topToolbarAction,
    muiTablePaperProps: { sx: { p: 4, borderRadius: '10px' } },
    state: {
      isLoading: props.isLoading,
    },
    muiSkeletonProps: {
      animation: 'wave',
    },
    enableRowNumbers: true,
    rowNumberDisplayMode: 'original',
  });
  return (
    <Box sx={{ p: 2 }}>
      <MaterialReactTable table={table} />
    </Box>
  );
}

export default DataTable;
