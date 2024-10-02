'use client';

import { Add, FileUpload } from '@mui/icons-material';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from '@mui/material';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

function AddMenu() {
  const [newTopping, setNewTopping] = useState({
    show: false,
    element: <></>,
    names: [],
  });
  const [menuDetail, setMenuDetail] = useState({
    name: '',
    price: '',
    toppings: newTopping.names,
  });
  const session = useSession();

  useEffect(() => {
    setMenuDetail((prev) => {
      return { ...prev, toppings: newTopping.names };
    });
    console.log(menuDetail);
  }, [newTopping]);

  return (
    <Box sx={{ width: '50%' }}>
      <Box>
        <Typography
          variant='h3'
          sx={{
            fontWeight: 'bolder',
            textAlign: 'center',
            my: 3,
          }}
        >
          Add Menu
        </Typography>
        <TextField
          fullWidth
          placeholder='Menu Name'
          label='Name'
          onChange={(event) => {
            setMenuDetail((prev) => {
              return { ...prev, name: event.target.value };
            });
          }}
        />
      </Box>
      <Box>
        <Typography
          variant='h4'
          sx={{
            my: 2,
            fontWeight: 'bolder',
          }}
        >
          Topping
        </Typography>
        <Box
          sx={{
            width: '80%',
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            my: 2,
          }}
        >
          {newTopping.names.map((topping: { name: string }, index) => (
            <Box key={index}>
              <FormControlLabel control={<Checkbox />} label={topping.name} />
            </Box>
          ))}
          <Box>
            {newTopping.show && (
              <Box sx={{ display: 'flex', alignItems: 'center', px: 2 }}>
                <Box>{newTopping.element}</Box>
              </Box>
            )}
          </Box>
          <Box>
            <Button
              size='small'
              color='warning'
              variant='contained'
              disableElevation
              onClick={() => {
                setNewTopping((prev) => {
                  return {
                    names: [...prev.names],
                    show: true,
                    element: (
                      <Box>
                        <TextField
                          size='small'
                          label='Topping Name'
                          placeholder='Topping Name'
                          onBlur={(event) => {
                            setNewTopping((prev) => {
                              return {
                                ...prev,
                                show: false,
                                names: [
                                  ...prev.names,
                                  { name: event.target.value },
                                ],
                              };
                            });
                          }}
                        />
                      </Box>
                    ),
                  };
                });
              }}
            >
              <Add /> &nbsp; Add
            </Button>
          </Box>
        </Box>
      </Box>
      <Box my={2}>
        <TextField
          fullWidth
          placeholder='Price'
          label='Price'
          onChange={(event) => {
            setMenuDetail((prev) => {
              return { ...prev, price: event.target.value };
            });
          }}
        />
      </Box>
      <Box
        sx={{
          '& > *': { width: '50%', borderRadius: '10px' },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          rowGap: 2,
        }}
      >
        <Button variant='outlined' color='warning' sx={{ py: 2 }}>
          <FileUpload />
          &ensp; Upload Logo
        </Button>

        <Button
          variant='contained'
          disableElevation
          color='warning'
          sx={{ py: 2 }}
          onClick={async () => {
            console.log(menuDetail.toppings);
            const response = await fetch('/api/add-menu', {
              method: 'POST',
              body: JSON.stringify({
                ...menuDetail,
                resturant_id: session.data?.user.resturant.id,
              }),
            });

            console.log(response);
          }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}
export default AddMenu;
