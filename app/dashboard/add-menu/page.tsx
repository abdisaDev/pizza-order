"use client";

import AddMenu from "@/app/components/AddMenu";
import { defineAbilityFor } from "@/lib/ability";
import { Box } from "@mui/material";
import { useSession } from "next-auth/react";

function AddMenuPage() {
  const { data: session } = useSession();
  console.log(session);

  const ability = defineAbilityFor(session?.user);
  console.log(ability);
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <AddMenu />
    </Box>
  );
}

export default AddMenuPage;
