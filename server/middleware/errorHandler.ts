import { logEvents } from "./logger.js";
import { Request, Response, NextFunction } from "express";

const errLog = {
  log: "errLog.txt",
};

interface ErrorWithDetails extends Error {
  method?: string;
  url?: string;
}

const errorHandler = (
  err: ErrorWithDetails,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const origin = req.headers.origin;

  logEvents(
    `${err.name}:${err.message}\t${err.method}\t${err.url}\t${origin}`,
    errLog.log,
  );
  console.log(`${err.stack}`);

  const status = res.statusCode ? res.statusCode : 500;

  res.status(status);

  res.json({ message: err.message, isError: true });
};

export default errorHandler;
