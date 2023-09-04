import { Injectable } from '@angular/core';
import { EventInput } from '@fullcalendar/core';
import { Reservation } from 'src/app/types/reservation';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor() {}

  private getArrivalDate(reservation: Reservation): Date {
    const arrivalDate = new Date(
      reservation.arrivalDate.year,
      reservation.arrivalDate.month - 1,
      reservation.arrivalDate.day
    );

    return arrivalDate;
  }

  private getDepartureDate(reservation: Reservation): Date {
    const departureDate = new Date(
      reservation.departureDate.year,
      reservation.departureDate.month - 1,
      reservation.departureDate.day
    );

    return departureDate;
  }

  public convertReservationToEvent(reservation: Reservation): EventInput {
    const event: EventInput = {
      id: reservation.id,
      title: reservation.familyName,
      start: this.getArrivalDate(reservation).toISOString().replace(/T.*$/, ''),
      end:
        this.getDepartureDate(reservation).toISOString().replace(/T.*$/, '') +
        'T03:00:00',
    };

    return event;
  }

  public createListOfEvents(reservations: Reservation[]): EventInput[] {
    const events: EventInput[] = [];

    for (const reservation of reservations) {
      const event = this.convertReservationToEvent(reservation);
      events.push(event);
    }

    return events;
  }
}
