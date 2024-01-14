import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministrationPageComponent } from './administration-page/administration-page.component';
import { UiComponentsModule } from '../ui-components/ui-components.module';
import { PendingAuthorizationRequestsComponent } from './pending-authorization-requests/pending-authorization-requests.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthorizedEmailsComponent } from './authorized-emails/authorized-emails.component';
import { AddApprovedEmailModalComponent } from './add-approved-email-modal/add-approved-email-modal.component';
import { FormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AdminCalendarComponent } from './admin-calendar/admin-calendar.component';
import { CountdownToInstagramTokenRefreshComponent } from './countdown-to-instagram-token-refresh/countdown-to-instagram-token-refresh.component';

@NgModule({
  declarations: [
    AdministrationPageComponent,
    PendingAuthorizationRequestsComponent,
    AuthorizedEmailsComponent,
    AddApprovedEmailModalComponent,
    AdminCalendarComponent,
    CountdownToInstagramTokenRefreshComponent,
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
