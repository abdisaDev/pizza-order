import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/app/assets/logo.svg';
import {
  Facebook,
  LinkedIn,
  Send as SendIcon,
  Twitter,
} from '@mui/icons-material';

function Footer() {
  return (
    <Box>
      <Box
        sx={{
          height: '200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#CCB691',
          mt: 10,
        }}
      >
        <Box
          sx={{
            width: '30%',
            display: 'flex',
            justifyContent: 'space-around',
            fontWeight: 'bolder',
            fontSize: '30px',
          }}
        >
          <Link href='#'>Order</Link>
          <Link href='#'>About Us</Link>
          <Link href='#'>Home</Link>
        </Box>
        <Box
          sx={{
            width: '30%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mr: '50px',
          }}
        >
          <Image src={Logo} priority={true} alt='logo' />
          <TextField
            placeholder='Your Feedback'
            fullWidth
            slotProps={{
              input: {
                sx: {
                  borderRadius: '10px',
                  background: '#fff',
                  border: 'none',
                  p: '0 20px',
                  my: '20px',
                },
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      sx={{
                        background: '#FA8910',
                        color: '#fff',
                        p: 'fit-content',
                      }}
                    >
                      <SendIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          height: 'fit-content',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: '#000',
          color: '#eee',
          p: '10px 50px',
        }}
      >
        <Box sx={{ display: 'flex', columnGap: 3 }}>
          <Typography>@2024 Pizza All Rights Reserved.</Typography>
          <Link href='#'>Terms and Conditions</Link>
        </Box>
        <Box>
          <IconButton size='large' color='secondary'>
            <Facebook htmlColor='#eee' fontSize='large' />
          </IconButton>
          <IconButton size='large'>
            <LinkedIn fontSize='large' htmlColor='#eee' />
          </IconButton>
          <IconButton size='large'>
            <Twitter fontSize='large' htmlColor='#eee' />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;
