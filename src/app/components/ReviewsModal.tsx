import { Dialog } from "@headlessui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Review } from "../types/Review";
import { ReviewsModalProps } from "../types/ReviewsModalProps";

const ReviewsModal = ({ isOpen, setIsOpen, id }: ReviewsModalProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    if (id) {
      axios
        .get(`/api/product/${id}`)
        .then((res) => {
          const sortedReviews = res.data.reviews.sort(
            (a: Review, b: Review) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          setReviews(sortedReviews);
        })
        .catch((err) => {
          console.error("Error fetching product:", err);
        });
    }
  }, [isOpen, id]);

  return (
    <Dialog
      onClick={() => setIsOpen(false)}
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="fixed inset-0 flex items-center justify-end p-4 bg-gray-800/70 bg-opacity-60"
    >
      <div className="bg-white p-10 rounded-xl shadow-2xl w-96 max-h-screen overflow-y-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
          ביקורות
        </h2>
        {reviews.length === 0 ? (
          <p className="text-gray-500 text-center">אין עדיין ביקורות.</p>
        ) : (
          <ul className="space-y-6">
            {reviews.map((review, index) => (
              <li
                key={review._id}
                className={`p-6 rounded-xl shadow-lg ${index === 0 ? "border-4 border-red-500 bg-red-50" : "border-t-2 border-gray-300 bg-gray-50"}`}
              >
                <div className="flex justify-between items-center mb-4">
                  <p className="font-semibold text-lg text-gray-800">{review.reviewer}</p>
                  <p className="text-yellow-400 text-lg">{"⭐ ".repeat(review.rating)}</p>
                </div>
                <p className="text-gray-700 mb-4 font-medium">{review.comment}</p>
                <p className="text-gray-500 text-sm text-right">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        )}
        <button
          onClick={() => setIsOpen(false)}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl w-full font-semibold"
        >
          סגור
        </button>
      </div>
    </Dialog>
  );
};

export default ReviewsModal;
