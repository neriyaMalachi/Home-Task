import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/db";
import { product } from "@/app/lib/moduls/product"; // Keep your original path

// Define the params type separately
type RouteParams = {
  params: {
    id: string;
  };
};

// Use explicit type annotation for the handler function
export async function POST(
  req: NextRequest,
  { params }: RouteParams
): Promise<NextResponse> {
  await connectToDatabase();

  const id = params.id;

  try {
    const { reviewer, rating, comment } = await req.json();

    if (!reviewer || !rating || !comment) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const productItem = await product.findById(id);
    if (!productItem) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const newReview = { reviewer, rating, comment };
    productItem.reviews.push(newReview);

    await productItem.save();

    return NextResponse.json({ message: "Review added successfully", product: productItem });
  } catch (error) {
    console.error("Error adding review:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}