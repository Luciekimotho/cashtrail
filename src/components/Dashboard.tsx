import { useEffect, useState } from "react";
import {
  makeStyles,
  shorthands,
  Divider,
  Spinner,
  Text,
} from "@fluentui/react-components";
import { ManualForm } from "./ManualForm";
import { MessageForm } from "./MessageForm";
import { TransactionList } from "./TransactionList";
import { TransactionSummary } from "./TransactionSummary";
import { getTransactions, type Transaction } from "../firebase/firestore";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    ...shorthands.gap("1rem"),
    ...shorthands.padding("2rem"),
  },
});

export const Dashboard = () => {
  const styles = useStyles();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const transactions = await getTransactions();
      setTransactions(transactions);
    } catch (err) {
      setError("Failed to fetch transactions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  if (loading) {
    return <Spinner label="Loading transactions..." />;
  }

  if (error) {
    return <Text weight="bold" as="h2">{error}</Text>;
  }

  const currentMonthTransactions = transactions.filter((t) => {
    const date = new Date(t.timestamp);
    const today = new Date();
    return (
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  });

  return (
    <main className={styles.root}>
      <Text as="h2">
        Activity for{" "}
        {new Date().toLocaleString("default", { month: "long" })}
      </Text>
      <TransactionSummary transactions={currentMonthTransactions} />
      <Text as="h3" style={{ textAlign: "center" }}>
        Ready to add a new transaction? Let's go!
      </Text>
      <div style={{ display: 'flex', gap: '2rem' }}>
        <ManualForm onTransactionAdded={fetchTransactions} />
        <Divider vertical />
        <MessageForm onTransactionAdded={fetchTransactions} />
      </div>
      <Text as="h3">Here's what's happened so far this month:</Text>
      <TransactionList
        transactions={currentMonthTransactions}
        onTransactionUpdate={fetchTransactions}
      />
    </main>
  );
};