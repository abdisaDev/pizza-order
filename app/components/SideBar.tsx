import {
  Box,
  Button,
  Divider,
  IconButton,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Typography,
} from "@mui/material";
import {
  MenuOpen as MenuOpenIcon,
  ShoppingCart as ShoppingCartIcon,
  LocalPizza as LocalPizzaIcon,
  Person as PersonIcon,
  AccountCircleOutlined as AccountCircleOutlinedIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import Image from "next/image";
import CompanyLogo from "@/app/assets/logo.svg";

function SideBar() {
  return (
    <>
      <Box
        sx={{
          width: "20vw",
          height: "100vh",
        }}
      >
        <Paper sx={{ height: "100%" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: "10px 30px",
            }}
          >
            <Typography variant="h6" fontWeight="bolder">
              Company Name
            </Typography>
            <IconButton size="large">
              <MenuOpenIcon fontSize="large" />
            </IconButton>
          </Box>
          <Divider />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              background: "#FFF9F2",
              py: "60px",
            }}
          >
            <Image src={CompanyLogo} alt="company-logo" />
          </Box>
          <Divider />
          <Box>
            <MenuList
              sx={{
                "& > *": {
                  p: "15px 80px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#FF8100",
                  borderRadius: "20px",
                  m: 1,
                },
              }}
            >
              <MenuItem>
                <ListItemText>
                  <ShoppingCartIcon />
                  &emsp; Orders
                </ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemText>
                  <LocalPizzaIcon />
                  &emsp;Add Menu
                </ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemText>
                  <PersonIcon />
                  &emsp;Role
                </ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemText>
                  <AccountCircleOutlinedIcon />
                  &emsp;User
                </ListItemText>
              </MenuItem>
            </MenuList>
          </Box>
          <Divider />
          <Box>
            <Button
              variant="text"
              color="error"
              fullWidth
              sx={{ fontSize: "large", py: 2, my: 2 }}
            >
              <LogoutIcon /> &ensp; Log Out
            </Button>
          </Box>
        </Paper>
      </Box>
    </>
  );
}

export default SideBar;
