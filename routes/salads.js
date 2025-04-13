import { Router } from "express";
import SaladModel from "../models/salad.model.js";

const router = Router();

router.get("/", async (req, res) => {
    const salads = await SaladModel.find();
    res.send(salads);   
})

export default router;