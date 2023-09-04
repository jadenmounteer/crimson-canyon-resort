import { Injectable } from '@angular/core';
import { EventInput } from '@fullcalendar/core';
import { Reservation } from 'src/app/types/reservation';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor() {}

  public convertReservationToEvent(reservation: Reservation): EventInput {
    const event: EventInput = {
      id: reservation.id,
      title: reservation.familyName,
      start: new Date().toISOString().replace(/T.*$/, ''),
      end: new Date().toISOString().replace(/T.*$/, '') + 'T03:00:00',
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
