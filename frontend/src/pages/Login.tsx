import React from "react";
import { useEffect } from "react";
import { Box, Button } from "@mui/material";
import CustomizedInput from "../components/shared/CustomizedInput";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import TextAnimation from "../components/shared/TextAnimation";
import { getGreeting } from "../helpers/utils";

const Login = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    try {
      toast.loading("Signing In", { id: "login" });
      await auth?.login(username, password);
      toast.success("Signed In Successfully", { id: "login" });
    } catch (error) {
      console.log(error);
      toast.error("Signing In Failed", { id: "login" });
    }
  };

  useEffect(() => {
    if (auth?.user) {
      return navigate("/chat");
    }
  }, [auth]);

  const greeting: string = getGreeting();

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
        <TextAnimation text={getGreeting() + " My dear friend."} />
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
          <CustomizedInput type="username" name="username" label="Username" />
          <CustomizedInput type="password" name="password" label="Password" />
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
            Login
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Login;
