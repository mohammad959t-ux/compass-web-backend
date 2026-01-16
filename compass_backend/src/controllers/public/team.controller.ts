import { type Request, type Response } from "express";

import { TeamMemberModel } from "../../models/index.js";

export async function getTeamMembers(_req: Request, res: Response) {
    const items = await TeamMemberModel.find().sort({ order: 1, createdAt: -1 });
    res.json(items);
}
