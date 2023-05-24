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
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    weekends: false,
    events: [{ title: 'Meeting', start: new Date() }],
  };

  constructor(private administrationService: AdministrationService) {}

  ngOnInit(): void {
    this.contentLoaded = true;
  }
}
