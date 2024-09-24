import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';

function Banner(props: {
  title: string;
  discount: string;
  description: string;
  image: string;
  backgroundColor: string;
}) {
  return (
    <>
      <Box sx={{ display: 'flex', my: 15, height: '400px' }}>
        <Box
          sx={{
            mx: '10%',
            width: '100%',
            backgroundColor: props.backgroundColor,
            borderRadius: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: '#fff',
            gap: 2,
          }}
        >
          <Box sx={{ width: '50%', p: '50px' }}>
            <Typography variant='h3' fontWeight='bolder' mb={3}>
              {props.title}
            </Typography>
            <Typography variant='h6' mb={5}>
              {props.description}
            </Typography>
            <Button
              variant='contained'
              color='warning'
              disableElevation
              sx={{ p: '15px 40px' }}
            >
              Order Now
            </Button>
          </Box>
          <Box>
            <Image src={props.image} alt='pizza-image' />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Banner;
