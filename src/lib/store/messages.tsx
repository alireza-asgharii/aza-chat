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
  actionMessage: IMessage | undefined;
  optimisticIds: string[];
  setOptimisticIds: (id: string) => void;
  addMessage: (message: IMessage) => void;
  optimisticDeleteMessage: (messageId: string) => void;
  optimisticEditMessage: (message: IMessage) => void;
  setActionMessage: (message: IMessage | undefined) => void;
}

export const useMessage = create<MessagesState>()((set) => ({
  messages: [],
  actionMessage: undefined,
  optimisticIds: [],
  setOptimisticIds: (id) =>
    set((state) => ({ optimisticIds: [...state.optimisticIds, id] })),
  addMessage: (newMessage) =>
    set((state) => ({
      messages: [...state.messages, newMessage],
    })),
  optimisticDeleteMessage: (messageId) =>
    set((state) => ({
      messages: state.messages.filter((item) => item.id !== messageId),
    })),
  optimisticEditMessage: (message) =>
    set((state) => {
      const messageList = state.messages;
      const messageIndex = messageList.findIndex(
        (item) => item.id === message.id!
      );
      messageList[messageIndex].text = message.text;
      messageList[messageIndex].is_edit = message.is_edit;

      return { messages: [...messageList] };
    }),
  setActionMessage: (message) => set(() => ({ actionMessage: message })),
}));
