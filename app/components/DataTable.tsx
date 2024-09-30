'use client';

import { Box, Typography } from '@mui/material';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function DataTable(props: { data: any[]; columns: any[] }) {
  const table = useMaterialReactTable({
    data: props.data,
    columns: props.columns,
    renderTopToolbarCustomActions: () => (
      <Typography variant='h6' sx={{ m: '10px' }}>
        Packages
      </Typography>
    ),
    muiTablePaperProps: { sx: { p: 5, borderRadius: '10px' } },
  });
  return (
    <Box sx={{ p: 2 }}>
      <MaterialReactTable table={table} />
    </Box>
  );
}

export default DataTable;
