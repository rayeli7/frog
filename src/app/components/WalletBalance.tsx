// components/WalletBalance.tsx
import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db as firestore } from "../../firebaseConfig";

const WalletBalance = () => {
  const [balance, setBalance] = useState<number>(0);
  const userId = "user-id"; // Replace with current user's ID

  useEffect(() => {
    const q = query(
      collection(firestore, "transactions"),
      where("userId", "==", userId),
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const transactions = snapshot.docs.map((doc) => doc.data());
      const newBalance = transactions.reduce((total, transaction: any) => {
        return transaction.type === "credit"
          ? total + transaction.amount
          : total - transaction.amount;
      }, 0);
      setBalance(newBalance);
    });

    return () => unsubscribe();
  }, [userId]);

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Wallet Balance</h2>
      <p className="text-2xl">${balance.toFixed(2)}</p>
    </div>
  );
};

export default WalletBalance;
