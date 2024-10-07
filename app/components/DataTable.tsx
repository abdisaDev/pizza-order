/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Box } from '@mui/material';
import { format } from 'date-fns';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import React, { useEffect, useState } from 'react';

export const fetchFilteredData = async (path, filter, search) => {
  return await fetch(`/api/${path}?filter=${filter}&search=${search}`);
};

function DataTable(props: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: any[];
  path: string;
  isLoading: boolean;
  topToolbarAction: React.ReactNode;
  filter: string;
}) {
  const [isGlobalFilterLoading, setIsGlobalFilterLoading] = useState(false);
  const [globalFilter, setGlobalFilter] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [filteredData, setFilteredData] = useState<any[]>(props.data);

  useEffect(() => {
    const fetchData = async () => {
      setIsGlobalFilterLoading(true);
      const filteredData = await fetchFilteredData(
        props.path,
        props.filter,
        globalFilter
      );
      const result = await filteredData.json();

      if (props.path === 'orders' && result.length) {
        const orderList = result.map(
          (orderData: {
            user: any;
            created_at: any;
            pizzas: any;
            id: any;
            status: any;
            quantity: any;
          }) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { user, created_at, pizzas, id, status, quantity } =
              orderData;

            return {
              id,
              name: pizzas ? pizzas[0]?.pizza.name : null,
              customer_number: user?.phone_number,
              created_at: created_at
                ? format(new Date(created_at), ' HH:mm a - dd/MM/yyyy')
                : null,
              quantity,
              toppings: pizzas ? pizzas[0]?.pizza.toppings : null,
              status: status ? status : null,
            };
          }
        );
        setFilteredData(orderList);
      } else {
        setFilteredData(result);
      }
      setIsGlobalFilterLoading(false);
    };
    fetchData();
  }, [globalFilter]);

  const table = useMaterialReactTable({
    data: filteredData,
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
