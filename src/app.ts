import express, { type Application, type Request, type Response } from "express";
import userRoutes from "./modules/user/user.route";

const app: Application = express();

app.use(express.json())

app.use("/api/auth",userRoutes)

app.get("/", (req: Request, res: Response) => {

    res.send("Pagol Duniya");
})

export default app;