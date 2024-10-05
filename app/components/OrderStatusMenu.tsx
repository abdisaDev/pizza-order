import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import { Box, Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";

enum StatusValue {
  PREPARING = "PREPARING",
  READY = "READY",
  DELIVERED = "DELIVERED",
}

function OrderStatusMenu(props: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  order: any;
  status: StatusValue;
}) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleOrderStausChange = async (status: StatusValue) => {
    await fetch("/api/orders", {
      method: "POST",
      cache: "no-store",
      body: JSON.stringify({
        id: props.order.id,
        status,
      }),
    });
    setAnchorEl(null);
  };
  const handleStatusButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <Box>
      <Button
        id="status-button"
        onClick={handleStatusButton}
        endIcon={open ? <ArrowDropUp /> : <ArrowDropDown />}
        variant="contained"
        disableElevation
        color={props.status === StatusValue.PREPARING ? "warning" : "success"}
      >
        {props.status}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => {
          setAnchorEl(null);
        }}
      >
        <MenuItem
          onClick={() => {
            handleOrderStausChange(StatusValue.PREPARING);
          }}
        >
          Preparing
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleOrderStausChange(StatusValue.READY);
          }}
        >
          Ready
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleOrderStausChange(StatusValue.DELIVERED);
          }}
        >
          Delivered
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default OrderStatusMenu;
