import { create } from "zustand";
import { BusLine } from "@/types";
import busLines from "@/libs/busLines";

type BusLineState = {
  busLine: BusLine | null;
  setBusLine: (busLine: BusLine | null) => void;
};

const useBusLineState = create<BusLineState>((set) => ({
  busLine: busLines[0],
  setBusLine: (busLine) => set({ busLine }),
}));

export default useBusLineState;
