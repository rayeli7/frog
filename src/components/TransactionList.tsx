// components/TransactionList.tsx
import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const TransactionList = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const userId = 'user-id'; // Replace with current user's ID

  useEffect(() => {
    const q = query(collection(db, 'transactions'), where('userId', '==', userId));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTransactions(data);
    });

    return () => unsubscribe();
  }, [userId]);

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Transactions</h2>
      <ul>
        {transactions.map(transaction => (
          <li key={transaction.id} className="mb-2">
            {transaction.type} - ${transaction.amount} - {transaction.timestamp}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
