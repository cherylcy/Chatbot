import { Router } from "express";
import { validate, chatCompletionValidator } from "../utils/validators.js";
import { verifyToken } from "../utils/token_manager.js";
import {
  generateChatCompletion,
  sendChatsToUser,
  deleteChats,
  generateRagChain,
  generateChatCompletionRAG,
} from "../controllers/chat-controllers.js";

const chatRoutes = Router();

chatRoutes.post(
  "/new",
  validate(chatCompletionValidator),
  verifyToken,
  generateChatCompletion
);
chatRoutes.post("/create-rag", verifyToken, generateRagChain);
chatRoutes.post("/new-rag", verifyToken, generateChatCompletionRAG);
chatRoutes.get("/all-chats", verifyToken, sendChatsToUser);
chatRoutes.delete("/delete", verifyToken, deleteChats);

export default chatRoutes;
