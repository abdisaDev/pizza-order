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
        <Box sx={{ width: '50%', m: '7% 0 0 15%' }}>
          <Box>
            <Image src={Logo} alt='logo' style={{ width: '150px' }} />
          </Box>
          {children}
        </Box>
      </Box>
    </>
  );
}

export default AuthLayout;
