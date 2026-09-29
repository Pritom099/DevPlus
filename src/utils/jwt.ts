import config from "../config";
import type { RUser } from "../types";
import jwt, { type JwtPayload } from "jsonwebtoken"

export type AuthUser = RUser & {
    id: number;
};


export const verifyToken = (token: string, type: "access" | "refresh") => {
    const secret = type === "access" ? config.jwt_secret : config.refresh_secret
    const decode = jwt.verify(token, secret)
    return decode as JwtPayload & AuthUser;
}

export const signToken = (payload: RUser & { id: number }) => {
    const accessToken = jwt.sign(payload, config.jwt_secret, {
        expiresIn: "1d"
    })

    const refreshToken = jwt.sign(payload, config.refresh_secret, {
        expiresIn: "7d"
    })

    return { accessToken, refreshToken };
}