import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministrationPageComponent } from './administration-page/administration-page.component';
import { UiComponentsModule } from '../ui-components/ui-components.module';
import { ReservationsByUserComponent } from './reservations-by-user/reservations-by-user.component';

@NgModule({
  declarations: [AdministrationPageComponent, ReservationsByUserComponent],
  imports: [CommonModule, AdministrationRoutingModule, UiComponentsModule],
})
export class AdministrationModule {}
