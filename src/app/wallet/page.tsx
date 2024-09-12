// pages/wallet.tsx
"use client";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { addTransaction } from "@/lib/firebaseFunctions";

interface Transaction {
  amount: number;
  type: "credit" | "debit";
  timestamp: { toDate: () => Date };
}

const Wallet = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    const fetchTransactions = async () => {
      const querySnapshot = await getDocs(collection(db, "transactions"));
      const transactionsData = querySnapshot.docs.map(
        (doc) => doc.data() as Transaction,
      );
      setTransactions(transactionsData);

      const calculatedBalance = transactionsData.reduce((acc, transaction) => {
        return transaction.type === "credit"
          ? acc + transaction.amount
          : acc - transaction.amount;
      }, 0);
      setBalance(calculatedBalance);
    };

    fetchTransactions();
  }, []);

  const handleAddTransaction = (amount: number, type: "credit" | "debit") => {
    addTransaction(amount, type);
    setTransactions([
      ...transactions,
      { amount, type, timestamp: { toDate: () => new Date() } },
    ]);
    setBalance(type === "credit" ? balance + amount : balance - amount);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-50">
      <h1 className="text-3xl font-bold mb-4">My Wallet</h1>
      <div className="text-xl mb-4">Balance: ${balance}</div>

      <div className="mb-4">
        <input
          type="number"
          placeholder="Amount"
          className="border border-gray-300 p-2 rounded mr-2"
          id="amount"
        />
        <button
          onClick={() =>
            handleAddTransaction(
              Number(
                (document.getElementById("amount") as HTMLInputElement).value,
              ),
              "credit",
            )
          }
          className="bg-green-500 text-white p-2 rounded mr-2 hover:bg-green-600"
        >
          Add Credit
        </button>
        <button
          onClick={() =>
            handleAddTransaction(
              Number(
                (document.getElementById("amount") as HTMLInputElement).value,
              ),
              "debit",
            )
          }
          className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
        >
          Add Debit
        </button>
      </div>

      <ul className="w-full max-w-md">
        {transactions.map((transaction, index) => (
          <li key={index} className="bg-white p-4 mb-2 shadow rounded">
            {transaction.type === "credit" ? "Credit" : "Debit"}: $
            {transaction.amount} on{" "}
            {transaction.timestamp.toDate().toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Wallet;
