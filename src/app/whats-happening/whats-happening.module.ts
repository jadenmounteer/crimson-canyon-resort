import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WhatsHappeningRoutingModule } from './whats-happening-routing.module';
import { WhatsHappeningComponent } from './whats-happening.component';


@NgModule({
  declarations: [
    WhatsHappeningComponent
  ],
  imports: [
    CommonModule,
    WhatsHappeningRoutingModule
  ]
})
export class WhatsHappeningModule { }
