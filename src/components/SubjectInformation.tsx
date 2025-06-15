import { useMemo } from "react";
import useBuildingState from "@/store/buildingStore";
import { Timetable } from "@/types";
import { Button } from "@heroui/react";

type props = {} & Timetable;

const dateColors = {
  Monday: "#edc305",
  Tuesday: "#c4006c",
  Wednesday: "#00ad65",
  Thursday: "#dba400",
  Friday: "#0068de",
} as Record<string, string>;
import buildings from "@/libs/buildings";
import { useRouter } from "next/navigation";

const SubjectInformation: React.FC<props> = ({
  subject,
  thai_subject,
  start,
  end,
  building,
  date,
}) => {
  const setBuilding = useBuildingState((state) => state.setBuilding);
  const router = useRouter();

  const findBuilding = useMemo(
    () =>
      buildings.find(
        (b) => b.building.toLowerCase() == building.split(" ")[0].toLowerCase(),
      ),
    [building],
  );

  const handleSearchRoom = () => {
    setBuilding(findBuilding?.building || "");
    router.push("/");
  };

  return (
    <div className="px-10 py-5 shadow-lg rounded-lg max-w-[700px] flex flex-col gap-2">
      <h1
        className="font-bold text-blue-500 text-xl"
        style={{ color: dateColors[date] }}
      >
        {date}
      </h1>
      <div className="font-bold">
        <h1>{subject}</h1>
        <h1>{thai_subject}</h1>
      </div>
      <p>
        {start} - {end}
      </p>
      <p>{building}</p>
      <Button
        color={!findBuilding ? "danger" : "success"}
        className="font-bold text-white"
        onPress={handleSearchRoom}
        isDisabled={!findBuilding}
      >
        หาห้องเรียน
      </Button>
    </div>
  );
};

export default SubjectInformation;
