import { create } from "zustand";
import type { LoginFormData } from "../components/Auth/Login";

interface AuthState {
  user: LoginFormData | null;
  setUser: (user: LoginFormData | null) => void;
  clearUser: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: JSON.parse(localStorage.getItem("user") || "null"),
  setUser: (user) => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
    set({ user });
  },
  clearUser: () => {
    localStorage.removeItem("user");
    set({ user: null });
  },
}));

export const isAuthenticated = () => useAuthStore.getState().user !== null;

export default useAuthStore;
