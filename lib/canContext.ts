import { createContextualCan } from '@casl/react';
import { createContext } from 'react';
import { AppAbility, defaultAbility } from './ability';
import { AnyAbility } from '@casl/ability';

export const AbilityContext = createContext<AppAbility | AnyAbility>(
  defaultAbility
);

export const Can = createContextualCan(AbilityContext.Consumer);
