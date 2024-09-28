import { Box, CircularProgress, Typography } from "@mui/material";

function Loading() {
  return (
    <>
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          rowGap: 4,
        }}
      >
        <CircularProgress color="warning" />
        <Typography variant="h6" color="warning">
          Just a moment while we slice and dice!
        </Typography>
      </Box>
    </>
  );
}

export default Loading;
