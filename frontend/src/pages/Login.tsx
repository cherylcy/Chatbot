import React from "react";
import { Box, Button } from "@mui/material";
import CustomizedInput from "../components/shared/CustomizedInput";

const Login = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    console.log(email, password);
  };
  return (
    <Box
      display={"flex"}
      flex={{ xs: 1, md: 0.5 }}
      justifyContent={"center"}
      alignItems={"center"}
      padding={2}
      ml={"auto"}
      mt={16}
    >
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
          <CustomizedInput type="email" name="email" label="Email" />
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
