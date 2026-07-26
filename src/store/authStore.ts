import { create } from "zustand";

interface User {
  id: number;
  name: string;
  login: string;
  role: string;
}

interface AuthState {
  user: User | null;

  isLoading: boolean;

  setUser: (user: User) => void;
  logout: () => void;
  setLoading: (value: boolean) => void;
}


export const useAuthStore = create<AuthState>((set) => ({
  user: null,

  isLoading: true,


  setUser: (user) =>
    set({
      user,
    }),


  logout: () =>
    set({
      user: null,
    }),


  setLoading: (value) =>
    set({
      isLoading: value,
    }),
}));