import { createContext, useContext } from "react";
import { useState, useEffect, ReactNode } from "react";
import {
  loginUser,
  checkAuthStatus,
  signupUser,
  logoutUser,
} from "../helpers/api-communicators";

type User = {
  username: string;
  firstname: string | null;
  lastname: string | null;
  email: string | null;
};

type UserAuth = {
  isLoggedIn: boolean;
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  signup: (
    username: string,
    password: string,
    firstname: string | null,
    lastname: string | null,
    email: string | null
  ) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    // fetch if the user's cookies are valid then skip login
    async function checkStatus() {
      const data = await checkAuthStatus();
      if (data) {
        setUser({
          username: data.username,
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
        });
        setIsLoggedIn(true);
      }
    }
    checkStatus();
  }, []);

  const login = async (username: string, password: string) => {
    const data = await loginUser(username, password);
    if (data) {
      setUser({
        username: data.username,
        firstname: data.firstname,
        lastname: data.lastnaem,
        email: data.email,
      });
      setIsLoggedIn(true);
    }
  };

  const signup = async (
    username: string,
    password: string,
    firstname: string | null,
    lastname: string | null,
    email: string | null
  ) => {
    const data = await signupUser(
      username,
      password,
      firstname,
      lastname,
      email
    );
    if (data) {
      setUser({
        username: data.username,
        firstname: data.firstname,
        lastname: data.lastnaem,
        email: data.email,
      });
      setIsLoggedIn(true);
    }
  };

  const logout = async () => {
    setIsLoggedIn(false);
    setUser(null);
    await logoutUser();
    // window.location.reload();
  };
  const value = {
    user,
    isLoggedIn,
    login,
    logout,
    signup,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
