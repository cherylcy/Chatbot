import { Router } from "express";
import multer from "multer";
import { validate, chatCompletionValidator } from "../utils/validators.js";
import { verifyToken } from "../utils/token_manager.js";
import {
  generateChatCompletion,
  sendChatsToUser,
  deleteChats,
  generateChatCompletionRAG,
  fileUpload,
} from "../controllers/chat-controllers.js";

const chatRoutes = Router();
const upload = multer({ dest: "../uploads/" });

chatRoutes.post(
  "/new",
  validate(chatCompletionValidator),
  verifyToken,
  generateChatCompletion
);

chatRoutes.post("/new-rag", verifyToken, generateChatCompletionRAG);
chatRoutes.get("/all-chats", verifyToken, sendChatsToUser);
chatRoutes.delete("/delete", verifyToken, deleteChats);
chatRoutes.post("/upload", verifyToken, upload.single("file"), fileUpload);

export default chatRoutes;
