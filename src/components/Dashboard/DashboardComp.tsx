/**
 * This code was generated by Builder.io.
 */
"use client";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { addTransaction } from "@/lib/firebaseFunctions";

import React from "react";
import TransactionRow from "./TransactionRow";
import { DrawerDialogTopUp } from "./Drawercomp";
import { GiReceiveMoney, GiPayMoney } from "react-icons/gi";
import { GrCurrency } from "react-icons/gr";
import { DrawerDialogDebit } from "./DrawercompDebit";

interface Transaction {
  description: string;
  transactionId: string;
  type: "credit" | "debit";
  amount: number;
  timestamp: { toDate: () => Date };
}

const Dashboardcomponent: React.FC = () => {
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
    addTransaction(amount, type, "credit");
    setTransactions([
      ...transactions,
      {
        amount,
        type,
        timestamp: { toDate: () => new Date() },
        description: "",
        transactionId: "",
      },
    ]);
    setBalance(type === "credit" ? balance + amount : balance - amount);
  };

  return (
    <main className="flex flex-col">
      <section className="self-center w-full max-w-[825px] max-md:max-w-full">
        <div className="grid grid-cols-3 gap-5 max-md:grid-cols-1">
          <div className="flex flex-col rounded-3xl p-6 bg-white shadow-lg">
            {/* Balance Card */}
            <div className="flex items-center gap-4">
              <GrCurrency size={50} />
              <div className="flex flex-col">
                <div className="text-base text-slate-400">Wallet Balance</div>
                <div className="mt-2 text-2xl font-semibold text-neutral-800">
                  USDC: {balance}
                </div>
              </div>
            </div>
          </div>

          {/* Total Income Card */}
          <div className="flex flex-col rounded-3xl p-6 bg-white shadow-lg">
            <div className="flex items-center gap-4">
              <GiReceiveMoney size={50} />
              <div className="flex flex-col">
                <div className="text-base text-slate-400">Total Income</div>
                <div className="mt-2 text-2xl font-semibold text-neutral-800">
                  {/* Display the balance here */}
                  0.00
                </div>
              </div>
              <div className="ml-auto">
                <DrawerDialogTopUp />
              </div>
            </div>
          </div>

          {/* Total Expense Card */}
          <div className="flex flex-col rounded-3xl p-6 bg-white shadow-lg">
            <div className="flex items-center gap-4">
              <GiPayMoney size={50} />
              <div className="flex flex-col">
                <div className="text-base text-slate-400">Total Expenses</div>
                <div className="mt-2 text-2xl font-semibold text-neutral-800">
                  0.00
                </div>
              </div>
              <div className="ml-auto">
                <DrawerDialogDebit />
              </div>
            </div>
          </div>
        </div>
      </section>
      <h2 className="self-start mt-24 text-2xl font-semibold text-slate-700 max-md:mt-10">
        Recent Transactions
      </h2>
      <nav className="flex mt-7 text-base font-medium">
        <div className="flex flex-col text-blue-700">
          <div className="mx-3 max-md:mx-2.5">All Transactions</div>
          <div className="flex shrink-0 mt-2 bg-blue-700 rounded-xl h-[3px]" />
        </div>
        <div className="flex flex-col grow shrink-0 whitespace-nowrap basis-0 text-slate-400 w-fit max-md:max-w-full">
          <div className="flex gap-5 justify-between ml-56 max-w-full w-[205px] max-md:ml-2.5">
            <div>Income</div>
            <div>Expense</div>
          </div>
          <div className="flex mt-2.5 w-full bg-gray-100 min-h-[1px] max-md:max-w-full" />
        </div>
      </nav>
      <section className="flex flex-col px-8 py-7 mt-6 w-full text-base bg-white rounded-3xl shadow-lg text-neutral-800 max-md:px-5 max-md:max-w-full">
        <div className="flex gap-10 w-full font-medium max-w-[1010px] text-slate-400 max-md:max-w-full">
          <div className="grow">Description</div>
          <div className="flex gap-10">
            <div>Transaction ID</div>
            <div>Type</div>
          </div>
          <div>Card</div>
          <div>Date</div>
          <div className="flex gap-10 whitespace-nowrap">
            <div>Amount</div>
            <div>Receipt</div>
          </div>
        </div>
        <div className="flex shrink-0 mt-3 h-px bg-slate-200 max-md:max-w-full" />
        {transactions.map((transaction, index) => (
          <React.Fragment key={index}>
            <TransactionRow
              description={transaction.description}
              amount={transaction.amount}
              type={transaction.type}
              transactionId={transaction.transactionId}
              timestamp={transaction.timestamp.toDate().toLocaleString()}
              amountColor={transaction.type === "credit" ? "green" : "red"}
            />
            {index < transactions.length - 1 && (
              <div className="flex shrink-0 mt-4 h-px bg-gray-100 max-md:max-w-full" />
            )}
          </React.Fragment>
        ))}
      </section>
    </main>
  );
};

export default Dashboardcomponent;
