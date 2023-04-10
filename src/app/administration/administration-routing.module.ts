import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrationPageComponent } from './administration-page/administration-page.component';
import { AuthGuard } from '../components/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AdministrationPageComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministrationRoutingModule {}
