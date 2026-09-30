 import { Router } from "express";
import { auth } from "../../utils/auth";
import { createIssue, deleteIssue, getAllIssues, getIssueById, updateIssue } from "./issue.controller";

 
 
 const router = Router()
 
 router.post("/issues",auth,createIssue)
 router.get("/issues",getAllIssues)
 router.get("/issues/:id",getIssueById)
 router.patch("/issues/:id",auth,updateIssue)
 router.delete("/issues/:id",auth,deleteIssue)

 
 export default router  