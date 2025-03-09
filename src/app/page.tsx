"use client";
// app/products/page.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "@/app/components/ProductCard";
import { Product } from "./types/Product";



export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // קריאת ה-API עם פגינציה
  const fetchProducts = (page: number) => {
    setLoading(true);
    axios
      .get(`/api/products?page=${page}&limit=10`)
      .then((res) => {
        setProducts(res.data.products);
        setPage(res.data.page);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">המוצרים שלנו</h1>

      {loading ? (
        <div className="h-[70vh]">טוען...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}

      <div className="flex justify-between mt-6">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 rounded-md"
        >
          קודם
        </button>
        <span>
          דף {page} מתוך {totalPages}
        </span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-300 rounded-md"
        >
          הבא
        </button>
      </div>
    </main>
  );
}
