import { create } from "zustand";

export type IMessage = {
  created_at: string;
  id: string;
  is_edit: boolean;
  send_by: string;
  text: string;
  users: {
    avatar_url: string | null;
    created_at: string;
    display_name: string | null;
    id: string;
  } | null;
};

interface MessagesState {
  messages: IMessage[];
  addMessage: (message: IMessage) => void;
}

export const useMessage = create<MessagesState>()((set) => ({
  messages: [],
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
}));
