import mongoose from "mongoose";

const AnimalSchema = new mongoose.Schema({
    chicken: {type: Number, default: 0},
    cow: {type: Number, default: 0},
    pig: {type: Number, default: 0},
    sheep: {type: Number, default: 0},
    horse: {type: Number, default: 0},
    rabbit: {type: Number, default: 0},
    duck: {type: Number, default: 0},
}, {timestamps: false, versionKey: false });

AnimalSchema.set('toObject', { 
    virtuals: false, 
    transform: function (doc, ret) { delete ret._id } 
});
export default mongoose.model('Animal', AnimalSchema);