"use client";
import Image from "next/image";
import Link from "next/link";
import { Product } from "../types/Product";


export default function ProductCard({ product }: { product: Product }) {
  return (
<Link href={`/products/${product._id}`}>
  <div className="border p-4 rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105">
    <div className="relative">
      <Image
        src={product.image}
        alt={product.name}
        className="w-full h-64 object-cover rounded-lg mb-4"
        width={300}
        height={300}
      />
    </div>
    <h2 className="text-xl font-semibold mt-2 text-center text-gray-800">{product.name}</h2>
    <p className="text-lg font-semibold text-center text-blue-600">₪{product.price}</p>
  </div>
</Link>

  );
}
