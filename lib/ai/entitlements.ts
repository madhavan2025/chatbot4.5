// REMOVE this ❌
// import type { UserType } from "../../app/(auth)/auth";

// ADD this ✅
export type UserType = "guest" | "regular";

type Entitlements = {
  maxMessagesPerDay: number;
};

export const entitlementsByUserType: Record<UserType, Entitlements> = {
  guest: {
    maxMessagesPerDay: 20,
  },

  regular: {
    maxMessagesPerDay: 50,
  },
};