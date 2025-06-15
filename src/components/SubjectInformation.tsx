import { Timetable } from "@/types";

type props = {} & Timetable;

const dateColors = {
  Monday: "#edc305",
  Tuesday: "#c4006c",
  Wednesday: "#00ad65",
  Thursday: "#dba400",
  Friday: "#0068de",
} as Record<string, string>;

const SubjectInformation: React.FC<props> = ({
  subject,
  thai_subject,
  start,
  end,
  building,
  date,
}) => {
  return (
    <div className="px-10 py-5 shadow-lg rounded-lg max-w-[700px]">
      <h1
        className="font-bold text-blue-500 text-xl"
        style={{ color: dateColors[date] }}
      >
        {date}
      </h1>
      <h1 className="font-bold">{subject}</h1>
      <h1 className="font-bold">{thai_subject}</h1>
      <p>
        {start} - {end}
      </p>
      <p>{building}</p>
    </div>
  );
};

export default SubjectInformation;
