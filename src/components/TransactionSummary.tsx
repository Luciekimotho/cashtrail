import { useMemo } from "react";
import {
  makeStyles,
  shorthands,
  Text,
  Card,
  CardHeader,
  CardPreview,
  tokens,
} from "@fluentui/react-components";
import { type Transaction } from "../firebase/firestore";

const useStyles = makeStyles({
  root: {
    display: "flex",
    ...shorthands.gap("1rem"),
    justifyContent: "center",
  },
  card: {
    minWidth: "200px",
    textAlign: "center",
    ...shorthands.padding("1rem"),
  },
  income: {
    color: tokens.colorPaletteGreenForeground1,
  },
  expense: {
    color: tokens.colorPaletteRedForeground1,
  },
  balance: {
    fontWeight: "bold",
  },
});

interface TransactionSummaryProps {
  transactions: Transaction[];
}

export const TransactionSummary = ({
  transactions,
}: TransactionSummaryProps) => {
  const styles = useStyles();

  const summary = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((acc, t) => acc + t.amount, 0);
    const expenses = transactions
      .filter((t) => t.type === "expense")
      .reduce((acc, t) => acc + t.amount, 0);
    const balance = income - expenses;
    return { income, expenses, balance };
  }, [transactions]);

  return (
    <div className={styles.root}>
      <Card className={styles.card}>
        <CardHeader header={<Text weight="semibold">Total Income</Text>} />
        <CardPreview>
          <Text size={700} className={styles.income}>
            Ksh{summary.income.toFixed(2)}
          </Text>
        </CardPreview>
      </Card>
      <Card className={styles.card}>
        <CardHeader header={<Text weight="semibold">Total Expenses</Text>} />
        <CardPreview>
          <Text size={700} className={styles.expense}>
            Ksh{summary.expenses.toFixed(2)}
          </Text>
        </CardPreview>
      </Card>
      <Card className={styles.card}>
        <CardHeader header={<Text weight="semibold">Balance</Text>} />
        <CardPreview>
          <Text size={700} className={styles.balance}>
            Ksh{summary.balance.toFixed(2)}
          </Text>
        </CardPreview>
      </Card>
    </div>
  );
};