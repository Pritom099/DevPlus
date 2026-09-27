import express, { type Application, type Request, type Response } from "express";

const app: Application = express();

app.get("/", (req: Request, res: Response) => {

    res.send("Pagol Duniya");
})

export default app;