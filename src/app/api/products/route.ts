import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/db";
import { product } from "@/app/lib/moduls/product";

// GET - שליפת מוצרים עם פגינציה
export async function GET(req: NextRequest) {
  await connectToDatabase();

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 6);
  const limit = parseInt(searchParams.get("limit") || "6", 6);
  const skip = (page - 1) * limit;

  try {
    const products = await product.find().skip(skip).limit(limit);
    const totalProducts = await product.countDocuments();
    const totalPages = Math.ceil(totalProducts / limit);

    return NextResponse.json({ products, page, totalPages });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching products", error }, { status: 500 });
  }
}

// POST - יצירת מוצר חדש
export async function POST(req: NextRequest) {
  await connectToDatabase();
  // seedDatabase()
  try {
    const body = await req.json();
    const newProduct = new product(body);
    await newProduct.save();

    return NextResponse.json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    return NextResponse.json({ message: "Error creating product", error }, { status: 500 });
  }
}

// PUT - עדכון מוצר לפי ID
export async function PUT(req: NextRequest) {
  await connectToDatabase();

  try {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("id");

    if (!productId) {
      return NextResponse.json({ message: "Product ID is required" }, { status: 400 });
    }

    const body = await req.json();
    const updatedProduct = await product.findByIdAndUpdate(productId, body, { new: true });

    if (!updatedProduct) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    return NextResponse.json({ message: "Error updating product", error }, { status: 500 });
  }
}

// DELETE - מחיקת מוצר לפי ID
export async function DELETE(req: NextRequest) {
  await connectToDatabase();

  try {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("id");

    if (!productId) {
      return NextResponse.json({ message: "Product ID is required" }, { status: 400 });
    }

    const deletedProduct = await product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting product", error }, { status: 500 });
  }
}

