import { Injectable } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { take, timer } from 'rxjs';
import { PromptComponent } from '../components/prompt-component/prompt-component.component';

// This service was inspired from this article: https://medium.com/@oleksandr_k/a-way-to-show-a-prompt-to-install-your-angular-pwa-both-on-android-and-ios-devices-7a770f55c54
@Injectable({
  providedIn: 'root',
})
export class PwaService {
  private promptEvent: any;

  constructor(
    private bottomSheet: MatBottomSheet,
    private platform: Platform
  ) {}

  public initPwaPrompt() {
    if (this.platform.ANDROID) {
      window.addEventListener('beforeinstallprompt', (event: any) => {
        event.preventDefault();
        this.promptEvent = event;
        this.openPromptComponent('android');
      });
    }
    if (this.platform.IOS) {
      const isInStandaloneMode =
        'standalone' in window.navigator && window.navigator['standalone'];
      if (!isInStandaloneMode) {
        this.openPromptComponent('ios');
      }
    }
  }

  private openPromptComponent(mobileType: 'ios' | 'android') {
    timer(3000)
      .pipe(take(1))
      .subscribe(() =>
        this.bottomSheet.open(PromptComponent, {
          data: { mobileType, promptEvent: this.promptEvent },
        })
      );
  }
}
