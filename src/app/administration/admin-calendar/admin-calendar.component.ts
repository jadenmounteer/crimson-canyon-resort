import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-admin-calendar',
  templateUrl: './admin-calendar.component.html',
  styleUrls: ['./admin-calendar.component.scss'],
})
export class AdminCalendarComponent implements OnInit {
  /**
   * Here is the documentation for Angular Full Calendar: https://fullcalendar.io/docs/angular
   * Here is an example project: https://github.com/fullcalendar/fullcalendar-examples
   */
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    weekends: true,
    events: [{ title: 'Meeting', start: new Date() }],
    handleWindowResize: true,
    editable: true,
    selectable: true,
    /* you can update a remote database when these fire:
  eventAdd:
  eventChange:
  eventRemove:
  */
  };
  constructor() {}

  ngOnInit(): void {}
}
