import { Box } from "@mui/material";

function DashBoardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Box sx={{ background: "#eee", width: "100vw", height: "100vh" }}>
        {children}
      </Box>
    </>
  );
}
export default DashBoardLayout;
