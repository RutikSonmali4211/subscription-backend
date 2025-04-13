import { model, Schema } from "mongoose";


const saladSchema = new Schema({
    name: String,
    price: Number,
    description: String,
});

const SaladModel = model("Salad", saladSchema);

export default SaladModel;