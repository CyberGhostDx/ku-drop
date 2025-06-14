import { useMemo } from "react";
import { SquareArrowOutUpRight } from "lucide-react";
import { Button } from "@heroui/react";
import useBuildingState from "@/store/buildingStore";
import buildings from "@/libs/buildings";

const BuildingInformation = () => {
  const buildingId = useBuildingState((state) => state.building);

  const building = useMemo(
    () => buildings.find((item) => item.building == buildingId),
    [buildingId],
  );

  if (!building) return <></>;

  return (
    <div className="fixed left-10 shadow-lg bottom-7 bg-white z-50 rounded-lg px-5 py-6 flex flex-col gap-4">
      <h1 className="font-bold text-xl">
        {building.building} - {building.thai_building}
      </h1>
      <div className="text-lg">
        <h2 className="text-green-700 font-bold">สายรถตะลัย</h2>
        <p>สาย 1 - W1 กองกายภาพ (ประตูวิภาวดี-รังสิต) </p>
        <p>สาย 3 - N2 คณะประมง </p>
      </div>
      <a
        href={`https://www.google.com/maps/search/${building.lat},${building.lng}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button
          endContent={<SquareArrowOutUpRight size="20" />}
          color="primary"
          className="max-w-max"
        >
          Google Maps
        </Button>
      </a>
    </div>
  );
};

export default BuildingInformation;
