import express, { type Application, type Request, type Response } from "express";
import userRoutes from "./modules/user/user.route";
import issueRoutes from "./modules/issue/issue.route";
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
app.use("/api",issueRoutes)
app.use(globalErrorHandler)

export default app;