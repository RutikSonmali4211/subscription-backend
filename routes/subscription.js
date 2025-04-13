import { Router } from "express";
import SubscriptionModel from "../models/subscription.model.js";


const router = Router();

router.post("/", async (req, res) => {
    await SubscriptionModel.create(req.body);
    res.send("Subscription created");
});

router.put("/day", async (req, res) => {
    const record = await SubscriptionModel.findOne({ _id: req.body.subscriptionId });

    console.log(record.noOfChanges);

    if (record && record.noOfChanges >= 2) {
        res.status(400);
        res.send("Subscription can't be changed anymore");
        return;
    }

    await SubscriptionModel.findOneAndUpdate({ _id: req.body.subscriptionId }, { $set: { daysOfSubscription: req.body.daysOfSubscription }, $inc: { noOfChanges: 1 } });
    res.send("Subscription created");
});

router.get("/report", async (req, res) => {
    const subscriptions = await SubscriptionModel.aggregate([
        {
            $lookup: {
                from: 'users', // The collection name in MongoDB (usually the plural form of the model name)
                localField: 'userId', // Field in the Subscription collection
                foreignField: '_id', // Field in the User collection
                as: 'userDetails' // Alias for the joined data
            },

        },{
            $lookup: {
                from: 'salads', // The collection name in MongoDB (usually the plural form of the model name)
                localField: 'saladId', // Field in the Subscription collection
                foreignField: '_id', // Field in the User collection
                as: 'saladDetails' // Alias for the joined data
            }
        },
        {
            $unwind: '$userDetails' // Optional: to flatten the userDetails array
        },
        {
            $unwind: '$saladDetails' // Flatten the saladDetails array (since $lookup gives an array of results)
        }
    ]);

    res.send(subscriptions);
});

export default router;