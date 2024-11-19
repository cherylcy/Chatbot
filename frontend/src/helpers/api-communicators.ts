import axios from "axios";

export const checkAuthStatus = async () => {
  const res = await axios.get("/user/auth-status");
  if (res.status !== 200) {
    throw new Error("Unable to authenticate");
  }
  const data = await res.data;
  return data;
};

export const loginUser = async (username: string, password: string) => {
  const res = await axios.post("/user/login", {
    username,
    password,
  });
  if (res.status !== 200) {
    throw new Error("Unable to login");
  }
  const data = await res.data;
  return data;
};

type signupReqBody = {
  username: string;
  password: string;
  firstname?: string;
  lastname?: string;
  email?: string;
};

export const signupUser = async (
  username: string,
  password: string,
  firstname: string | null,
  lastname: string | null,
  email: string | null
) => {
  let body: signupReqBody = { username, password };
  if (firstname) body.firstname = firstname;
  if (lastname) body.lastname = lastname;
  if (email) body.email = email;
  const res = await axios.post("/user/signup", body);
  // axios receiving non 2xx won't reach here
  if (res.status !== 201) {
    console.log(res.data);
    throw new Error("Unable to sign up");
  }
  const data = await res.data;
  return data;
};

export const logoutUser = async () => {
  const res = await axios.get("/user/logout");
  if (res.status !== 200) {
    throw new Error("Unable to log out");
  }
  const data = await res.data;
  return data;
};

export const sendChatRequest = async (message: string) => {
  const res = await axios.post("/chat/new", { message });
  if (res.status !== 200) {
    throw new Error("Unable to send chat");
  }
  const data = await res.data;
  return data;
};

export const getUserChats = async () => {
  const res = await axios.get("/chat/all-chats");
  if (res.status !== 200) {
    throw new Error("Unable to load chats");
  }
  const data = await res.data;
  return data;
};

export const deleteUserChats = async () => {
  const res = await axios.delete("/chat/delete");
  if (res.status !== 200) {
    throw new Error("Unable to delete chats");
  }
  const data = await res.data;
  return data;
};

export const generateRagChain = async (filename: string) => {
  const res = await axios.post("/chat/create-rag", { filename });
  if (res.status !== 200) {
    throw new Error("Unable to generate rag chain");
  }
  const data = await res.data;
  return data;
};

export const sendRagChatRequest = async (message: string) => {
  const res = await axios.post("/chat/new-rag", { message });
  if (res.status !== 200) {
    throw new Error("Unable to send rag chat");
  }
  const data = await res.data;
  return data;
};

export const fileUpload = async (file: File) => {
  if (file) {
    const formData = new FormData();
    formData.append("file", file);
    const res = await axios.post("/chat/upload", formData);
    if (res.status !== 200) {
      throw new Error("Unable to upload file");
    }
    const data = await res.data;
    return data;
  }
};
