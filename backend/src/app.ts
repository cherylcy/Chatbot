import express from "express";
import "dotenv/config";
import morgan from "morgan";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";

const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

//remove it in production
app.use(morgan("dev"));
// morgan(format, options)
// Create a new morgan logger middleware function using the given format and options
// morgan("dev")
// Concise output colored by response status for development use

app.use("/api/v1", appRouter);

export default app;
