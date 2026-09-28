import express, { type Application, type Request, type Response } from "express";
import userRoutes from "./modules/user/user.route";
import { logger } from "./middleware/logger";
import cookieParser from "cookie-parser"
import { globalErrorHandler } from "./middleware/globslErrorHandler";

const app: Application = express();

app.use(logger)
app.use(express.json())
app.use(cookieParser())

app.get("/", (req: Request, res: Response) => {

    res.send("Pagol Duniya");
})

app.use("/api/auth",userRoutes)
app.use(globalErrorHandler)

export default app;