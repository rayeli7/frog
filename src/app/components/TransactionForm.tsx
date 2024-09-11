// components/TransactionForm.tsx
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const TransactionForm = () => {
  const [amount, setAmount] = useState<number>(0);
  const [type, setType] = useState<"credit" | "debit">("credit");
  const [timestamp, setTimestamp] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userId = "user-id"; // Replace with current user's ID

    try {
      await addDoc(collection(db, "transactions"), {
        amount,
        type,
        timestamp,
        userId,
      });
      alert("Transaction added successfully!");
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow">
      <label className="block mb-2">
        Amount:
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          className="border p-2 rounded w-full"
        />
      </label>
      <label className="block mb-2">
        Type:
        <select
          value={type}
          onChange={(e) => setType(e.target.value as "credit" | "debit")}
          className="border p-2 rounded w-full"
        >
          <option value="credit">Credit</option>
          <option value="debit">Debit</option>
        </select>
      </label>
      <label className="block mb-2">
        Timestamp:
        <input
          type="datetime-local"
          value={timestamp}
          onChange={(e) => setTimestamp(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </label>
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Add Transaction
      </button>
    </form>
  );
};

export default TransactionForm;
