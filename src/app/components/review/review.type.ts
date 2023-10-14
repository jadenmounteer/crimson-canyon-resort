import { DayMonthYear } from 'src/app/types/reservation';

export type Review = {
  id: string;
  userId: string | undefined;
  reviewDate: DayMonthYear;
  username: string;
  reviewText: string;
  rating: number;
};
