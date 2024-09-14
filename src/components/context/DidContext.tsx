/// context/DidContext.tsx

import React, { createContext, useContext, useState } from "react";
import { DidDht } from "@web5/dids";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import firebase from "firebase/app";
import { DidContextType } from "@/components/context/DidContesxtType";
import {
  fetchOfferings,
  requestCredentialFromIssuer,
  isMatchingOffering,
} from "@/lib/apiutils";
import { pfiAllowlist } from "@/lib/tbdex/allowedList";
import { VcDataModel } from "@web5/credentials";
import { Offering } from "@tbdex/http-client";

// Context Creation
const DidContext = createContext<DidContextType | undefined>(undefined);

// Context Provider Component
export const DidProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [did, setDid] = useState<string | null>(null);
  const [vc, setVc] = useState<Partial<VcDataModel> | null>(null);
  const [pfiofferings, setPfiofferings] = useState<Offering[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const db = getFirestore();

  const createDid = async (): Promise<string | null> => {
    try {
      setLoading(true);
      const didDht = await DidDht.create({ publish: true });
      const didString = didDht.uri;
      setDid(didString);
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
        setDid(userData.did);

        // Fetch credential and offerings if DID exists
        const credential = await requestCredentialFromIssuer(
          did!,
          user.Name,
          "Gh",
        );
        const vcData = credential;
        setVc(vcData);

        const offerings = await fetchOfferings(pfiAllowlist[0].pfiUri);
        if (isMatchingOffering(offerings[0], [credential])) {
          setPfiofferings(offerings);
        } else {
          setPfiofferings(null);
        }
      } else {
        // DID doesn't exist, so create and store it
        const newDid = await createDid();
        if (newDid) {
          await setDoc(userDocRef, {
            did: newDid,
            createdAt: new Date().toISOString(),
          });
        }
      }
    } catch (err) {
      setError("Error fetching data from Firebase.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DidContext.Provider
      value={{
        did,
        vc,
        pfiofferings,
        loading,
        error,
        setDid,
        fetchDataForUser,
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
