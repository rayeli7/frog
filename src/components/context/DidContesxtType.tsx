import { Offering } from "@tbdex/http-client";
import { VcDataModel } from "@web5/credentials";

// types/DidContextType.ts
export type DidContextType = {
  did: string | null;
  vc: Partial<VcDataModel> | null;
  pfiofferings: Offering[] | null;
  loading: boolean;
  error: string | null;
  setDid: (did: string | null) => void;
  fetchDataForUser: (user: firebase.User) => Promise<void>;
};
