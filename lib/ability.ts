import { PureAbility, AbilityBuilder, InferSubjects } from '@casl/ability';

export type Actions = 'manage' | 'create' | 'read' | 'update' | 'delete';
export type Subjects = InferSubjects<
  'Order' | 'User' | 'Role' | 'Menu' | 'all'
>;
export type AppAbility = PureAbility<[Actions, Subjects]>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const lambdaMatcher = (matchConditions: any) => matchConditions;

export function defineAbilityFor(user): AppAbility {
  const { can, cannot, build } = new AbilityBuilder<
    PureAbility<[Actions, Subjects]>
  >(PureAbility);

  if (user?.role === 'superadmin') {
    can('manage', 'all');
  } else if (user?.role === 'manager') {
    can('manage', 'all');
    cannot('delete', 'all');
  } else {
    can('create', 'Order');
    can('read', 'Order', { id: user?.id });
    cannot('update', 'Order');
    cannot('delete', 'all');
  }

  return build({ conditionsMatcher: lambdaMatcher });
}

export const defaultAbility = new PureAbility();
