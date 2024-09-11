import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
// import { configureOpenAI } from "../config/openai-config.js";
// import { OpenAIApi, ChatCompletionRequestMessage } from "openai";
import {
  createCompletion,
  loadModel,
  CompletionInput,
  ChatMessage,
} from "gpt4all";

const model = await loadModel("orca-mini-3b-gguf2-q4_0.gguf", {
  verbose: true, // logs loaded model configuration
  //   device: "gpu", // defaults to 'cpu'
  nCtx: 2048, // the maximum sessions context window size.
  modelConfigFile: "./models3.json",
});

const chatSession = await model.createChatSession({
  temperature: 0.8,
  systemPrompt: "### System:\nYou are a trustworthy friend.\n\n",
});

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message } = req.body;
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user)
      return res
        .status(401)
        .json({ message: "User not registered or token malfunctioned" });
    // grab chats of user
    const chats = user.chats.map(({ role, content }) => ({
      role,
      content,
    })) as ChatMessage[];
    chats.push({ content: message, role: "user" });
    user.chats.push({ content: message, role: "user" });

    // // send all chats with new one to openAI API
    // const config = configureOpenAI();
    // const openai = new OpenAIApi(config);
    // get latest response
    // const chatResponse = await openai.createChatCompletion({
    //   model: "gpt-3.5-turbo",
    //   messages: chats,
    // });

    // const chatResponse = await createCompletion(chatSession, chats);

    // user.chats.push(chatResponse.choices[0].message);
    user.chats.push({ content: "This is a test message", role: "assistant" });
    await user.save();
    return res.status(200).json({ chats: user.chats });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const sendChatsToUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered or token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    return res.status(200).json({ message: "OK", chats: user.chats });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

export const deleteChats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered or token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    //@ts-ignore
    user.chats = [];
    await user.save();
    return res.status(200).json({ message: "OK" });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};
