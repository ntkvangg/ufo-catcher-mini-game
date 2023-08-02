import mongoose  from "mongoose";

const DiamondSchema = new mongoose.Schema({
    total: {type: Number, default: 0}
}, {timestamps: false, versionKey: false });

export default mongoose.model('Diamond', DiamondSchema);