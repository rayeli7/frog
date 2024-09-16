/// context/DidContext.tsx

import React, { createContext, useContext, useState } from "react";
import { BearerDid, DidDht } from "@web5/dids";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import firebase from "firebase/app";
import { DidContextType } from "@/components/context/DidContesxtType";
import {
  fetchOfferings,
  requestCredentialFromIssuer,
  isMatchingOffering,
} from "@/lib/apiutils";
import { pfiAllowlist } from "@/lib/tbdex/allowedList";
import { PresentationExchange } from "@web5/credentials";
import { Offering } from "@tbdex/http-client";
import { createExchange } from "@/lib/tbdex/messageUtils";
import { useCallback } from "react";
import { Icons } from "../ui/icons";

// Context Creation
const DidContext = createContext<DidContextType | undefined>(undefined);

// Context Provider Component
export const DidProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userBearerDid, setUserBearerDid] = useState<BearerDid | null>(null);
  const [userVc, setUserVc] = useState<string | null>(null);
  const [pfiofferings, setPfiofferings] = useState<Offering[] | null>(null);
  const [selectedPfioffering, setselectedPfioffering] =
    useState<Offering | null>(null);
  const [exchangesUpdated, setExchangesUpdated] = useState<boolean>(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const db = getFirestore();

  const createDid = async (): Promise<BearerDid | null> => {
    setLoading(true);
    try {
      const didDht = await DidDht.create({ publish: true });
      setUserBearerDid(didDht);
      return didDht;
    } catch (err) {
      setError("Error creating DID. Please try again.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchDataForUser = async (user: firebase.User) => {
    try {
      setLoading(true);
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        setUserBearerDid(userData.did);

        // Fetch credential and offerings if DID exists
        const credential = await requestCredentialFromIssuer(
          userBearerDid!,
          user.displayName || user.email || user.uid,
          "Gh",
        );
        const vcData = credential;
        setUserVc(vcData);

        const offerings = await fetchOfferings(pfiAllowlist[0].pfiUri);

        for (const offering of offerings) {
          if (isMatchingOffering(offering, [credential])) {
            setselectedPfioffering(offering);
            break;
          }
        }
        if (!pfiofferings) {
          setPfiofferings(null);
        }
      } else {
        // DID doesn't exist, so create and store it
        const newDid: BearerDid | null = await createDid();
        setUserBearerDid(newDid);
        if (newDid) {
          await setDoc(userDocRef, {
            did: newDid,
            createdAt: new Date().toISOString(),
          });
        }

        const credential = await requestCredentialFromIssuer(
          userBearerDid!,
          user.displayName || user.email || user.uid,
          "Gh",
        );
        const vcData = credential;
        setUserVc(vcData);

        const offerings = await fetchOfferings(pfiAllowlist[0].pfiUri);

        for (const offering of offerings) {
          if (isMatchingOffering(offering, [credential])) {
            setselectedPfioffering(offering);
            break;
          }
        }
        if (!pfiofferings) {
          setPfiofferings(null);
        }
      }
    } catch (err) {
      setError("Error fetching data from Firebase.");
    } finally {
      setLoading(false);
    }
  };

  // Check if selectedPfioffering and userVc are available
  const selectedCredentials =
    userVc && selectedPfioffering
      ? PresentationExchange.selectCredentials({
          vcJwts: [userVc],
          presentationDefinition: JSON.parse(
            JSON.stringify(selectedPfioffering?.data?.requiredClaims || {}),
          ),
        })
      : null;

  const handleSubmitRfq = useCallback(
    async (payinAmount: string, paymentDetails: object) => {
      try {
        setLoading(true);
        console.log("Submitting RFQ with data:", {
          userBearerDid,
          userVc,
          selectedPfioffering,
          payinAmount,
          paymentDetails,
        });

        // Ensure required state is available before submitting
        if (!userBearerDid || !userVc || !selectedPfioffering) {
          throw new Error("Missing required data for submission");
        }

        // Submit RFQ
        const exchange = await createExchange({
          pfiUri: pfiAllowlist[0].pfiUri,
          offeringId: selectedPfioffering.id,
          payin: {
            amount: payinAmount,
            kind: selectedPfioffering.data.payin.methods[0].kind,
            paymentDetails: {},
          },
          payout: {
            kind: "USDC_WALLET_ADDRESS",
            paymentDetails: paymentDetails,
          },
          claims: selectedCredentials ?? [],
          didState: userBearerDid,
          offering: selectedPfioffering,
        });
        console.log("RFQ submission successful:", exchange);
        setExchangesUpdated(true);
      } catch (error) {
        console.error("Error handling payment:", error);
      } finally {
        setLoading(false);
      }
    },
    [userBearerDid, userVc, selectedPfioffering, selectedCredentials],
  );
  // Render loading or error state
  if (loading)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Icons.spinner className="mr-2 h-12 w-12 animate-spin" />
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <DidContext.Provider
      value={{
        fetchDataForUser,
        handleSubmitRfq,
        userBearerDid,
        loading,
        userVc,
        selectedPfioffering,
        exchangesUpdated,
        pfiofferings,
        error,
      }}
    >
      {children}
    </DidContext.Provider>
  );
};
// Hook to use the context
export const useDidContext = (): DidContextType => {
  const context = useContext(DidContext);
  if (!context) {
    throw new Error("useDidContext must be used within a DidProvider");
  }
  return context;
};
