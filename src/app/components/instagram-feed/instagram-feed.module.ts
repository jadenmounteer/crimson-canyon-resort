import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstagramFeedComponent } from './instagram-feed.component';
import { UiComponentsModule } from 'src/app/ui-components/ui-components.module';

@NgModule({
  declarations: [InstagramFeedComponent],
  imports: [CommonModule, UiComponentsModule],
  exports: [InstagramFeedComponent],
})
export class InstagramFeedModule {}
