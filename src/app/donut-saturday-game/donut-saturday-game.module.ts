import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DonutSaturdayGameRoutingModule } from './donut-saturday-game-routing.module';
import { DonutSaturdayGameComponent } from './donut-saturday-game/donut-saturday-game.component';


@NgModule({
  declarations: [
    DonutSaturdayGameComponent
  ],
  imports: [
    CommonModule,
    DonutSaturdayGameRoutingModule
  ]
})
export class DonutSaturdayGameModule { }
