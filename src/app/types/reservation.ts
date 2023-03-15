export interface Reservation {
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
