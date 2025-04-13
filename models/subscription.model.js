import { Schema, Types, model } from "mongoose";


const subscriptionSchema = new Schema({
    saladId: Types.ObjectId,
    daysOfSubscription: [String],
    noOfChanges: {
        type: Number,
        default: 0
    },
    saladName: String,
    userId: Types.ObjectId
});

const SubscriptionModel = model("Subscription", subscriptionSchema);

export default SubscriptionModel;