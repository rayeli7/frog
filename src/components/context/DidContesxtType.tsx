import { Offering } from "@tbdex/http-client";
import { BearerDid } from "@web5/dids";

// types/DidContextType.ts
export type DidContextType = {
  userBearerDid: BearerDid | null;
  userVc: string | null;
  selectedPfioffering: Offering | null;
  loading: boolean;
  error: string | null;
  exchangesUpdated: boolean;
  pfiofferings: Offering[] | null;
  fetchDataForUser: (user: firebase.User) => Promise<void>;
  handleSubmitRfq: (payinAmount: string, paymentDetails: object) => void;
};
