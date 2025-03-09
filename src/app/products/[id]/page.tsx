"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Product } from "@/app/types/Product";
import ReviewDialog from "@/app/components/ReviewDialog";
import ReviewsModal from "@/app/components/ReviewsModal";

export default function ProductDetails() {
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams() as { id: string };
  const [isOpen, setIsOpen] = useState(false);
  const [reviewer, setReviewer] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [reviewsModalOpen, setReviewsModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
      axios
        .get(`/api/product/${id}`)
        .then((res) => setProduct(res.data))
        .catch((err) => {
          console.error("Error fetching product:", err);
          setError("לא ניתן לטעון את פרטי המוצר.");
        });
    }
  }, [id]);

  const handleReviewSubmit = async (data: {
    reviewer: string;
    rating: number;
    comment: string;
  }) => {
    setLoading(true);
    try {
      const response = await axios.post(`/api/product/${id}/reviews`, data);

      setProduct((prev) =>
        prev
          ? { ...prev, reviews: [...prev.reviews, response.data.review] }
          : null
      );

      setReviewer("");
      setRating(5);
      setComment("");
      setIsOpen(false);
    } catch (error) {
      console.error("Error adding review:", error);
    }
    setLoading(false);
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        ...טוען
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-extrabold mb-6 text-gray-900 text-center">
        {product.name}
      </h1>

      {/* תמונה */}
      <div className="relative w-full max-w-3xl mx-auto mb-6">
        <Image
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-contain object-center rounded-lg shadow-xl"
          width={800}
          height={800}
        />
      </div>

      <p className="text-lg mt-4 text-gray-700">{product.description}</p>
      <p className="text-2xl font-semibold mt-4 text-gray-800">
        ₪{product.price}
      </p>

      {/* כפתורים להוספת ביקורת ולהצגת ביקורות */}
      <div className="flex justify-center mt-6 space-x-6">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-all transform hover:scale-105"
        >
          הוסף ביקורת
        </button>
        {product.reviews.length > 0 && (
          <button
            onClick={() => setReviewsModalOpen(true)}
            className="bg-green-600 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-green-700 transition-all transform hover:scale-105"
          >
            הצג ביקורות
          </button>
        )}
      </div>

      {/* מודל להוספת ביקורת */}
      <ReviewDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        reviewer={reviewer}
        setReviewer={setReviewer}
        rating={rating}
        setRating={setRating}
        comment={comment}
        setComment={setComment}
        handleReviewSubmit={handleReviewSubmit}
        loading={loading}
      />
      <ReviewsModal
        isOpen={reviewsModalOpen}
        setIsOpen={setReviewsModalOpen}
        id={id}
      />
    </div>
  );
}
