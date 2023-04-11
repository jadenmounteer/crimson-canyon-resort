import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageWrapperComponent } from './page-wrapper/page-wrapper.component';
import { AnimationComponent } from './animation/animation.component';
import { LottieModule } from 'ngx-lottie';

// TODO This is a function necessary for lottie (is there a better place for this?)
export function playerFactory(): any {
  return import('lottie-web');
}

@NgModule({
  declarations: [PageWrapperComponent, AnimationComponent],
  imports: [CommonModule, LottieModule.forRoot({ player: playerFactory })],
  exports: [PageWrapperComponent, AnimationComponent],
})
export class UiComponentsModule {}
