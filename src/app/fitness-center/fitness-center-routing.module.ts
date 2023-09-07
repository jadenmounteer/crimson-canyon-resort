import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FitnessCenterPageComponent } from './fitness-center-page/fitness-center-page.component';
import { AuthGuard } from '../components/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: FitnessCenterPageComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FitnessCenterRoutingModule {}
