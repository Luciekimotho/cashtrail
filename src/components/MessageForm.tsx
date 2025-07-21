import { useState } from "react";
import {
  makeStyles,
  shorthands,
  Input,
  Button,
  Label,
} from "@fluentui/react-components";
import { addTransaction } from "../firebase/firestore";
import { parseMessage } from "../utils/parseMessage";

const useStyles = makeStyles({
  form: {
    display: "flex",
    flexDirection: "column",
    ...shorthands.gap("1rem"),
    maxWidth: "400px",
  },
});

interface MessageFormProps {
  onTransactionAdded: () => void;
}

export const MessageForm = ({ onTransactionAdded }: MessageFormProps) => {
  const styles = useStyles();
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newTransaction = parseMessage(message);
    if (newTransaction) {
      const success = await addTransaction(newTransaction);
      if (success) {
        setMessage("");
        onTransactionAdded();
      }
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Label htmlFor="message">Enter a transaction message (e.g., "Paid 200 for groceries")</Label>
      <Input
        id="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />
      <Button appearance="primary" type="submit">
        Add from Message
      </Button>
    </form>
  );
};