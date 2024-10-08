/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import DataTable from "@/app/components/DataTable";
import { Can } from "@/lib/canContext";
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
import { useSession } from "next-auth/react";
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
  const [roles, setRoles] = useState<{ name: string; id: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);

  const session = useSession();

  useEffect(() => {
    (async () => {
      const userData = await fetch(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        `/api/users?filter=${(session.data?.user as any)?.resturant.id}&search=`
      );
      const roleData = await fetch(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        `/api/roles?filter=${(session.data?.user as any)?.resturant.id}&search=`
      );

      const roles = await roleData.json();

      if (roles) {
        const stracturedRoles = roles.map((role) => {
          return { id: role.id, name: role.name };
        });
        setRoles(stracturedRoles);
      }
      if (users) {
        const users = await userData.json();
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
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "status",
        header: "Actions",

        Cell: ({ row, renderedCellValue }) => {
          return (
            <Box sx={{ display: "flex", columnGap: 2 }}>
              <Can I="update" a="User">
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    columnGap: 2,
                    background: `${renderedCellValue ? "#E6F3E7" : "#FFE6E6"}`,
                    width: "fit-content",
                    p: "0 40px",
                    borderRadius: "20px",
                  }}
                >
                  <Typography color={renderedCellValue ? "success" : "error"}>
                    {renderedCellValue ? "Active" : "Inactive"}
                  </Typography>
                  <Switch
                    color={renderedCellValue ? "success" : "error"}
                    size="small"
                    checked={renderedCellValue}
                    onChange={async (event, value) => {
                      await fetch("/api/users", {
                        method: "POST",
                        body: JSON.stringify({
                          email: row.original.email,
                          status: value,
                        }),
                      });
                    }}
                  />
                </Box>
              </Can>
              <Can not I="update" a="User">
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
                  <Switch color="success" size="small" disabled />
                </Box>
              </Can>
              <Can I="delete" a="User">
                <Box>
                  <IconButton color="error" size="large">
                    <Delete />
                  </IconButton>
                </Box>
              </Can>
            </Box>
          );
        },
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
            <Formik
              initialValues={{
                name: "",
                email: "",
                location: "",
                phone_number: "",
                role: "",
              }}
              onSubmit={async (values) => {
                const payload = {
                  ...values,
                  role: { connect: { id: values.role } },
                  password: "12345678",
                  resturant: {
                    connect: { id: (session.data?.user as any)?.resturant.id },
                  },
                  type: "RESTURANT",
                  aggrement: true,
                };

                console.log(payload);
                await fetch("/api/register", {
                  method: "POST",
                  body: JSON.stringify(payload),
                });
              }}
            >
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
                        <InputLabel id="user-role">Select Role</InputLabel>
                        <Select
                          labelId="ruser-role"
                          name="role"
                          label="Select Role"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        >
                          {roles.map((role, index) => (
                            <MenuItem key={index} value={role.id}>
                              {role.name}
                            </MenuItem>
                          ))}
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
                        type="submit"
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
        path="users"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        filter={(session.data?.user as any)?.resturant.id}
        topToolbarAction={
          <Box>
            <Can I="create" a="User">
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
            </Can>
            <Can not I="create" a="User">
              <Button
                variant="contained"
                color="warning"
                disableElevation
                sx={{ p: "10px 50px" }}
                onClick={() => {
                  setOpenDialog(true);
                }}
                disabled={true}
              >
                Add User
              </Button>
            </Can>
          </Box>
        }
      />
    </Box>
  );
}

export default OrderListPage;
