import { create } from "zustand";
import { UserInfo } from "@/types/user";

type UserStore = {
  userInfo: UserInfo | null;
  setUserInfo: (user: UserInfo | null) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  userInfo: null,
  setUserInfo: (user) => set({ userInfo: user }),
}));
