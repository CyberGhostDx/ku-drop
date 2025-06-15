import { Select, SelectItem } from "@heroui/react";
import useBusLineState from "@/store/busLineStore";
import busLines from "@/libs/busLines";

interface Line {
  line: number;
  label: string;
}

const lines: Line[] = [
  { line: 1, label: "สาย 1" },
  { line: 3, label: "สาย 3" },
];

const BusLines = () => {
  const setBusLine = useBusLineState((state) => state.setBusLine);
  const handleSelectionChange = (
    keys:
      | "all"
      | (Set<React.Key> & { anchorKey?: string; currentKey?: string }),
  ) => {
    const lineId = new Set(keys).values().next().value;
    const line = busLines.find((l) => l.line == lineId) || null;
    setBusLine(line);
  };

  return (
    <div className="w-32">
      <Select
        aria-label="Select line"
        defaultSelectedKeys={["1"]}
        placeholder="สายรถตะลัย"
        classNames={{
          trigger: "bg-blue-500 data-[hover=true]:bg-blue-500",
          value: "font-bold text-md !text-white",
          selectorIcon: "!text-white !size-6",
        }}
        onSelectionChange={handleSelectionChange}
      >
        {lines.map((line) => (
          <SelectItem key={line.line}>{line.label}</SelectItem>
        ))}
      </Select>
    </div>
  );
};

export default BusLines;
