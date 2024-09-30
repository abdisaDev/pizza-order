import { Box, IconButton, Paper, Typography } from '@mui/material';
import {
  Notifications as NotificationsIcon,
  AccountCircleOutlined as AccountCircleOutlinedIcon,
} from '@mui/icons-material';
function AppBar() {
  return (
    <Paper
      elevation={1}
      sx={{
        height: '80px',
        borderRadius: 0,
        display: 'flex',
        alignItems: 'center',
        px: 4,
        justifyContent: 'space-between',
      }}
    >
      <Typography variant='h5' fontWeight='bolder'>
        Role
      </Typography>
      <Box>
        <IconButton size='large'>
          <NotificationsIcon />
        </IconButton>
        <IconButton size='large'>
          <AccountCircleOutlinedIcon />
        </IconButton>
      </Box>
    </Paper>
  );
}

export default AppBar;
