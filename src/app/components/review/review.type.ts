export type Review = {
  id: string;
  userId: string | undefined;
  reviewDate: Date;
  username: string;
  reviewText: string;
  rating: number;
};
