import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  CalendarOptions,
  DateSelectArg,
  EventApi,
  EventClickArg,
  EventInput,
} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import interactionPlugin from '@fullcalendar/interaction';
import { EventService } from './event.service';
import { ReservationsService } from 'src/app/services/reservations.service';
import { Reservation } from 'src/app/types/reservation';

@Component({
  selector: 'app-admin-calendar',
  templateUrl: './admin-calendar.component.html',
  styleUrls: ['./admin-calendar.component.scss'],
})
export class AdminCalendarComponent implements OnInit {
  calendarVisible = true;
  /**
   * Here is the documentation for Angular Full Calendar: https://fullcalendar.io/docs/angular
   * Here is an example project: https://github.com/fullcalendar/fullcalendar-examples
   */
  calendarOptions!: CalendarOptions;
  currentEvents: EventApi[] = [];
  protected reservations: Array<Reservation> = [];
  protected contentLoaded: boolean = false;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private eventService: EventService,
    protected reservationsService: ReservationsService
  ) {}

  ngOnInit(): void {
    this.reservationsService.allReservationsChanged.subscribe(
      (reservations) => {
        this.reservations = reservations;

        const events = this.eventService.createListOfEvents(reservations);

        this.initializeCalendarOptions(events);

        this.contentLoaded = true;
      }
    );

    this.reservationsService.fetchAllReservations();
  }

  private initializeCalendarOptions(events: EventInput[]) {
    this.calendarOptions = {
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      weekends: true,
      events: events,
      handleWindowResize: true,
      editable: true,
      selectable: true,
      select: this.handleDateSelect.bind(this),
      eventClick: this.handleEventClick.bind(this),
      eventsSet: this.handleEvents.bind(this),
      /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
    };
  }

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  }

  private viewEvent(clickInfo: EventClickArg) {
    const reservation = this.reservations.find(
      (reservation) => reservation.id === clickInfo.event._def.publicId
    );

    if (reservation) {
      this.reservationsService.viewReservationDetails(reservation);
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    this.viewEvent(clickInfo);
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }
}
