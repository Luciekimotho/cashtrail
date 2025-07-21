import { Dropdown, Option } from "@fluentui/react-components";

interface MonthSelectorProps {
  onMonthChange: (month: number, year: number) => void;
  currentDate: Date;
}

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

export const MonthSelector = ({
  onMonthChange,
  currentDate,
}: MonthSelectorProps) => {
  const handleMonthChange = (month: number) => {
    onMonthChange(month, currentDate.getFullYear());
  };

  const handleYearChange = (year: number) => {
    onMonthChange(currentDate.getMonth(), year);
  };

  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <Dropdown
        value={months[currentDate.getMonth()]}
        onOptionSelect={(_, data) =>
          handleMonthChange(parseInt(data.optionValue as string))
        }
      >
        {months.map((month, index) => (
          <Option key={month} value={index.toString()} text={month}>
            {month}
          </Option>
        ))}
      </Dropdown>
      <Dropdown
        value={currentDate.getFullYear().toString()}
        onOptionSelect={(_, data) =>
          handleYearChange(parseInt(data.optionValue as string))
        }
      >
        {years.map((year) => (
          <Option key={year} value={year.toString()} text={year.toString()}>
            {year}
          </Option>
        ))}
      </Dropdown>
    </div>
  );
};