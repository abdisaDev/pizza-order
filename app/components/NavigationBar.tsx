"use client";

import Image from "next/image";
import Logo from "@/app/assets/logo.svg";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { getSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

function NavigationBar() {
  const url = usePathname();
  const router = useRouter();
  const [isUserAuthenticated, setIsUserAuthenticated] = useState({
    status: false,
    detail: undefined,
  });
  console.log(isUserAuthenticated);
  useEffect(() => {
    (async () => {
      const session = await getSession();
      setIsUserAuthenticated({
        status: Boolean(session),
        detail: session?.user,
      });
    })();
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        m: "20px",
        mb: "60px",
      }}
    >
      <Box sx={{ width: "25%" }}>
        <Link href="/">
          <Image src={Logo} alt="pizza-logo" priority={true} />
        </Link>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          width: "60%",
          "& > *": {
            fontSize: "20px",
            fontWeight: "bold",
          },
        }}
      >
        <Link href="/">
          <Typography
            variant="h5"
            fontWeight="bolder"
            color={url === "/" ? "warning" : ""}
          >
            Home
          </Typography>
        </Link>
        <Link href="/order">
          <Typography
            variant="h5"
            fontWeight="bolder"
            color={url === "/order" ? "warning" : ""}
          >
            Order
          </Typography>
        </Link>
        <Link href="#">Who are we</Link>
      </Box>
      <Box sx={{ width: "30%", display: "flex", justifyContent: "right" }}>
        {!isUserAuthenticated.status ? (
          <Button
            variant="contained"
            color="warning"
            disableElevation
            onClick={() => {
              router.push("/auth/register");
            }}
          >
            Register
          </Button>
        ) : isUserAuthenticated.detail?.type === "RESTURANT" ? (
          <Button
            variant="contained"
            color="warning"
            disableElevation
            onClick={() => {
              router.push("/dashboard/orders");
            }}
          >
            Dashboard
          </Button>
        ) : (
          <Button
            variant="contained"
            color="warning"
            disableElevation
            onClick={() => {
              signOut({ redirectTo: "/" });
            }}
          >
            Logout
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default NavigationBar;
