// import package modules
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// import local modules
import { envConfig } from "./utils/env.js";
import {
  authRouter,
  healthCheckRouter,
  problemsRouter,
  submissionsRouter,
  sheetsRouter,
} from "./api/routers.api.js";

// create new express app
const app = express();

// middleware for usage of cookies
app.use(cookieParser());

// middleware for CORS configuration
app.use(
  cors({
    origin: envConfig.ORIGIN_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
    exposedHeaders: ["Set-Cookie", "*"],
  }),
);

// middleware for handling JSON data
app.use(express.json());

// middleware for handling URL-encoded data
app.use(express.urlencoded({ extended: true }));

// middleware for serving static files
app.use(express.static("public"));

// middlewares for handling API routes
app.use("/api/beta/healthcheck", healthCheckRouter);
app.use("/api/beta/auth", authRouter);
app.use("/api/beta/problems", problemsRouter);
app.use("/api/beta/submissions", submissionsRouter);
app.use("/api/beta/sheets", sheetsRouter);

// export app
export default app;
