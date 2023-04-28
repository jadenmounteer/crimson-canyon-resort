import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WhatsHappeningComponent } from './whats-happening.component';

const routes: Routes = [{ path: '', component: WhatsHappeningComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WhatsHappeningRoutingModule { }
