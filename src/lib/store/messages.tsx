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
  actiosMessage: IMessage | undefined;
  addMessage: (message: IMessage) => void;
  optimisticDeleteMessage: (messageId: string) => void;
  setActionMessage: (message: IMessage | undefined) => void;
}

export const useMessage = create<MessagesState>()((set) => ({
  messages: [],
  actiosMessage: undefined,
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  optimisticDeleteMessage: (messageId) =>
    set((state) => ({ messages: state.messages.filter(item => item.id !== messageId) })),
  setActionMessage: (message) => set(() => ({ actiosMessage: message })),
}));
