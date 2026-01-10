import mongoose, { Schema } from "mongoose";

export type UserRole = "admin" | "editor" | "moderator";

export type User = {
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
};

const UserSchema = new Schema<User>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["admin", "editor", "moderator"], default: "editor" }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (_doc, ret: Record<string, unknown>) => {
        ret.id = String(ret._id);
        delete ret._id;
        delete ret.passwordHash;
      }
    }
  }
);

export const UserModel = mongoose.model<User>("User", UserSchema);
export type UserDocument = mongoose.HydratedDocument<User>;
