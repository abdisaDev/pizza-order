'use client';
import DataTable from '@/app/components/DataTable';
import { RemoveRedEye } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { format } from 'date-fns';

function OrderListPage() {
  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const users = await fetch('/api/roles');
      setRoles(await users.json());
      setIsLoading(false);
    })();
  }, []);

  console.log(roles);
  const columns = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Role Name',
        Cell: ({ renderedCellValue }) => <span>{renderedCellValue}</span>,
      },
      {
        accessorKey: 'created_at',
        header: 'Created at',
        Cell: ({ renderedCellValue }) => (
          <span>{format(renderedCellValue, 'dd/MM/yyyy').toString()}</span>
        ),
      },
      {
        accessorKey: 'actions',
        header: 'Actions',
        Cell: ({ renderedCellValue }) => <span>{renderedCellValue}</span>,
      },
    ],
    []
  );
  return (
    <Box>
      <DataTable
        data={roles}
        columns={columns}
        isLoading={isLoading}
        topToolbarAction={
          <Button
            variant='contained'
            color='warning'
            disableElevation
            sx={{ p: '10px 50px' }}
          >
            Add Role
          </Button>
        }
      />
    </Box>
  );
}

export default OrderListPage;
