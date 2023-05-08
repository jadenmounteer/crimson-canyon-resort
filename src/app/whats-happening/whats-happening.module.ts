import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WhatsHappeningRoutingModule } from './whats-happening-routing.module';
import { WhatsHappeningComponent } from './whats-happening.component';
import { UiComponentsModule } from '../ui-components/ui-components.module';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AddPostComponent } from './add-post/add-post.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [WhatsHappeningComponent, AddPostComponent],
  imports: [
    CommonModule,
    WhatsHappeningRoutingModule,
    UiComponentsModule,
    AngularFireStorageModule,
    ReactiveFormsModule,
  ],
})
export class WhatsHappeningModule {}
