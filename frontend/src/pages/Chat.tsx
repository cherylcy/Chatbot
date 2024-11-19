import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useChatState } from "../context/ChatStateContext";
import { Box, IconButton } from "@mui/material";
import { IoMdSend } from "react-icons/io";
import {
  getUserChats,
  sendChatRequest,
  sendRagChatRequest,
} from "../helpers/api-communicators";
import ChatItem from "../components/chat/ChatItem";

type Message = {
  role: "user" | "assistant";
  content: string;
};

function updateScroll() {
  let element = document.getElementById("chats-display");
  if (element) element.scrollTop = element.scrollHeight;
}

const Chat = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const chatState = useChatState();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const handleSubmit = async () => {
    const content = inputRef.current?.value as string;
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
    const newMessage: Message = { role: "user", content };
    setChatMessages((prev) => [...prev, newMessage]);
    let chatData;
    if (!chatState?.isRag) {
      chatData = await sendChatRequest(content);
    } else {
      chatData = await sendRagChatRequest(content);
    }
    setChatMessages([...chatData.chats]);
  };

  useEffect(() => {
    if (!auth?.user) {
      return navigate("/login");
    }
  }, [auth]);

  useEffect(() => {
    updateScroll();
  }, [chatMessages]);

  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      getUserChats()
        .then((data) => {
          setChatMessages([...data.chats]);
          updateScroll();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [auth, chatState]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: 900,
          mx: "auto",
          px: { sm: 6, xs: 4 },
        }}
      >
        <Box
          id="chats-display"
          sx={{
            width: "100%",
            height: "80vh",
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            overflowX: "hidden",
            overflowY: "auto",
            scrollBehavior: "smooth",
          }}
        >
          {chatMessages.map((chat, index) => (
            <ChatItem
              content={chat.content}
              role={chat.role}
              keyIndex={index}
            />
          ))}
          <br />
          &nbsp;
          <br />
        </Box>
      </Box>
      <div
        style={{
          bottom: "0px",
          position: "fixed",
          width: "100%",
          // paddingTop: "10px",
          paddingBottom: "20px",
          backgroundColor: "#f3ebe3",
          boxShadow: "0px -12px 20px 10px rgba(243, 235, 227)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            borderRadius: 8,
            backgroundColor: "#faf9f7",
            display: "flex",
            maxWidth: 900,
            mx: { md: "auto", sm: 10, xs: 4 },
          }}
        >
          <input
            ref={inputRef}
            type="text"
            style={{
              width: "100%",
              backgroundColor: "transparent",
              marginLeft: "10px",
              padding: "12px",
              border: "none",
              outline: "none",
              fontSize: "17px",
            }}
          />
          <IconButton onClick={handleSubmit} sx={{ color: "black", mx: 1 }}>
            <IoMdSend />
          </IconButton>
        </Box>
      </div>
    </>
  );
};

export default Chat;
