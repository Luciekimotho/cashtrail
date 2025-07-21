import { useState } from "react";
import {
  Combobox,
  Option,
  Button,
} from "@fluentui/react-components";
import { Checkmark24Filled, Edit24Filled } from "@fluentui/react-icons";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { expenseCategories, incomeCategories } from "../data/categories";

interface EditableCategoryProps {
  transactionId: string;
  initialCategory: string;
  type: "income" | "expense";
  onUpdate: () => void;
}

export const EditableCategory = ({
  transactionId,
  initialCategory,
  type,
  onUpdate,
}: EditableCategoryProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [category, setCategory] = useState(initialCategory);

  const handleUpdate = async () => {
    const transactionRef = doc(db, "transactions", transactionId);
    await updateDoc(transactionRef, {
      category: category,
    });
    setIsEditing(false);
    onUpdate();
  };

  const categories =
    type === "expense" ? expenseCategories : incomeCategories;
  const flattenedCategories = Object.entries(categories).flatMap(
    ([cat, subcats]) => subcats.map((subcat) => `${cat}: ${subcat}`)
  );

  if (isEditing) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", position: "relative", zIndex: 1 }}>
        <Combobox
          value={category}
          onOptionSelect={(_, data) => {
            if (data.optionValue) {
              setCategory(data.optionValue);
            }
          }}
        >
          {flattenedCategories.map((cat) => (
            <Option key={cat} value={cat}>
              {cat}
            </Option>
          ))}
        </Combobox>
        <Button icon={<Checkmark24Filled />} onClick={handleUpdate} />
      </div>
    );
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      {category || "Uncategorized"}
      <Button
        icon={<Edit24Filled />}
        onClick={() => setIsEditing(true)}
        appearance="transparent"
      />
    </div>
  );
};