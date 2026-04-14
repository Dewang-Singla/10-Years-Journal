import { addDays } from "date-fns";
import { create } from "zustand";

import { storage } from "../storage";
import type { StreakFreeze } from "../db";
import { dateToId } from "../utils/dates";

interface FreezeStore {
  freezes: StreakFreeze[];
  remaining: number;
  isLoading: boolean;
  loadFreezes(): Promise<void>;
  useFreeze(forDateId: string): Promise<void>;
}

export const useFreezeStore = create<FreezeStore>((set, get) => ({
  freezes: [],
  remaining: 2,
  isLoading: false,

  async loadFreezes() {
    set({ isLoading: true });
    const freezes = await storage.getStreakFreezes();
    // Cycle starts 30 days ago
    const cycleStart = dateToId(addDays(new Date(), -30));
    const remaining = await storage.getRemainingFreezes(cycleStart);
    set({ freezes, remaining, isLoading: false });
  },

  async useFreeze(forDateId: string) {
    await storage.useStreakFreeze(forDateId);
    await get().loadFreezes();
  },
}));
