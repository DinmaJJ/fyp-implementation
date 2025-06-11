import { create } from "zustand";
import type { LoginFormData } from "../components/Auth/Login";

interface AuthState {
  user: LoginFormData | null;
  isAuthenticated: boolean;
  setUser: (user: LoginFormData | null) => void;
  setAuthenticated: (status: boolean) => void;
  clearUser: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: JSON.parse(localStorage.getItem("user") || "null"),
  isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
  setUser: (user) => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
    set({ user });
  },
  setAuthenticated: (status) => {
    localStorage.setItem("isAuthenticated", status.toString());
    set({ isAuthenticated: status });
  },
  clearUser: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
    set({ user: null, isAuthenticated: false });
  },
}));

export const isAuthenticated = () => useAuthStore.getState().isAuthenticated;

export default useAuthStore;
