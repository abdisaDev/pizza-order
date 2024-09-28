import { Box } from "@mui/material";
import SideBar from "../components/SideBar";
import AppBar from "../components/AppBar";

function DashboardPage() {
  return (
    <>
      <Box>
        <Box sx={{ display: "flex" }}>
          <SideBar />
          <AppBar />
        </Box>
      </Box>
    </>
  );
}

export default DashboardPage;
