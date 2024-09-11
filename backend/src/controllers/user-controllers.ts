import { Request, Response, NextFunction } from "express";
import User from "../models/User.js";
import { hash, compare } from "bcrypt";
import { createToken } from "../utils/token_manager.js";
import { COOKIE_NAME } from "../utils/constants.js";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // get all users
    const users = await User.find();
    return res.status(200).json({ message: "OK", users });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

export const userSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // user signup
    const { username, firstname, lastname, email, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(401).send("Username exists");
    const hashedPassword = await hash(password, 10);
    const user = new User({
      username,
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });
    await user.save();

    res.clearCookie(COOKIE_NAME, {
      path: "/",
      signed: true,
      httpOnly: true,
      domain: "localhost",
    });

    const token = createToken(user._id.toString(), username, "7d");
    const expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + 7);
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      signed: true,
      httpOnly: true,
      domain: "localhost",
      expires: expireDate,
    });

    return res.status(201).json({
      message: "OK",
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // user login
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(401).send("User not registered");
    const isPasswordCorret = await compare(password, user.password);
    if (!isPasswordCorret) return res.status(403).send("Incorrect Password");

    res.clearCookie(COOKIE_NAME, {
      path: "/",
      signed: true,
      httpOnly: true,
      domain: "localhost",
    });

    const token = createToken(user._id.toString(), username, "7d");
    const expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + 7);
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      signed: true,
      httpOnly: true,
      domain: "localhost",
      expires: expireDate,
    });

    return res.status(200).json({
      message: "OK",
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

export const verifyUser = async (
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
    return res.status(200).json({
      message: "OK",
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

export const userLogout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }

    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: "localhost",
      signed: true,
      path: "/",
    });

    return res.status(200).json({ message: "OK" });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};
