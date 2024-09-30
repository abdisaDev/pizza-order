'use client';

import DataTable from '@/app/components/DataTable';
import { Box, Button, Switch, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';

function OrderListPage() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const users = await fetch('/api/users');
      setUsers(await users.json());
      setIsLoading(false);
    })();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
        Cell: ({ renderedCellValue }) => <span>{renderedCellValue}</span>,
      },
      {
        accessorKey: 'phone_number',
        header: 'Phone No.',
        Cell: ({ renderedCellValue }) => <span>{renderedCellValue}</span>,
      },
      {
        accessorKey: 'email',
        header: 'Email',
        Cell: ({ renderedCellValue }) => <span>{renderedCellValue}</span>,
      },
      {
        accessorKey: 'actions',
        header: 'Actions',

        Cell: ({ renderedCellValue }) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              columnGap: 2,
              background: '#E6F3E7',
              width: 'fit-content',
              p: '7px 40px',
              borderRadius: '20px',
            }}
          >
            <Typography color='success'>Active</Typography>
            <Switch color='success' size='small' />
          </Box>
        ),
      },
    ],
    []
  );

  return (
    <Box>
      <DataTable
        data={users}
        columns={columns}
        isLoading={isLoading}
        topToolbarAction={
          <Button
            variant='contained'
            color='warning'
            disableElevation
            sx={{ p: '10px 50px' }}
          >
            Add User
          </Button>
        }
      />
    </Box>
  );
}

export default OrderListPage;
