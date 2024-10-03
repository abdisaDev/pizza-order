"use client";

import { Box } from "@mui/material";
import SideBar from "../components/SideBar";
import AppBar from "../components/AppBar";
import { AppAbility, defaultAbility, defineAbilityFor } from "@/lib/ability";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { AnyAbility } from "@casl/ability";
import { AbilityContext } from "@/lib/canContext";

function DashBoardLayout({ children }: { children: React.ReactNode }) {
  const [ability, setAbility] = useState<AppAbility | AnyAbility>(
    defaultAbility
  );
  const session = useSession();

  useEffect(() => {
    (async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const userSession = session.data?.user as any;
      const user = { ...userSession, role: userSession?.role.name };

      const ability = defineAbilityFor(user);
      setAbility(ability);
    })();
  }, [session]);

  return (
    <AbilityContext.Provider value={ability}>
      <Box sx={{ display: "flex" }}>
        <Box>
          <SideBar />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "-webkit-fill-available",
          }}
        >
          <AppBar />
          <Box>{children}</Box>
        </Box>
      </Box>
    </AbilityContext.Provider>
  );
}
export default DashBoardLayout;
