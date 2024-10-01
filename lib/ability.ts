import {
  PureAbility,
  AbilityBuilder,
  InferSubjects,
  MatchConditions,
} from "@casl/ability";

export type Actions = "manage" | "create" | "read" | "update" | "delete";
export type Subjects = InferSubjects<
  "Order" | "User" | "Role" | "Menu" | "all"
>;
export type AppAbility = PureAbility<[Actions, Subjects]>;

const lambdaMatcher = (matchConditions: MatchConditions) => matchConditions;

export function defineAbilityFor(user?): AppAbility {
  const { can, cannot, build } = new AbilityBuilder<
    PureAbility<[Actions, Subjects]>
  >(PureAbility);

  if (user?.role === "superadmin") {
    can("manage", "all");
  } else if (user?.role === "manager") {
    can("create", "Menu");
    can("read", "Menu");
    can("update", "Order");
    can("create", "User");
    cannot("delete", "all");
  } else {
    can("create", "Order");
    can("read", "Order", { id: user?.id });
    cannot("update", "Order");
  }

  return build({ conditionsMatcher: lambdaMatcher });
}
