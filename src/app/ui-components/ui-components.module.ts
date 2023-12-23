import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageWrapperComponent } from './page-wrapper/page-wrapper.component';
import { AnimationComponent } from './animation/animation.component';
import { LottieModule } from 'ngx-lottie';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommentsAreaComponent } from './comments-area/comments-area.component';
import { FormsModule } from '@angular/forms';

// TODO This is a function necessary for lottie (is there a better place for this?)
export function playerFactory(): any {
  return import('lottie-web');
}

@NgModule({
  declarations: [
    PageWrapperComponent,
    AnimationComponent,
    LoadingSpinnerComponent,
    CommentsAreaComponent,
  ],
  imports: [
    CommonModule,
    LottieModule.forRoot({ player: playerFactory }),
    FontAwesomeModule,
    FormsModule,
  ],
  exports: [
    PageWrapperComponent,
    AnimationComponent,
    LoadingSpinnerComponent,
    FontAwesomeModule,
    CommentsAreaComponent,
  ],
})
export class UiComponentsModule {}
