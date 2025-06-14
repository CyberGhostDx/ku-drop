import { Autocomplete, AutocompleteItem } from "@heroui/react";
import { Search } from "lucide-react";
import buildings from "@/libs/buildings";
import useBuildingState from "@/store/buildingStore";

const RoomSearch = () => {
  const setBuilding = useBuildingState((state) => state.setBuilding);

  const onSelectionChange = (key: string | number | null) => {
    setBuilding(key?.toString() || "");
  };

  return (
    <div className="fixed bg-white shadow-lg left-10 top-7 rounded-2xl items-center justify-between z-50">
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
              "px-6 data-[hover=true]:bg-white data-[focus=true]:bg-white bg-white shadow-lg",
          },
        }}
      >
        {(item) => (
          <AutocompleteItem key={item.building}>
            {`${item.building} ${item.thai_building}`}
          </AutocompleteItem>
        )}
      </Autocomplete>
    </div>
  );
};

export default RoomSearch;
