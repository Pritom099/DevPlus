import type { Request, Response } from "express";
import issueService from "./issue.service";
import { sendResponse } from "../../utils/sendResponse";

export const createIssue = async (req: Request, res: Response) => {
    const { title, description, type } = req.body;
    const issue = await issueService.createIssue({
        title,
        description,
        type,
        reporter_id: req.user.id
    });
    sendResponse(
        res, {
        message: "Issue created successfully",
        data: issue
    },
        201
    );
};


export const getAllIssues = async (req: Request, res: Response) => {
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

export const getIssueById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const issue = await issueService.getIssueById(id);
    if (!issue) {
        sendResponse(res,
            {
                message: "Issue not found",
                error: true
            },
            404
        );
        return;
    }
    sendResponse(res,
        {
            message: "Issue retrieved successfully",
            data: issue
        },
        200
    );
};

export const updateIssue = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { title, description, type } = req.body;
    const issue = await issueService.updateIssue(
        id,
        {
            title,
            description,
            type
        },
        req.user
    );

    if (!issue) {
        sendResponse(res, { message: "Issue not found", error: true }, 404);
        return;
    }
    sendResponse(res, { message: "Issue updated successfully", data: issue }, 200);
};

export const deleteIssue = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const issue = await issueService.deleteIssue(id, req.user)
    if (!issue) {
        sendResponse(res, { message: "Issue not found or you don't have permission", error: true }, 404);
        return;
    }
    sendResponse(res, { message: "Issue deleted successfullyy", data: issue }, 200);
}