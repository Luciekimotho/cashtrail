import { useState } from "react";
import {
  makeStyles,
  shorthands,
  Input,
  Button,
  Label,
  Dropdown,
  Option,
  Textarea,
} from "@fluentui/react-components";
import { addTransaction, type Transaction } from "../firebase/firestore";
import { expenseCategories, incomeCategories } from "../data/categories";

const useStyles = makeStyles({
  form: {
    display: "flex",
    flexDirection: "column",
    ...shorthands.gap("1rem"),
    maxWidth: "400px",
  },
});

interface ManualFormProps {
  onTransactionAdded: () => void;
}

export const ManualForm = ({ onTransactionAdded }: ManualFormProps) => {
  const styles = useStyles();
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"income" | "expense">("expense");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newTransaction: Omit<Transaction, "id"> = {
      amount: parseFloat(amount),
      type,
      category: `${category}: ${subcategory}`,
      description,
      timestamp: new Date(date),
    };
    const success = await addTransaction(newTransaction);
    if (success) {
      setAmount("");
      setCategory("");
      setSubcategory("");
      setDescription("");
      setDate(new Date().toISOString().split("T")[0]);
      onTransactionAdded();
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
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
        onOptionSelect={(_, data) => setType(data.optionValue as "income" | "expense")}
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
          <Option key={cat} value={cat}>
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
            {((
              (type === "expense" ? expenseCategories : incomeCategories) as any
            )[category] || []).map((subcat: string) => (
              <Option key={subcat} value={subcat}>
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

     <Label htmlFor="date">Date</Label>
     <Input
       id="date"
       type="date"
       value={date}
       onChange={(e) => setDate(e.target.value)}
       required
     />

     <Button appearance="primary" type="submit">
       Add Transaction
     </Button>
    </form>
  );
};