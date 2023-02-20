import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

// This component is inspired by this blog: https://dev.to/riapacheco/adding-animated-illustrations-to-an-angular-app-with-lottie-ngx-lottie-4j0o
// To install the necessary packages, I ran: npm install lottie-web ngx-lottie@9

type AnimationKeys =
  | 'kidAgainAnimation'
  | 'fitnessAnimation'
  | 'timeManagementAnimation'
  | 'financeAnimation';
type AnimationSizes = 'small' | 'medium-small' | 'medium' | 'large';

@Component({
  selector: 'app-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.scss'],
})
export class AnimationComponent implements OnInit {
  public animationTypes: Map<AnimationKeys, string> = new Map([
    [
      'kidAgainAnimation',
      'https://assets1.lottiefiles.com/private_files/lf30_x8jhuhr4.json',
    ],
    [
      'fitnessAnimation',
      'https://assets2.lottiefiles.com/packages/lf20_ju61m9x9.json',
    ],
    [
      'timeManagementAnimation',
      'https://assets1.lottiefiles.com/packages/lf20_i7ooqm2q.json',
    ],
    [
      'financeAnimation',
      'https://assets2.lottiefiles.com/packages/lf20_qxdztkhq.json',
    ],
  ]);

  @Input() animationKey!: AnimationKeys;
  @Input() animationSize: AnimationSizes = 'medium';

  @Output() animationCreated = new EventEmitter();
  private animationPath: string = '';
  public options!: AnimationOptions;

  constructor() {}

  public ngOnInit(): void {
    this.animationPath = this.getAnimationPath(this.animationKey);

    this.options = {
      path: this.animationPath,
    };
  }

  public getAnimationPath(animationKey: AnimationKeys): string {
    const animationPath = this.animationTypes.get(animationKey);
    if (animationPath != undefined) {
      return animationPath;
    }

    throw new Error(`The animation ${animationKey} does not exist 😭`);
  }

  // This is the component function that binds to the animationCreated event from the package
  onAnimate(animationItem: AnimationItem): void {
    this.animationCreated.emit(animationItem);
  }
}
