// app/api/products/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/db";
import { product } from "@/app/lib/moduls/product";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await connectToDatabase();

  const {id} = await params;
  const productItem = await product.findById(id);

  if (!productItem) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(productItem);
}
