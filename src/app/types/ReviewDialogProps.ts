import { ReviewFormData } from "../types/ReviewFormData";

export type ReviewDialogProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  reviewer: string;
  setReviewer: (reviewer: string) => void;
  rating: number;
  setRating: (rating: number) => void;
  comment: string;
  setComment: (comment: string) => void;
  handleReviewSubmit: (data: ReviewFormData) => void;
  loading: boolean;
};
