import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { AnimationKeys } from 'src/app/types/animation-keys';

// This component is inspired by this blog: https://dev.to/riapacheco/adding-animated-illustrations-to-an-angular-app-with-lottie-ngx-lottie-4j0o
// To install the necessary packages, I ran: npm install lottie-web ngx-lottie@9

type AnimationSizes = 'small' | 'medium-small' | 'medium' | 'large';

@Component({
  selector: 'app-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.scss'],
})
export class AnimationComponent implements OnInit {
  public animationTypes: Map<AnimationKeys, string> = new Map([
    [
      'palmTreeAnimation',
      'https://assets7.lottiefiles.com/packages/lf20_tjUMkSX4rg.json',
    ],
    [
      'cloudAnimation',
      'https://assets10.lottiefiles.com/packages/lf20_KUFdS6.json',
    ],
    [
      'clearSkyAnimation',
      'https://assets9.lottiefiles.com/private_files/lf30_rsattbhn.json',
    ],
    ['snowAnimation', 'https://assets5.lottiefiles.com/temp/lf20_BSVgyt.json'],
    ['mistAnimation', 'https://assets9.lottiefiles.com/temp/lf20_kOfPKE.json'],
    ['stormAnimation', 'https://assets4.lottiefiles.com/temp/lf20_JA7Fsb.json'],
    [
      'rainAnimation',
      'https://assets10.lottiefiles.com/packages/lf20_oAByvh2C1K.json',
    ],
    [
      'fewCloudsAnimation',
      'https://assets7.lottiefiles.com/packages/lf20_kljxfos1.json',
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
