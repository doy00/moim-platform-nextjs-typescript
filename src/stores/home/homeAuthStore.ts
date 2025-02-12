import { create } from "zustand";

interface HomeAuthState {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

export const useHomeAuthStore = create<HomeAuthState>((set) => ({
  isLoggedIn: !!localStorage.getItem('access_token'), 
  setIsLoggedIn: (value) => set({ isLoggedIn: value }),
}));