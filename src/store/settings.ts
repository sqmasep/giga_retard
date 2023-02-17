import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Settings {
  maskDeleted: boolean;
  toggleMaskDeleted: (force?: boolean) => void;
}

const useSettingsStore = create<Settings>()(
  persist(
    (set, get) => ({
      maskDeleted: false,
      toggleMaskDeleted: (force?: boolean) =>
        set(() => ({ maskDeleted: force || !get().maskDeleted })),
    }),
    {
      name: "retarded-settings",
    }
  )
);

export default useSettingsStore;
