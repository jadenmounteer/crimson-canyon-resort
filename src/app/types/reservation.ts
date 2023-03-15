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

export interface DayMonthYear {
  day: number;
  month: number;
  year: number;
}
