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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const db = getFirestore();

  const createDid = async (): Promise<string | null> => {
    try {
      setLoading(true);
      const didDht = await DidDht.create({ publish: true });
      const didString = didDht.uri;
      setUserBearerDid(didString);
      return didString;
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
        const newDid = await createDid();
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
        // Ensure required state is available before submitting
        if (!userBearerDid || !userVc || !selectedPfioffering) {
          throw new Error("Missing required data for submission");
        }

        // Submit RFQ
        await createExchange({
          pfiUri: pfiAllowlist[0].pfiUri,
          offeringId: selectedPfioffering.id,
          payin: {
            amount: payinAmount,
            kind: selectedPfioffering.data.payin.methods[0].kind,
            paymentDetails: {},
          },
          payout: {
            kind: selectedPfioffering.data.payin.methods[0].kind,
            paymentDetails: paymentDetails,
          },
          claims: selectedCredentials ?? [],
          didState: userBearerDid,
          offering: selectedPfioffering,
        });
        setExchangesUpdated(true);
      } catch (error) {
        console.error("Error handling payment:", error);
      }
    },
    [userBearerDid, userVc, selectedPfioffering, selectedCredentials],
  );

  // Render loading or error state
  if (loading) return <div>Loading...</div>;
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
