import { Box } from "@mui/material";
import Pizzas from "../components/Pizzas";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";

function OrderHistory() {
  return (
    <Box>
      <NavigationBar />
      <Pizzas title="Order History" action="status" />
      <Footer />
    </Box>
  );
}

export default OrderHistory;
