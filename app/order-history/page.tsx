import { Box } from "@mui/material";
import Pizzas from "../components/Pizzas";
import NavigationBar from "../components/NavigationBar";

function OrderHistory() {
  return (
    <>
      <Box>
        <NavigationBar />
        <Pizzas title="Order History" action="status" actionValue="Ordered" />
      </Box>
    </>
  );
}

export default OrderHistory;
