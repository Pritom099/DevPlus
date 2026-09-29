import type { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse"
import userService from "./user.service"
import { signToken } from "../../utils/jwt";

export const signup = async (req: Request, res: Response) => {
    const user = await userService.createUser(req.body)
    if (!user) {
        sendResponse(res, { message: "Failed to create user" }, 400)
        return
    }
    sendResponse(res, { message: "User registered successfully", data: user }, 201)
}


export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body
    const user = await userService.validateUser(email, password)
    if (!user) {
        sendResponse(res, { message: "Invalid email or password" }, 401)
        return
    }

    const { accessToken, refreshToken } = signToken(user)

    res.cookie("refreshToken", refreshToken, {
        sameSite: "lax",
        httpOnly: true,
        secure: false
    })

    const result = {
        accessToken,
        refreshToken,
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    }

    sendResponse(res, { message: "login successfull", data: result })

}