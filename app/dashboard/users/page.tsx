"use client";

import DataTable from "@/app/components/DataTable";
import { Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Slide,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { Form, Formik } from "formik";
import { forwardRef, useEffect, useMemo, useState } from "react";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function OrderListPage() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await fetch("/api/users");

      if (users) {
        const users = await data.json();
        setUsers(users);
      }
      setIsLoading(false);
    })();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        Cell: ({ renderedCellValue }) => <span>{renderedCellValue}</span>,
      },
      {
        accessorKey: "phone_number",
        header: "Phone No.",
        Cell: ({ renderedCellValue }) => <span>{renderedCellValue}</span>,
      },
      {
        accessorKey: "email",
        header: "Email",
        Cell: ({ renderedCellValue }) => <span>{renderedCellValue}</span>,
      },
      {
        accessorKey: "actions",
        header: "Actions",

        Cell: ({ renderedCellValue }) => (
          <Box sx={{ display: "flex", columnGap: 2 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                columnGap: 2,
                background: "#E6F3E7",
                width: "fit-content",
                p: "7px 40px",
                borderRadius: "20px",
              }}
            >
              <Typography color="success">Active</Typography>
              <Switch color="success" size="small" />
            </Box>
            <Box>
              <IconButton color="error" size="large">
                <Delete />
              </IconButton>
            </Box>
          </Box>
        ),
      },
    ],
    []
  );

  return (
    <Box>
      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => {
          setOpenDialog(false);
        }}
        PaperProps={{
          sx: { borderRadius: "20px" },
        }}
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            fontSize: "30px",
            fontWeight: "bolder",
          }}
        >
          Add new user
        </DialogTitle>
        <DialogContent sx={{ width: "30vw" }}>
          <Box>
            <Formik initialValues={{}} onSubmit={() => {}}>
              {({ handleBlur, handleChange, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      rowGap: 2,
                    }}
                  >
                    <TextField
                      name="name"
                      label="Name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                    />
                    <TextField
                      name="email"
                      label="Email Address"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                    />
                    <TextField
                      name="location"
                      label="Location"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                    />
                    <TextField
                      name="phone_number"
                      label="Phone Number"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      my: 2,
                      gap: 4,
                    }}
                  >
                    <Box width="50%">
                      <FormControl fullWidth>
                        <InputLabel id="role-sss">Select Role</InputLabel>
                        <Select
                          labelId="role-sss"
                          id="role"
                          value={10}
                          label="Select Role"
                          //   onChange={handleChange}
                        >
                          <MenuItem value={10} sx={{ color: "#FFA500" }}>
                            Preparing
                          </MenuItem>
                          <MenuItem value={20} sx={{ color: "green" }}>
                            Ready
                          </MenuItem>
                          <MenuItem value={30} sx={{ color: "green" }}>
                            Delivered
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                    <Box width="50%">
                      <Button
                        variant="contained"
                        disableElevation
                        color="warning"
                        fullWidth
                        size="large"
                        sx={{ py: 2 }}
                      >
                        Add
                      </Button>
                    </Box>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
        </DialogContent>
      </Dialog>
      <DataTable
        data={users}
        columns={columns}
        isLoading={isLoading}
        topToolbarAction={
          <Button
            variant="contained"
            color="warning"
            disableElevation
            sx={{ p: "10px 50px" }}
            onClick={() => {
              setOpenDialog(true);
            }}
          >
            Add User
          </Button>
        }
      />
    </Box>
  );
}

export default OrderListPage;
