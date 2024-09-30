import AddMenu from '@/app/components/AddMenu';
import { Box } from '@mui/material';

function AddMenuPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <AddMenu />
    </Box>
  );
}

export default AddMenuPage;
