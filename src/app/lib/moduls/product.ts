import mongoose, { Schema, model, models } from "mongoose";

const ReviewSchema = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true }, // מזהה ייחודי לכל ביקורת
  reviewer: { type: String, required: true }, // שם המגיב
  rating: { type: Number, required: true, min: 1, max: 5 }, // דירוג (1-5)
  comment: { type: String, required: true }, // תוכן הביקורת
  createdAt: { type: Date, default: Date.now }, // תאריך יצירת הביקורת
});

const ProductSchema = new Schema({
  name: { type: String, required: true, unique: true }, // שם המוצר (ייחודי)
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  reviews: { type: [ReviewSchema], default: [] }, // מערך של ביקורות
});

export const product = models.Product || model("Product", ProductSchema);
