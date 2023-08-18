import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WhatsHappeningPageComponent } from './whats-happening-page/whats-happening-page.component';

const routes: Routes = [{ path: '', component: WhatsHappeningPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WhatsHappeningPageRoutingModule {}
