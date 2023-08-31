import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DonutSaturdayGameRoutingModule } from './donut-saturday-game-routing.module';
import { DonutSaturdayGameComponent } from './donut-saturday-game/donut-saturday-game.component';
import { UiComponentsModule } from '../ui-components/ui-components.module';

@NgModule({
  declarations: [DonutSaturdayGameComponent],
  imports: [CommonModule, DonutSaturdayGameRoutingModule, UiComponentsModule],
})
export class DonutSaturdayGameModule {}
