import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DonutSaturdayGameComponent } from './donut-saturday-game/donut-saturday-game.component';

const routes: Routes = [{ path: '', component: DonutSaturdayGameComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DonutSaturdayGameRoutingModule {}
