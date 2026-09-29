import type { NextFunction, Request, Response } from "express";
import { verifyToken } from "./jwt";
import { sendResponse } from "./sendResponse";

export const auth = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authorization = req.headers.authorization;

    if (!authorization) {
        sendResponse(
            res,
            { message: "Authorization token is required", error: true },
            401
        );
        return;
    }

    const token = authorization.split(" ")[1];

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