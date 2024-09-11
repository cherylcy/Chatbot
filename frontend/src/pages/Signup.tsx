import React from "react";
import { useEffect } from "react";
import { Box, Button } from "@mui/material";
import CustomizedInput from "../components/shared/CustomizedInput";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import TextAnimation from "../components/shared/TextAnimation";

const Signup = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    if (username.trim() === "") {
      toast.error("Username is required", { id: "signup" });
      return;
    }
    if (password.trim() === "") {
      toast.error("Password is required", { id: "signup" });
      return;
    }
    let firstname = formData.get("firstname") as string | null;
    let lastname = formData.get("lastname") as string | null;
    let email = formData.get("email") as string | null;
    if (firstname?.trim() === "") firstname = null;
    if (lastname?.trim() === "") lastname = null;
    if (email?.trim() === "") email = null;
    try {
      toast.loading("Signing Up", { id: "signup" });
      await auth?.signup(username, password, firstname, lastname, email);
      toast.success("Signed Up Successfully", { id: "signup" });
    } catch (error: any) {
      if (error.status === 401)
        toast.error(error.response.data, { id: "signup" });
      else toast.error("Signing Up Failed", { id: "signup" });
    }
  };

  useEffect(() => {
    if (auth?.user) {
      return navigate("/chat");
    }
  }, [auth]);

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      flex={{ xs: 1, md: 0.5 }}
      justifyContent={"center"}
      alignItems={"center"}
      padding={2}
      ml={"auto"}
      mt={16}
    >
      <Box>
        <TextAnimation text={"Nice to meet you. I am Sunnie."} />
      </Box>
      <form
        onSubmit={handleSubmit}
        style={{
          margin: "auto",
          padding: "30px",
          borderRadius: "10px",
          border: "none",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <CustomizedInput type="username" name="username" label="Username*" />
          <CustomizedInput
            type="firstname"
            name="firstname"
            label="First Name"
          />
          <CustomizedInput type="lastname" name="lastname" label="Last Name" />
          <CustomizedInput type="email" name="email" label="Email" />
          <CustomizedInput type="password" name="password" label="Password*" />
          <Button
            type="submit"
            sx={{
              px: 2,
              py: 1,
              mt: 4,
              width: "300px",
              height: "40px",
              borderRadius: 2,
              bgcolor: "#f3bc64",
              color: "white",
              ":hover": {
                bgcolor: "#f5c17d",
              },
            }}
          >
            Signup
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Signup;
