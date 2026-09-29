import type { NextFunction, Request, Response } from "express";
import { verifyToken } from "./jwt";
import { sendResponse } from "./sendResponse";

export const auth = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.headers.authorization;

      if (!token) {
        sendResponse(
            res,
            { message: "Invalid authorization format", error: true },
            401
        );
        return;
    }

  
    try {
        const user = verifyToken(token, "access");
        req.user = user;
        next();
    } catch (error) {
        sendResponse(
            res,
            { message: "Invalid or expired token", error: true },
            401
        );
    }
};