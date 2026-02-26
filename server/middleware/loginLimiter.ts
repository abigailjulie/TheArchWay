import rateLimit from "express-rate-limit";
import { logEvents } from "./logger";
import { Request, Response, NextFunction } from "express";

const loginLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: {
    message: "Too many login attempts from this IP.",
  },
  handler: (req: Request, res: Response, _next: NextFunction, options: any) => {
    logEvents(
      `Too Many Requests: ${options.message}\t ${req.method}\t ${req.url}\t ${req.headers.origin}`,
      "errLog.log",
    );
    res.status(options.statusCode).send(options.message);
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export default loginLimiter;
