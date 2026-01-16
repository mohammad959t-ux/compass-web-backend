import type { InferSchemaType } from "mongoose";
import mongoose, { Schema } from "mongoose";

const teamMemberSchema = new Schema(
    {
        name: { type: String, required: true },
        role: { type: String, required: true },
        bio: { type: String },
        imageUrl: { type: String, required: true },
        order: { type: Number, default: 0 },
        socials: {
            linkedin: { type: String },
            twitter: { type: String },
            instagram: { type: String },
            website: { type: String }
        }
    },
    { timestamps: true }
);

export type TeamMember = InferSchemaType<typeof teamMemberSchema> & { _id: mongoose.Types.ObjectId };
export const TeamMemberModel = mongoose.model("TeamMember", teamMemberSchema);
