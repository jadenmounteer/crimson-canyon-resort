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

export interface Message {
  id: string;
  reservationId: string;
  userId: string;
  userName: string;
  message: string;
  createdDate: number;
  userEmail: string;
}
export interface DayMonthYear {
  day: number;
  month: number;
  year: number;
}
