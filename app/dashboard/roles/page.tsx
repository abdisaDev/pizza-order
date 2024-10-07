/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import DataTable from '@/app/components/DataTable';
import { Delete, RemoveRedEye } from '@mui/icons-material';
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Slide,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { forwardRef, useEffect, useMemo, useState } from 'react';
import { format } from 'date-fns';
import { TransitionProps } from '@mui/material/transitions';
import { useSession } from 'next-auth/react';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

function OrderListPage() {
  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const session = useSession();

  useEffect(() => {
    (async () => {
      const users = await fetch(
        `/api/roles?filter=${(session.data?.user as any)?.resturant.id}&search=`
      );
      setRoles(await users.json());
      setIsLoading(false);
    })();
  }, []);

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
        Cell: () => (
          <Box sx={{ display: 'flex', gap: 1 }}>
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
            <IconButton>
              <RemoveRedEye />
            </IconButton>
            <IconButton color='error'>
              <Delete />
            </IconButton>
          </Box>
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
          sx: { borderRadius: '20px' },
        }}
      >
        <DialogTitle
          sx={{
            textAlign: 'center',
            fontSize: '30px',
            fontWeight: 'bolder',
          }}
        >
          Role
        </DialogTitle>
        <DialogContent sx={{ px: 10 }}>
          <Box mt={2}>
            <TextField
              // ref={roleInput}
              name='role_name'
              placeholder='Name'
              label='Name'
              fullWidth
            />
          </Box>
          <Box>
            <Typography variant='h5' sx={{ fontWeight: 'bolder', my: 2 }}>
              Permissions
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', columnGap: 1 }}>
              <FormControlLabel
                id='aggrement'
                name='aggrement'
                control={<Checkbox color='warning' />}
                label='Update Order Status'
              />
              <FormControlLabel
                id='aggrement'
                name='aggrement'
                control={<Checkbox color='warning' />}
                label='See orders'
              />
              <FormControlLabel
                id='aggrement'
                name='aggrement'
                control={<Checkbox color='warning' />}
                label='Add users'
              />
              <FormControlLabel
                id='aggrement'
                name='aggrement'
                control={<Checkbox color='warning' />}
                label='See Customers'
              />
              <FormControlLabel
                id='aggrement'
                name='aggrement'
                control={<Checkbox color='warning' />}
                label='Create Roles'
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{ display: 'flex', justifyContent: 'center', px: 10, mb: 4 }}
        >
          <Button
            onClick={() => {
              setOpenDialog(false);
            }}
            variant='contained'
            disableElevation
            color='warning'
            fullWidth
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
      <DataTable
        data={roles}
        columns={columns}
        isLoading={isLoading}
        path='roles'
        filter={(session.data?.user as any)?.resturant.id}
        topToolbarAction={
          <Button
            variant='contained'
            color='warning'
            disableElevation
            sx={{ p: '10px 50px' }}
            onClick={() => {
              setOpenDialog(true);
            }}
          >
            Add Role
          </Button>
        }
      />
    </Box>
  );
}

export default OrderListPage;
