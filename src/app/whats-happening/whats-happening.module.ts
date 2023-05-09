import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WhatsHappeningRoutingModule } from './whats-happening-routing.module';
import { WhatsHappeningComponent } from './whats-happening.component';
import { UiComponentsModule } from '../ui-components/ui-components.module';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AddPostComponent } from './add-post/add-post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PostsComponent } from './posts/posts.component';

@NgModule({
  declarations: [WhatsHappeningComponent, AddPostComponent, PostsComponent],
  imports: [
    CommonModule,
    WhatsHappeningRoutingModule,
    UiComponentsModule,
    AngularFireStorageModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
  ],
})
export class WhatsHappeningModule {}
