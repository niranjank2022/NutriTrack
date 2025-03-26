import mongoose, { Model, Schema } from "mongoose";

interface IUser {
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Users: Model<IUser> = mongoose.model<IUser>("Users", userSchema);

export default Users;
