import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/db";
import { product } from "@/app/lib/moduls/product";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectToDatabase();

  const { id } = params;

  const { reviewer, rating, comment } = await req.json();

  if (!reviewer || !rating || !comment) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  try {
    const productItem = await product.findById(id);
    if (!productItem) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const newReview = { reviewer, rating, comment };
    productItem.reviews.push(newReview);

    await productItem.save();

    return NextResponse.json({ message: "Review added successfully", product });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error", details: error },
      { status: 500 }
    );
  }
}
