import type { Request, Response } from "express";
import issueService from "./issue.service";
import { sendResponse } from "../../utils/sendResponse";

export const createIssue = async (req: Request,res: Response) => {
    const { title, description, type } = req.body;
    const issue = await issueService.createIssue({
        title,
        description,
        type,
        reporter_id: req.user.id
    });
    sendResponse(
        res,{
            message: "Issue created successfully",
            data: issue
        },
        201
    );
};


export const getAllIssues = async (req: Request,res: Response) => {
    const { sort, type, status } = req.query;
    const issues = await issueService.getAllIssues({
        sort: sort as string,
        type: type as string,
        status: status as string
    });
    sendResponse(
        res,
        {
            message: "Issues retrived successfully",
            data: issues
        },
        200
    );
};