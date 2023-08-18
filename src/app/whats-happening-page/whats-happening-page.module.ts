import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WhatsHappeningPageComponent } from './whats-happening-page/whats-happening-page.component';
import { WhatsHappeningPageRoutingModule } from './whats-happening-page-routing.module';

@NgModule({
  declarations: [WhatsHappeningPageComponent],
  imports: [CommonModule, WhatsHappeningPageRoutingModule],
})
export class WhatsHappeningPageModule {}
