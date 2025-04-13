import { Schema, Types, model } from "mongoose";


const userSchema = new Schema({
    name: String,
});

const UserModel = model("User", userSchema);

export default UserModel;