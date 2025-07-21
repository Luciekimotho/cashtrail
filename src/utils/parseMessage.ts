import { type Transaction } from "../firebase/firestore";
import { categoryKeywords } from "../data/categories";

interface Parser {
  name: string;
  regex: RegExp;
  extractor: (
    match: RegExpMatchArray
  ) => Omit<Transaction, "id" | "timestamp" | "message">;
}

const inferCategory = (payee: string): { category: string; description?: string } => {
  const lowerCasePayee = payee.toLowerCase();
  for (const category in categoryKeywords) {
    const keywords = (categoryKeywords as any)[category];
    for (const keyword of keywords) {
      if (lowerCasePayee.includes(keyword)) {
        return { category, description: payee };
      }
    }
  }
  return { category: "Uncategorized", description: payee };
};

const parsers: Parser[] = [
  {
    name: "M-PESA: Paid to Till",
    regex: /Ksh([\d,]+\.\d{2}) paid to (.+?)\. on/,
    extractor: (match) => {
      const payee = match[2].trim();
      const { category, description } = inferCategory(payee);
      return {
        amount: parseFloat(match[1].replace(/,/g, "")),
        type: "expense",
        category,
        description,
      };
    },
  },
  {
    name: "M-PESA: Bank to M-PESA Transfer",
    regex: /Bank to M-PESA transfer of KES ([\d,]+\.\d{2}) to \d+ - (.+?) successfully processed/,
    extractor: (match) => {
      const payee = match[2].trim();
      const { category, description } = inferCategory(payee);
      return {
        amount: parseFloat(match[1].replace(/,/g, "")),
        type: "expense",
        category,
        description,
      };
    },
  },
  {
    name: "M-PESA: Received from Person/Business",
    regex: /You have received Ksh([\d,]+\.\d{2}) from (.+?) on/,
    extractor: (match) => ({
      amount: parseFloat(match[1].replace(/,/g, "")),
      type: "income",
      category: "Income: Gifts",
      description: match[2].trim(),
    }),
  },
  {
    name: "M-PESA: Received from M-PESA",
    regex: /KES\.([\d,]+\.\d{2}) received on M-PESA from (.+?)\. LOOP Ref/,
    extractor: (match) => ({
      amount: parseFloat(match[1].replace(/,/g, "")),
      type: "income",
      category: "Income: Gifts",
      description: match[2].trim(),
    }),
  },
];

export const parseMessage = (
  message: string
): Omit<Transaction, "id" | "timestamp"> | null => {
  for (const parser of parsers) {
    const match = message.match(parser.regex);
    if (match) {
      const transactionData = parser.extractor(match);
      return {
        ...transactionData,
        message,
      };
    }
  }
  return null;
};