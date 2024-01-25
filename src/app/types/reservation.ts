import { z } from 'zod';

export interface Reservation {
  id: string;
  userId: string | undefined;
  arrivalDate: DayMonthYear;
  departureDate: DayMonthYear;
  numberOfGuests: number;
  numberOfVehicles: number;
  familyName: string;
  privateVisit: boolean;
  plansForFood: string;
  additionalInfo: string | undefined;
}

const messageSchema = z.object({
  id: z.string(),
  reservationId: z.string(),
  userId: z.string(),
  userName: z.string(),
  message: z.string().min(1),
  createdDate: z.number(),
  // userEmail is string | null | undefined
  userEmail: z.string().nullable().optional(),
});

export type Message = z.infer<typeof messageSchema>;

export interface DayMonthYear {
  day: number;
  month: number;
  year: number;
}
