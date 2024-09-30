import { Box } from '@mui/material';
import SideBar from '../components/SideBar';
import AppBar from '../components/AppBar';

function DashBoardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: 'flex' }}>
      <Box>
        <SideBar />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '-webkit-fill-available',
        }}
      >
        <AppBar />
        <Box>{children}</Box>
        {/* <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '80%',
          }}
        >
          {addMenu}
        </Box> */}
      </Box>
    </Box>
  );
}
export default DashBoardLayout;
