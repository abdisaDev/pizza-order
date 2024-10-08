/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Add, FileUpload } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { useEffect, useState } from "react";
const initalMenuDetailValue = {
  name: "",
  price: "",
  toppings: [],
};
function AddMenu() {
  const [newTopping, setNewTopping] = useState({
    show: false,
    element: <></>,
    names: [
      { name: "Tomato", isChecked: false },
      { name: "Mozzarella", isChecked: false },
      { name: "Basil", isChecked: false },
      { name: "Pepperoni", isChecked: false },
      { name: "Bell Peppers", isChecked: false },
      { name: "Onions", isChecked: false },
      { name: "Olives", isChecked: false },
    ],
  });
  const [menuDetail, setMenuDetail] = useState(initalMenuDetailValue);
  const [addMenuStatus, setAddMenuStatus] = useState(false);
  const session = useSession();
  const router = useRouter();
  useEffect(() => {
    setMenuDetail((prev: any) => {
      const checkedToppings = newTopping.names.filter(
        (topping) => topping.isChecked
      );
      return {
        ...prev,
        toppings: checkedToppings,
      };
    });
  }, [newTopping]);

  return (
    <Box sx={{ width: "50%" }}>
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
        <TextField
          fullWidth
          placeholder="Menu Name"
          label="Name"
          onChange={(event) => {
            setMenuDetail((prev) => {
              return { ...prev, name: event.target.value };
            });
          }}
        />
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
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            my: 2,
          }}
        >
          {newTopping.names.map(
            (topping: { name: string; isChecked: boolean }, index) => (
              <Box key={index}>
                <FormControlLabel
                  control={<Checkbox />}
                  label={topping.name}
                  checked={topping.isChecked}
                  onChange={(event) => {
                    setNewTopping((prev) => {
                      const checkedToppings = prev.names.map(
                        (data, innderIndex) => {
                          return {
                            ...data,
                            isChecked:
                              innderIndex === index
                                ? (event.target as any).checked
                                : data.isChecked,
                          };
                        }
                      );

                      return { ...prev, names: checkedToppings };
                    });
                  }}
                />
              </Box>
            )
          )}
          <Box>
            {newTopping.show && (
              <Box sx={{ display: "flex", alignItems: "center", px: 2 }}>
                <Box>{newTopping.element}</Box>
              </Box>
            )}
          </Box>
          <Box>
            <Button
              size="small"
              color="warning"
              variant="contained"
              disableElevation
              onClick={() => {
                setNewTopping((prev) => {
                  return {
                    names: [...prev.names],
                    show: true,
                    element: (
                      <Box>
                        <TextField
                          size="small"
                          label="Topping Name"
                          placeholder="Topping Name"
                          onBlur={(event) => {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            setNewTopping((prev: any) => {
                              return {
                                ...prev,
                                show: false,
                                names: [
                                  ...prev.names,
                                  {
                                    name: event.target.value,
                                    isChecked: false,
                                  },
                                ],
                              };
                            });
                          }}
                        />
                      </Box>
                    ),
                  };
                });
              }}
            >
              <Add /> &nbsp; Add
            </Button>
          </Box>
        </Box>
      </Box>
      <Box my={2}>
        <TextField
          fullWidth
          placeholder="Price"
          label="Price"
          type="number"
          onChange={(event) => {
            setMenuDetail((prev) => {
              return { ...prev, price: event.target.value };
            });
          }}
        />
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
          onClick={async () => {
            setAddMenuStatus(true);
            await fetch("/api/add-menu", {
              method: "POST",
              body: JSON.stringify({
                ...menuDetail,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                resturant_id: (session.data?.user as any)?.resturant.id,
              }),
            });
            setAddMenuStatus(false);
            router.refresh();
          }}
          disabled={addMenuStatus}
        >
          {addMenuStatus ? "Adding Menu . . ." : "Submit"}
        </Button>
      </Box>
    </Box>
  );
}
export default AddMenu;
