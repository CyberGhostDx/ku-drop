import { Autocomplete, AutocompleteItem } from "@heroui/react";
import { Search } from "lucide-react";
import buildings from "@/libs/buildings";
import useBuildingState from "@/store/buildingStore";
import BusLines from "./BusLines";

const RoomSearch = () => {
  const setBuilding = useBuildingState((state) => state.setBuilding);

  const onSelectionChange = (key: string | number | null) => {
    setBuilding(key?.toString() || "");
  };

  return (
    <div className="fixed left-10 top-7 flex gap-4 items-center z-50 mr-10">
      <Autocomplete
        defaultItems={buildings}
        placeholder="สถานที่ ห้องเรียน"
        size="lg"
        startContent={<Search className="text-gray-500" />}
        aria-label="building"
        onSelectionChange={onSelectionChange}
        inputProps={{
          classNames: {
            input: "font-bold",
            inputWrapper:
              "px-6 data-[hover=true]:bg-white data-[focus=true]:bg-white bg-white shadow-xl",
          },
        }}
      >
        {(item) => (
          <AutocompleteItem key={item.building}>
            {`${item.building} ${item.thai_building}`}
          </AutocompleteItem>
        )}
      </Autocomplete>
      <BusLines />
    </div>
  );
};

export default RoomSearch;
