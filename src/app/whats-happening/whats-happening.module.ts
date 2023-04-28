import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WhatsHappeningRoutingModule } from './whats-happening-routing.module';
import { WhatsHappeningComponent } from './whats-happening.component';
import { UiComponentsModule } from '../ui-components/ui-components.module';

@NgModule({
  declarations: [WhatsHappeningComponent],
  imports: [CommonModule, WhatsHappeningRoutingModule, UiComponentsModule],
})
export class WhatsHappeningModule {}
