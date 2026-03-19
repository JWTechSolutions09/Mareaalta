import { create } from "zustand";
import { persist } from "zustand/middleware";

type Role = "admin" | "manager" | "viewer" | null;

type AuthState = {
    username: string | null;
    role: Role;
    login: (username: string, password: string) => boolean;
    loginAs: (role: Exclude<Role, null>) => void;
    logout: () => void;
};

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            username: null,
            role: null,
            login: (username, password) => {
                const valid = username === "admin" && password === "admin1234";
                if (valid) {
                    set({ username: "admin", role: "admin" });
                    return true;
                }
                return false;
            },
            loginAs: (role) => set({ role }),
            logout: () => set({ username: null, role: null }),
        }),
        { name: "ma-auth" }
    )
);
