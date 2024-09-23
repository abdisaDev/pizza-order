import Image from 'next/image';
import Logo from '@/app/assets/logo.svg';
import { Box, Button } from '@mui/material';
import Link from 'next/link';

function NavigationBar() {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          m: '20px',
          mb: '60px',
        }}
      >
        <Box sx={{ width: '25%' }}>
          <Image src={Logo} alt='pizza-logo' priority={true} />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            width: '60%',
            '& > *': {
              fontSize: '20px',
              fontWeight: 'bold',
            },
          }}
        >
          <Link href='#'>Home</Link>
          <Link href='#'>Order</Link>
          <Link href='#'>Who are we</Link>
        </Box>
        <Box sx={{ width: '30%', display: 'flex', justifyContent: 'right' }}>
          <Button variant='contained' color='warning' disableElevation>
            Register
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default NavigationBar;
