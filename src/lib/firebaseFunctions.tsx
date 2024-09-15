// lib/firebaseFunctions.ts

import { db, auth } from "../firebaseConfig";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";

const user = auth.currentUser;

interface Transaction {
  id: string; // Firebase generated document ID
  userId: string; // Current user's ID (replace with actual user ID)
  amount: number;
  type: "credit" | "debit";
  timestamp: Date;
  orderStatus: string;
  vendor: string;
}

export const addTransaction = async (
  amount: number,
  type: "credit" | "debit",
  vendor: string,
) => {
  try {
    const transaction: Transaction = {
      amount,
      type,
      timestamp: new Date(),
      userId: user!.uid,
      orderStatus: "Succesful",
      vendor: vendor,
      id: "",
    };
    await addDoc(collection(db, "transactions"), transaction);
  } catch (error) {
    const errorAsError = error as Error;
    throw new Error("Error fetching transactions: " + errorAsError.message);
  }
};

export const getUserTransactions = async (userId: string) => {
  const transactionsRef = collection(db, "transactions");
  const q = query(transactionsRef, where("userId", "==", userId));

  try {
    const querySnapshot = await getDocs(q);
    const transactions = querySnapshot.docs.map(
      (doc) => doc.data() as Transaction,
    );
    return transactions;
  } catch (error) {
    const errorAsError = error as Error;
    throw new Error("Error fetching transactions: " + errorAsError.message);
  }
};

import { updateDoc } from "firebase/firestore";

export const updateTransaction = async (
  transactionId: string,
  updatedData: Partial<Transaction>,
) => {
  const transactionRef = doc(db, "transactions", transactionId);
  const transactionSnapshot = await getDoc(transactionRef);

  if (!transactionSnapshot.exists()) {
    throw new Error("Transaction not found!");
  }

  try {
    await updateDoc(transactionRef, updatedData);
    console.log("Transaction updated successfully");
  } catch (error) {
    throw new Error("Error updating transaction: " + error.message);
  }
};
