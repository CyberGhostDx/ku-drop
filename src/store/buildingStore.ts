import { create } from "zustand";

type BuildingState = {
  building: string;
  setBuilding: (building: string) => void;
};

const useBuildingState = create<BuildingState>((set) => ({
  building: "",
  setBuilding: (building) => set({ building }),
}));

export default useBuildingState;
