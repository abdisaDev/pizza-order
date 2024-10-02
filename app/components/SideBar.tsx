"use client";

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
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

function SideBar() {
  const pathname = usePathname().split("/")[2];
  const router = useRouter();

  return (
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
          <MenuList>
            <MenuItem
              sx={{
                p: "12px 80px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: pathname === "orders" ? "#FF8100" : null,
                background: pathname === "orders" ? "#FCCC99" : null,
                borderRadius: "5px ",
                m: 1,
                ":hover": {
                  background: "#F5D7B8",
                },
              }}
              onClick={() => {
                router.replace("/dashboard/orders");
              }}
            >
              <ListItemText>
                <ShoppingCartIcon />
                &emsp; Orders
              </ListItemText>
            </MenuItem>
            <MenuItem
              sx={{
                p: "12px 80px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: pathname === "add-menu" ? "#FF8100" : null,
                background: pathname === "add-menu" ? "#FCCC99" : null,
                borderRadius: "5px ",
                m: 1,
                ":hover": {
                  background: "#F5D7B8",
                },
              }}
              onClick={() => {
                router.replace("/dashboard/add-menu");
              }}
            >
              <ListItemText>
                <LocalPizzaIcon />
                &emsp;Add Menu
              </ListItemText>
            </MenuItem>
            <MenuItem
              sx={{
                p: "12px 80px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: pathname === "roles" ? "#FF8100" : null,
                background: pathname === "roles" ? "#FCCC99" : null,
                borderRadius: "5px ",
                m: 1,
                ":hover": {
                  background: "#F5D7B8",
                },
              }}
              onClick={() => {
                router.replace("/dashboard/roles");
              }}
            >
              <ListItemText>
                <PersonIcon />
                &emsp;Role
              </ListItemText>
            </MenuItem>
            <MenuItem
              sx={{
                p: "12px 80px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: pathname === "users" ? "#FF8100" : null,
                background: pathname === "users" ? "#FCCC99" : null,
                borderRadius: "5px ",
                m: 1,
                ":hover": {
                  background: "#F5D7B8",
                },
              }}
              onClick={() => {
                router.replace("/dashboard/users");
              }}
            >
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
            onClick={() => {
              signOut({ redirectTo: "/" });
            }}
          >
            <LogoutIcon /> &ensp; Log Out
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default SideBar;
