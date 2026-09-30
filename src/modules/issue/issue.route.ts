 import { Router } from "express";
import { auth } from "../../utils/auth";
import { createIssue, getAllIssues, getIssueById } from "./issue.controller";

 
 
 const router = Router()
 
 router.post("/issues",auth,createIssue)
 router.get("/issues",getAllIssues)
 router.get("/issues/:id",getIssueById)

 
 export default router  