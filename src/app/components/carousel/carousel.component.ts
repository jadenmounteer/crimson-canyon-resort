import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent {
  // public images = [944, 1011, 984].map(
  //   (n) => `https://picsum.photos/id/${n}/900/500`
  // );

  public images = [
    './assets/images/Front.png',
    './assets/images/Rear.png',
    './assets/images/Living Rm looking to back yard.png',
    './assets/images/Right Rear.png',
  ];
}
