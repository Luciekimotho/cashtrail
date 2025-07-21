import { useState } from "react";
import {
  makeStyles,
  shorthands,
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Button,
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
} from "@fluentui/react-components";
import { Edit24Filled, Delete24Filled } from "@fluentui/react-icons";
import {
  type Transaction,
  deleteTransaction,
} from "../firebase/firestore";
import { EditableCategory } from "./EditableCategory";
import { EditTransactionModal } from "./EditTransactionModal";

const useStyles = makeStyles({
  root: {
    ...shorthands.border("1px", "solid", "#ccc"),
    ...shorthands.borderRadius("4px"),
  },
});

interface TransactionListProps {
  transactions: Transaction[];
  onTransactionUpdate: () => void;
  isReadOnly?: boolean;
}

export const TransactionList = ({
  transactions,
  onTransactionUpdate,
  isReadOnly = false,
}: TransactionListProps) => {
  const styles = useStyles();
  const [transactionToDelete, setTransactionToDelete] = useState<
    Transaction | undefined
  >(undefined);
  const [transactionToEdit, setTransactionToEdit] = useState<
    Transaction | undefined
  >(undefined);

  const handleDelete = async () => {
    if (transactionToDelete) {
      await deleteTransaction(transactionToDelete.id!);
      onTransactionUpdate();
      setTransactionToDelete(undefined);
    }
  };

  return (
    <div className={styles.root}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Type</TableHeaderCell>
            <TableHeaderCell>Category</TableHeaderCell>
            <TableHeaderCell>Description</TableHeaderCell>
            <TableHeaderCell>Amount</TableHeaderCell>
            <TableHeaderCell>Date</TableHeaderCell>
            {!isReadOnly && <TableHeaderCell>Actions</TableHeaderCell>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>
                {transaction.type.charAt(0).toUpperCase() +
                  transaction.type.slice(1)}
              </TableCell>
              <TableCell>
                {isReadOnly ? (
                  transaction.category
                ) : (
                  <EditableCategory
                    transactionId={transaction.id!}
                    initialCategory={transaction.category}
                    type={transaction.type}
                    onUpdate={onTransactionUpdate}
                  />
                )}
              </TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>Ksh{transaction.amount.toFixed(2)}</TableCell>
              <TableCell>
                {new Date(transaction.timestamp).toLocaleDateString()}
              </TableCell>
              {!isReadOnly && (
                <TableCell>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <Button
                      icon={<Edit24Filled />}
                      appearance="transparent"
                      onClick={() => setTransactionToEdit(transaction)}
                    />
                    <DialogTrigger>
                      <Button
                        icon={<Delete24Filled />}
                        appearance="transparent"
                        onClick={() => setTransactionToDelete(transaction)}
                      />
                    </DialogTrigger>
                  </div>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog
        open={!!transactionToDelete}
        onOpenChange={(_, data) => {
          if (!data.open) {
            setTransactionToDelete(undefined);
          }
        }}
      >
        <DialogSurface>
          <DialogTitle>Delete Transaction</DialogTitle>
          <DialogBody>
            Are you sure you want to delete this transaction? This action cannot
            be undone.
          </DialogBody>
          <DialogActions>
            <DialogTrigger>
              <Button appearance="secondary">Cancel</Button>
            </DialogTrigger>
            <Button appearance="primary" onClick={handleDelete}>
              Delete
            </Button>
          </DialogActions>
        </DialogSurface>
      </Dialog>
      {transactionToEdit && (
        <EditTransactionModal
          transaction={transactionToEdit}
          onTransactionUpdate={onTransactionUpdate}
          open={!!transactionToEdit}
          onOpenChange={(open) => {
            if (!open) {
              setTransactionToEdit(undefined);
            }
          }}
        />
      )}
    </div>
  );
};