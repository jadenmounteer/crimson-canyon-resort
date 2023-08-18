import { Component, Input } from '@angular/core';
import { IconService } from 'src/app/services/icon.service';

@Component({
  selector: 'app-instagram-feed',
  templateUrl: './instagram-feed.component.html',
  styleUrls: ['./instagram-feed.component.scss'],
})
export class InstagramFeedComponent {
  @Input() public instaData: Array<any> | undefined;

  constructor(public icon: IconService) {}
}
