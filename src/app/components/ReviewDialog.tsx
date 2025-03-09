import { Dialog } from "@headlessui/react";
import { ReviewDialogProps } from "../types/ReviewDialogProps";


const ReviewDialog = ({
  isOpen,
  setIsOpen,
  reviewer,
  setReviewer,
  rating,
  setRating,
  comment,
  setComment,
  handleReviewSubmit,
  loading,
}: ReviewDialogProps) => {
  return (
    
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="fixed inset-0 flex items-center justify-center p-4 bg-gray-800/70 bg-opacity-50"
    >
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md space-y-6">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">הוסף ביקורת</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleReviewSubmit({ reviewer, rating, comment });
          }}
          className="space-y-5"
        >
          <div>
            <input
              type="text"
              value={reviewer}
              onChange={(e) => setReviewer(e.target.value)}
              placeholder="שם מלא"
              required
              className="w-full p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
            />
          </div>
          <div>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num} כוכבים
                </option>
              ))}
            </select>
          </div>
          <div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="כתוב ביקורת..."
              required
              className="w-full p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
            />
          </div>
          <div className="flex justify-between gap-4">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-full sm:w-auto bg-gray-300 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-400 focus:outline-none transition duration-300"
            >
              ביטול
            </button>
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 focus:outline-none transition duration-300"
            >
              {loading ? "שולח..." : "שלח ביקורת"}
            </button>
          </div>
        </form>
      </div>
    </Dialog>
  );
};

export default ReviewDialog;