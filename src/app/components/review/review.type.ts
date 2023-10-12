import { DayMonthYear } from 'src/app/types/reservation';

export type Review = {
  id: string;
  userId: string | undefined;
  reviewDate: DayMonthYear;
  username: string;
  reviewText: string;
  rating: Rating;
};

export type Rating = 1 | 2 | 3 | 4 | 5;
