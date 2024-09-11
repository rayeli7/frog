// lib/firebaseFunctions.ts
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

interface Transaction {
  amount: number;
  type: 'credit' | 'debit';
  timestamp: Date;
}

export const addTransaction = async (amount: number, type: 'credit' | 'debit') => {
  try {
    const transaction: Transaction = {
      amount,
      type,
      timestamp: new Date(),
    };
    await addDoc(collection(db, 'transactions'), transaction);
  } catch (error) {
    console.error('Error adding transaction:', error);
  }
};
