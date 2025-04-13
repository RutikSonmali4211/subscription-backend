import { Router } from "express";
import UserModel from "../models/user.model.js";


const router = Router();

router.get("/", async (req, res) => {
    const users = await UserModel.find();
    res.send(users);
});

export default router;