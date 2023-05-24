import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministrationPageComponent } from './administration-page/administration-page.component';
import { UiComponentsModule } from '../ui-components/ui-components.module';
import { ReservationsByUserComponent } from './reservations-by-user/reservations-by-user.component';
import { PendingAuthorizationRequestsComponent } from './pending-authorization-requests/pending-authorization-requests.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthorizedEmailsComponent } from './authorized-emails/authorized-emails.component';
import { AddApprovedEmailModalComponent } from './add-approved-email-modal/add-approved-email-modal.component';
import { FormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AdminCalendarComponent } from './admin-calendar/admin-calendar.component';

@NgModule({
  declarations: [
    AdministrationPageComponent,
    ReservationsByUserComponent,
    PendingAuthorizationRequestsComponent,
    AuthorizedEmailsComponent,
    AddApprovedEmailModalComponent,
    AdminCalendarComponent,
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    UiComponentsModule,
    NgbModule,
    FormsModule,
    FullCalendarModule,
  ],
})
export class AdministrationModule {}
