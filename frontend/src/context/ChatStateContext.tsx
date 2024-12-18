import { createContext, useContext } from "react";
import { useState, ReactNode } from "react";
import { deleteUserChats } from "../helpers/api-communicators";

type ChatState = {
  newToggle: boolean;
  isRag: boolean;
  startNew: () => Promise<void>;
  startRag: () => void;
};

const ChatStateContext = createContext<ChatState | null>(null);

export const ChatStateProvider = ({ children }: { children: ReactNode }) => {
  const [newToggle, setNewToggle] = useState<boolean>(false);
  const [isRag, setIsRag] = useState<boolean>(false);

  const startNew = async () => {
    deleteUserChats()
      .then(() => {
        setNewToggle(!newToggle);
        setIsRag(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const startRag = () => {
    setIsRag(true);
  };

  const value = {
    newToggle,
    isRag,
    startNew,
    startRag,
  };
  return (
    <ChatStateContext.Provider value={value}>
      {children}
    </ChatStateContext.Provider>
  );
};

export const useChatState = () => useContext(ChatStateContext);
