import {
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
} from "@fluentui/react-components";
import { type Transaction } from "../firebase/firestore";

interface CategorySummaryProps {
  transactions: Transaction[];
}

export const CategorySummary = ({ transactions }: CategorySummaryProps) => {
  const categoryTotals = transactions.reduce((acc, transaction) => {
    const mainCategory = transaction.category.split(": ")[0];
    if (mainCategory) {
      acc[mainCategory] = (acc[mainCategory] || 0) + transaction.amount;
    }
    return acc;
  }, {} as Record<string, number>);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>Category</TableHeaderCell>
          <TableHeaderCell>Total</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Object.entries(categoryTotals).map(([category, total]) => (
          <TableRow key={category}>
            <TableCell>{category}</TableCell>
            <TableCell>Ksh{total.toFixed(2)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};