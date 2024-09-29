import { Add, FileUpload } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";

function AddMenu() {
  return (
    <>
      <Box>
        <Box>
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bolder",
              textAlign: "center",
              my: 3,
            }}
          >
            Add Menu
          </Typography>
          <TextField fullWidth placeholder="Menu Name" label="Name" />
        </Box>
        <Box>
          <Typography
            variant="h4"
            sx={{
              my: 2,
              fontWeight: "bolder",
            }}
          >
            Topping
          </Typography>
          <Box
            sx={{
              width: "80%",
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              my: 2,
            }}
          >
            <Box>
              <FormControlLabel control={<Checkbox />} label="Onion" />
            </Box>
            <Box>
              <FormControlLabel control={<Checkbox />} label="Onion" />
            </Box>
            <Box>
              <FormControlLabel control={<Checkbox />} label="Onion" />
            </Box>
            <Box>
              <FormControlLabel control={<Checkbox />} label="Onion" />
            </Box>
            <Box>
              <FormControlLabel control={<Checkbox />} label="Onion" />
            </Box>
            <Box>
              <FormControlLabel control={<Checkbox />} label="Onion" />
            </Box>
            <Box>
              <FormControlLabel control={<Checkbox />} label="Onion" />
            </Box>
            <Box>
              <FormControlLabel control={<Checkbox />} label="Onion" />
            </Box>
            <Box>
              <Button
                size="small"
                color="warning"
                variant="contained"
                disableElevation
              >
                <Add /> &nbsp; Add
              </Button>
            </Box>
          </Box>
        </Box>
        <Box my={2}>
          <TextField fullWidth placeholder="Price" label="Price" />
        </Box>
        <Box
          sx={{
            "& > *": { width: "50%", borderRadius: "10px" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            rowGap: 2,
          }}
        >
          <Button variant="outlined" color="warning" sx={{ py: 2 }}>
            <FileUpload />
            &ensp; Upload Logo
          </Button>

          <Button
            variant="contained"
            disableElevation
            color="warning"
            sx={{ py: 2 }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </>
  );
}
export default AddMenu;
