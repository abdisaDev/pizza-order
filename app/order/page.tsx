import { Box } from "@mui/material";
import Pizzas from "../components/Pizzas";

function Order() {
  return (
    <>
      <Box>
        <Pizzas title="Order History" action="status" actionValue="Ordered" />
      </Box>
    </>
  );
}

export default Order;
