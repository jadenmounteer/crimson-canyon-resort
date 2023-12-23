import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnnouncementsRoutingModule } from './announcements-routing.module';
import { AnnouncementsComponent } from './announcements.component';
import { UiComponentsModule } from '../ui-components/ui-components.module';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PostsComponent } from './posts/posts.component';
import { AddOrEditPostModalComponent } from './add-new-post-modal/add-or-edit-post-modal.component';
import { CommentsAreaComponent } from './comments-area/comments-area.component';

@NgModule({
  declarations: [
    AnnouncementsComponent,
    PostsComponent,
    AddOrEditPostModalComponent,
    CommentsAreaComponent,
  ],
  imports: [
    CommonModule,
    AnnouncementsRoutingModule,
    UiComponentsModule,
    AngularFireStorageModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
  ],
})
export class AnnouncementsModule {}
