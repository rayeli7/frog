// lib/firebaseFunctions.ts
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

interface Transaction {
  id: string; // Firebase generated document ID
  userId: string; // Current user's ID (replace with actual user ID)
  accountBalance: number;
  amount: number;
  type: "credit" | "debit";
  timestamp: Date;
  orderStatus: string;
}

export const addTransaction = async (
  amount: number,
  type: "credit" | "debit",
) => {
  try {
    const transaction: Transaction = {
      amount,
      type,
      timestamp: new Date(),
      id: "",
      userId: "",
      accountBalance: 0,
      orderStatus: "",
    };
    await addDoc(collection(db, "transactions"), transaction);
  } catch (error) {
    console.error("Error adding transaction:", error);
  }
};
