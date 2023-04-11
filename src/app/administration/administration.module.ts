import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministrationPageComponent } from './administration-page/administration-page.component';
import { UiComponentsModule } from '../ui-components/ui-components.module';

@NgModule({
  declarations: [AdministrationPageComponent],
  imports: [CommonModule, AdministrationRoutingModule, UiComponentsModule],
})
export class AdministrationModule {}
