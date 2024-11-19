import { AppBar, Toolbar } from "@mui/material";
import Logo from "./shared/Logo";
import NavigationLink from "./shared/NavigationLink";
import FileUploader from "./shared/FileUploader";
import { useAuth } from "../context/AuthContext";
import { useChatState } from "../context/ChatStateContext";

const Header = () => {
  const auth = useAuth();
  const chatState = useChatState();

  return (
    <AppBar
      sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}
    >
      <Toolbar sx={{ display: "flex" }}>
        <Logo />
        <div>
          {auth?.isLoggedIn ? (
            <>
              <NavigationLink
                to="/chat"
                bg="#f4d6a2"
                text="Start a New Chat"
                textColor="black"
                onClick={chatState?.startNew}
              />
              <FileUploader
                bg="#edc285"
                text="Upload Context File"
                textColor="black"
              />
              <NavigationLink
                to="/"
                bg="#9cac8c"
                text="Logout"
                textColor="white"
                onClick={auth.logout}
              />
            </>
          ) : (
            <>
              <NavigationLink
                to="/login"
                bg="#f4d6a2"
                text="Login"
                textColor="black"
              />
              <NavigationLink
                to="/signup"
                bg="#9cac8c"
                text="Signup"
                textColor="white"
              />
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
