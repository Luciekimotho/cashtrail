import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./config";

export interface Transaction {
  id?: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  timestamp: Date;
  description?: string;
  message?: string;
}

const transactionsCollection = collection(db, "transactions");

export const addTransaction = async (transaction: Omit<Transaction, 'id' | 'timestamp'>) => {
  try {
    const docRef = await addDoc(transactionsCollection, {
      ...transaction,
      timestamp: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
    return null;
  }
};

export const updateTransaction = async (transaction: Transaction) => {
  try {
    const { id, ...data } = transaction;
    const transactionRef = doc(db, "transactions", id!);
    await updateDoc(transactionRef, data);
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};

export const deleteTransaction = async (id: string) => {
  try {
    await deleteDoc(doc(db, "transactions", id));
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
};

export const getTransactions = async (): Promise<Transaction[]> => {
  try {
    const querySnapshot = await getDocs(transactionsCollection);
    const transactions = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        timestamp: data.timestamp.toDate(),
      } as Transaction;
    });
    return transactions;
  } catch (error) {
    console.error("Error getting documents: ", error);
    return [];
  }
};