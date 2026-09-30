import { sql } from "../../db";

class IssueService {

    async createIssue(issue: {
        title: string;
        description: string;
        type: "bug" | "feature_request";
        reporter_id: number;
    }) {

        const { title, description, type, reporter_id } = issue;

        const res = await sql`
            INSERT INTO issues (
                title,
                description,
                type,
                reporter_id
            )
            VALUES (
                ${title},
                ${description},
                ${type},
                ${reporter_id}
            )
            RETURNING *
        `;

        return res[0];
    }

    async getAllIssues(filters: { sort?: string; type?: string; status?: string; }) {
        const {
            sort = "newest",
            type,
            status
        } = filters;

        let issues;

        if (type && status) {
            issues = await sql`
            SELECT *
            FROM issues
            WHERE type = ${type}
            AND status = ${status}
            ORDER BY created_at DESC
        `;
        }
        else if (type) {
            issues = await sql`
            SELECT *
            FROM issues
            WHERE type = ${type}
            ORDER BY created_at DESC
        `;
        }
        else if (status) {
            issues = await sql`
            SELECT *
            FROM issues
            WHERE status = ${status}
            ORDER BY created_at DESC
        `;
        }
        else {
            issues = await sql`
            SELECT *
            FROM issues
            ORDER BY created_at DESC
        `;
        }

        const issuesWithReporter = await Promise.all(
            issues.map(async (issue) => {

                const reporter = await sql`
                SELECT id, name, role
                FROM users
                WHERE id = ${issue.reporter_id}
            `;

                return {
                    id: issue.id,
                    title: issue.title,
                    description: issue.description,
                    type: issue.type,
                    status: issue.status,
                    reporter: reporter[0],
                    created_at: issue.created_at,
                    updated_at: issue.updated_at
                };
            })
        );

        return issuesWithReporter;
    }

    async getIssueById(id: number) {
        const issue = await sql`SELECT * FROM issues WHERE id = ${id}`;
        const singleIssue = issue[0];
        if (!singleIssue) {
            return null;
        }
        const reporter = await sql`
        SELECT id, name, role
        FROM users
        WHERE id = ${singleIssue.reporter_id}
    `;
        return {
            id: singleIssue.id,
            title: singleIssue.title,
            description: singleIssue.description,
            type: singleIssue.type,
            status: singleIssue.status,
            reporter: reporter[0],
            created_at: singleIssue.created_at,
            updated_at: singleIssue.updated_at
        };
    }


}




export default new IssueService();