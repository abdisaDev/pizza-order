'use client';

import { Box } from '@mui/material';
import SideBar from '../components/SideBar';
import AppBar from '../components/AppBar';
import { AppAbility, defaultAbility, defineAbilityFor } from '@/lib/ability';
import { createContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { createContextualCan } from '@casl/react';
import { AnyAbility } from '@casl/ability';

const AbilityContext = createContext<AppAbility | AnyAbility>(defaultAbility);

export const Can = createContextualCan(AbilityContext.Consumer);

function DashBoardLayout({ children }: { children: React.ReactNode }) {
  const [ability, setAbility] = useState<AppAbility | AnyAbility>(
    defaultAbility
  );
  const session = useSession();

  useEffect(() => {
    (async () => {
      const userSession = session.data?.user;
      const user = { ...userSession, role: userSession?.role?.name };

      const ability = defineAbilityFor(user);
      setAbility(ability);
    })();
  }, [session]);

  return (
    <AbilityContext.Provider value={ability}>
      <Box sx={{ display: 'flex' }}>
        <Box>
          <SideBar />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '-webkit-fill-available',
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
