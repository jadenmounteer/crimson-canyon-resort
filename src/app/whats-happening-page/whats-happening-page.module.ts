import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WhatsHappeningPageComponent } from './whats-happening-page/whats-happening-page.component';
import { WhatsHappeningPageRoutingModule } from './whats-happening-page-routing.module';
import { InstagramFeedModule } from '../components/instagram-feed/instagram-feed.module';
import { UiComponentsModule } from '../ui-components/ui-components.module';

@NgModule({
  declarations: [WhatsHappeningPageComponent],
  imports: [
    CommonModule,
    WhatsHappeningPageRoutingModule,
    InstagramFeedModule,
    UiComponentsModule,
  ],
})
export class WhatsHappeningPageModule {}
