import { Component, OnInit } from '@angular/core';
import { AdministrationService } from '../../services/administration.service';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-administration-page',
  templateUrl: './administration-page.component.html',
  styleUrls: ['./administration-page.component.scss'],
})
export class AdministrationPageComponent implements OnInit {
  protected contentLoaded: boolean = false;

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

  constructor(private administrationService: AdministrationService) {}

  ngOnInit(): void {
    this.contentLoaded = true;
  }
}
