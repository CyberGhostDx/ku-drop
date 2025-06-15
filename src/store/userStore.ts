import { create } from "zustand";
import { User } from "@/types";

type BusLineState = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const useUserStore = create<BusLineState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

export default useUserStore;
