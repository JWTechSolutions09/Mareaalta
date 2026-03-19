import { create } from "zustand";
import { persist } from "zustand/middleware";

type Role = "admin" | "manager" | "viewer" | null;

type AuthState = {
  role: Role;
  loginAs: (role: Exclude<Role, null>) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      role: null,
      loginAs: (role) => set({ role }),
      logout: () => set({ role: null }),
    }),
    { name: "ma-auth" }
  )
);
