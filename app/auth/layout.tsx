import { Box } from '@mui/material';
import Pizza from '@/app/assets/pizza.svg';
import Logo from '@/app/assets/logo.svg';
import Image from 'next/image';

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Box sx={{ width: '100vw', height: '100vh', display: 'flex' }}>
        <Box
          sx={{
            width: '50%',
            background: '#FB9922',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image src={Pizza} alt='pizza-image' style={{ width: '300px' }} />
        </Box>
        <Box
          sx={{
            width: '50%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignSelf: 'start',
              ml: 15,
            }}
          >
            <Image src={Logo} alt='logo' style={{ width: '150px' }} />
          </Box>
          {children}
        </Box>
      </Box>
    </>
  );
}

export default AuthLayout;
