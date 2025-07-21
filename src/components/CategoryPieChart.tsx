import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { type Transaction } from '../firebase/firestore';

interface CategoryPieChartProps {
  transactions: Transaction[];
  type: "income" | "expense";
  title: string;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF1919'];

export const CategoryPieChart = ({
  transactions,
  type,
  title,
}: CategoryPieChartProps) => {
  const categoryTotals = transactions
    .filter((t) => t.type === type)
    .reduce((acc, transaction) => {
      const mainCategory = transaction.category.split(": ")[0];
      if (mainCategory) {
        acc[mainCategory] = (acc[mainCategory] || 0) + transaction.amount;
      }
      return acc;
    }, {} as Record<string, number>);

  const data = Object.entries(categoryTotals).map(([name, value]) => ({
    name,
    value,
  }));

  if (data.length === 0) {
    return null; // Don't render the chart if there's no expense data
  }

  return (
    <div style={{ width: "100%", height: 300 }}>
      <h3 style={{ textAlign: "center" }}>{title}</h3>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
          >
            {data.map((_entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => `Ksh${value.toFixed(2)}`} />
          <Legend
            layout="vertical"
            verticalAlign="middle"
            align="right"
            wrapperStyle={{ paddingLeft: "10px" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};