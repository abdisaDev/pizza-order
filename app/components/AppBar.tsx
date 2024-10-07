import { Box, IconButton, Paper, Popover, Typography } from "@mui/material";
import {
  Notifications as NotificationsIcon,
  AccountCircleOutlined as AccountCircleOutlinedIcon,
} from "@mui/icons-material";
import { useSession } from "next-auth/react";
import { useState } from "react";
function AppBar() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const session = useSession();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "user-account" : undefined;

  return (
    <Box>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        sx={{
          textAlign: "center",
        }}
      >
        <Typography sx={{ p: "5px 20px", fontWeight: "bolder" }}>
          {session.data?.user?.name}
        </Typography>
        <Typography sx={{ p: "5px 20px", fontWeight: "bolder" }}>
          {session.data?.user?.email}
        </Typography>
      </Popover>
      <Paper
        elevation={1}
        sx={{
          height: "80px",
          borderRadius: 0,
          display: "flex",
          alignItems: "center",
          px: 4,
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h5" fontWeight="bolder">
          Role
        </Typography>
        <Box>
          <IconButton size="large">
            <NotificationsIcon />
          </IconButton>
          <IconButton size="large" onClick={handleClick}>
            <AccountCircleOutlinedIcon />
          </IconButton>
        </Box>
      </Paper>
    </Box>
  );
}

export default AppBar;
