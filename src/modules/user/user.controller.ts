import type { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse"
import userService from "./user.service"

export const signup = async (req: Request, res: Response) => {
    const user = await userService.craeteUser(req.body)
    if (!user) {
        sendResponse(res, { message: "Failed to create user" }, 400)
        return
    }
    sendResponse(res, { message: "User registered successfully", data: user }, 201)
}