import { Box, CircularProgress } from '@mui/material';

function Loading() {
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress color='inherit' />
    </Box>
  );
}

export default Loading;
