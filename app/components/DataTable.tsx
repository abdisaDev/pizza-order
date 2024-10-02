'use client';

import { Box } from '@mui/material';
import { format } from 'date-fns';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import React, { useEffect, useState } from 'react';

function DataTable(props: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: any[];
  path: string;
  isLoading: boolean;
  topToolbarAction: React.ReactNode;
}) {
  const [isGlobalFilterLoading, setIsGlobalFilterLoading] = useState(false);
  const [globalFilter, setGlobalFilter] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [filteredOrders, setFilteredOrders] = useState<any[]>(props.data);
  useEffect(() => {
    const fetchData = async () => {
      setIsGlobalFilterLoading(true);
      const filteredData = await fetch(
        `/api/${props.path}?search=${globalFilter}`
      );
      const result = await filteredData.json();
      if (props.path === 'orders') {
        const orderList = result.map((orderData) => {
          const { user, created_at, pizzas, id, status } = orderData;

          return {
            id,
            name: user.name,
            customer_number: user.phone_number,
            created_at: format(new Date(created_at), 'dd/MM/yyyy'),
            quantity: pizzas[0].quantity,
            status,
          };
        });
        setFilteredOrders(orderList);
      } else {
        setFilteredOrders([...result]);
      }
      setIsGlobalFilterLoading(false);
    };
    fetchData();
  }, [globalFilter]);

  const table = useMaterialReactTable({
    data: filteredOrders,
    columns: props.columns,
    renderTopToolbarCustomActions: () => props.topToolbarAction,
    muiTablePaperProps: { sx: { p: 4, borderRadius: '10px' } },
    muiSkeletonProps: {
      animation: 'wave',
    },
    enableRowNumbers: true,
    rowNumberDisplayMode: 'original',
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
