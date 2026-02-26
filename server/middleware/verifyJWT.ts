import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface AuthenticatedRequest extends Request {
  client?: string;
  roles?: string[];
}

interface DecodedToken extends JwtPayload {
  ClientInfo: {
    username: string;
    roles: string[];
  };
}

const verifyJWT = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader =
    req.headers.authorization ||
    (req.headers.Authorization as string | undefined);

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized." });
  }

  const token = authHeader.split(" ")[1];
  const secret = process.env.ACCESS_TOKEN_SECRET;
  if (!secret) {
    return res
      .status(500)
      .json({ message: "Server error: missing access token secret." });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Forbidden." });

    const decodedToken = decoded as DecodedToken;
    req.client = decodedToken.ClientInfo.username;
    req.roles = decodedToken.ClientInfo.roles;
    next();
  });
};

export default verifyJWT;
