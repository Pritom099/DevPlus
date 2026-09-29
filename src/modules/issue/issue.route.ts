 import { Router } from "express";
import { auth } from "../../utils/auth";
import { createIssue, getAllIssues } from "./issue.controller";

 
 
 const router = Router()
 
 router.post("/issues",auth,createIssue)
 router.get("/issues",getAllIssues)

 
 export default router  