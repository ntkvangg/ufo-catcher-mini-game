import mongoose  from "mongoose";

const DiamondSchema = new mongoose.Schema({
    total: {type: Number, require: true}
}, {timestamps: false, versionKey: false });

export default mongoose.model('Diamond', DiamondSchema);