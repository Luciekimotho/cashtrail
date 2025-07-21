import { useState, useEffect } from "react";
import { Text, Button } from "@fluentui/react-components";
import { ChevronLeft24Filled, ChevronRight24Filled } from "@fluentui/react-icons";
import { MonthSelector } from "../components/MonthSelector";
import { TransactionList } from "../components/TransactionList";
import { TransactionSummary } from "../components/TransactionSummary";
import { CategoryPieChart } from "../components/CategoryPieChart";
import { getTransactions, type Transaction } from "../firebase/firestore";

export const Reports = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  const fetchTransactions = async () => {
    const transactions = await getTransactions();
    setTransactions(transactions);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    const filtered = transactions.filter((t) => {
      const date = new Date(t.timestamp);
      return (
        date.getMonth() === currentDate.getMonth() &&
        date.getFullYear() === currentDate.getFullYear()
      );
    });
    setFilteredTransactions(filtered);
  }, [currentDate, transactions]);

  const handleMonthChange = (month: number, year: number) => {
    setCurrentDate(new Date(year, month, 1));
  };

  const handlePreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  return (
    <div style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Text as="h1">Monthly Reports</Text>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <Button
          icon={<ChevronLeft24Filled />}
          onClick={handlePreviousMonth}
          appearance="transparent"
        />
        <Text as="h2">
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </Text>
        <Button
          icon={<ChevronRight24Filled />}
          onClick={handleNextMonth}
          appearance="transparent"
        />
        <MonthSelector
          onMonthChange={handleMonthChange}
          currentDate={currentDate}
        />
      </div>
      <TransactionSummary transactions={filteredTransactions} />
      <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}>
        <div style={{ flex: 1 }}>
          <CategoryPieChart
            transactions={filteredTransactions}
            type="expense"
            title="Expenses"
          />
        </div>
        <div style={{ flex: 1 }}>
          <CategoryPieChart
            transactions={filteredTransactions}
            type="income"
            title="Income"
          />
        </div>
      </div>
      <TransactionList
        transactions={filteredTransactions}
        onTransactionUpdate={fetchTransactions}
        isReadOnly
      />
    </div>
  );
};