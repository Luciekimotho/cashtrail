import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  Button,
  Input,
  Label,
  Textarea,
  Dropdown,
  Option,
} from "@fluentui/react-components";
import { type Transaction, updateTransaction } from "../firebase/firestore";
import { expenseCategories, incomeCategories } from "../data/categories";

interface EditTransactionModalProps {
  transaction: Transaction;
  onTransactionUpdate: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EditTransactionModal = ({
  transaction,
  onTransactionUpdate,
  open,
  onOpenChange,
}: EditTransactionModalProps) => {
  const [amount, setAmount] = useState(transaction.amount.toString());
  const [type, setType] = useState<"income" | "expense">(transaction.type);
  const [category, setCategory] = useState(transaction.category.split(": ")[0]);
  const [subcategory, setSubcategory] = useState(
    transaction.category.split(": ")[1]
  );
  const [description, setDescription] = useState(transaction.description || "");

  useEffect(() => {
    setAmount(transaction.amount.toString());
    setType(transaction.type);
    setCategory(transaction.category.split(": ")[0]);
    setSubcategory(transaction.category.split(": ")[1]);
    setDescription(transaction.description || "");
  }, [transaction]);

  const handleUpdate = async () => {
    const updatedTransaction = {
      ...transaction,
      amount: parseFloat(amount),
      type,
      category: `${category}: ${subcategory}`,
      description,
    };
    await updateTransaction(updatedTransaction);
    onTransactionUpdate();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={(_, data) => onOpenChange(data.open)}>
      <DialogSurface>
        <DialogTitle>Edit Transaction</DialogTitle>
        <DialogBody>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />

            <Label htmlFor="type">Type</Label>
            <Dropdown
              id="type"
              value={type.charAt(0).toUpperCase() + type.slice(1)}
              onOptionSelect={(_, data) =>
                setType(data.optionValue as "income" | "expense")
              }
            >
              <Option value="expense">Expense</Option>
              <Option value="income">Income</Option>
            </Dropdown>

            <Label htmlFor="category">Category</Label>
            <Dropdown
              id="category"
              value={category}
              onOptionSelect={(_, data) => {
                setCategory(data.optionValue as string);
                setSubcategory("");
              }}
            >
              {Object.keys(
                type === "expense" ? expenseCategories : incomeCategories
              ).map((cat) => (
                <Option key={cat} value={cat} text={cat}>
                  {cat}
                </Option>
              ))}
            </Dropdown>

            {category && (
              <>
                <Label htmlFor="subcategory">Subcategory</Label>
                <Dropdown
                  id="subcategory"
                  value={subcategory}
                  onOptionSelect={(_, data) =>
                    setSubcategory(data.optionValue as string)
                  }
                >
                  {(((type === "expense"
                    ? expenseCategories
                    : incomeCategories) as any)[category] || []
                  ).map((subcat: string) => (
                    <Option key={subcat} value={subcat} text={subcat}>
                      {subcat}
                    </Option>
                  ))}
                </Dropdown>
              </>
            )}

            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </DialogBody>
        <DialogActions>
          <DialogTrigger>
            <Button appearance="secondary">Cancel</Button>
          </DialogTrigger>
          <Button appearance="primary" onClick={handleUpdate}>
            Update
          </Button>
        </DialogActions>
      </DialogSurface>
    </Dialog>
  );
};