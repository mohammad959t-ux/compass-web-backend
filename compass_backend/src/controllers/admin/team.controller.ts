import { type Request, type Response } from "express";

import { TeamMemberModel } from "../../models/index.js";

export async function listTeamMembers(req: Request, res: Response) {
    const items = await TeamMemberModel.find().sort({ order: 1, createdAt: -1 });
    res.json(items);
}

export async function createTeamMember(req: Request, res: Response) {
    const item = await TeamMemberModel.create(req.body);
    res.json(item);
}

export async function updateTeamMember(req: Request, res: Response) {
    const { id } = req.params;
    const item = await TeamMemberModel.findByIdAndUpdate(id, req.body, { new: true });
    res.json(item);
}

export async function deleteTeamMember(req: Request, res: Response) {
    const { id } = req.params;
    await TeamMemberModel.findByIdAndDelete(id);
    res.json({ success: true });
}

export async function reorderTeamMembers(req: Request, res: Response) {
    const { items } = req.body as { items: { id: string; order: number }[] };
    await Promise.all(
        items.map((item) => TeamMemberModel.findByIdAndUpdate(item.id, { order: item.order }))
    );
    res.json({ success: true });
}
