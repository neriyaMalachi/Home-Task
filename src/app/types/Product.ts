import { Review } from "./Review";

export type Product = {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  reviews: Review[];
};