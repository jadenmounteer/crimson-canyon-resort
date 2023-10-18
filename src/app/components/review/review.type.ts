export type Review = {
  id: string;
  userId: string | undefined;
  reviewDate: number;
  username: string;
  reviewText: string;
  rating: number;
};
