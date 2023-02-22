import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent {
  public images = [944, 1011, 984].map(
    (n) => `https://picsum.photos/id/${n}/900/500`
  );

  // public images = [
  //   'https://static2.mansionglobal.com/production/media/article-images/baffeee2f7cea755cf281332f5b71830/large_St.-George_1.jpg',
  //   'https://www.valisemag.com/wp-content/uploads/2021/07/St.-George-Hero.jpeg',
  //   'https://images.squarespace-cdn.com/content/v1/5bf2f2a95417fc2f2bcd9927/1553224848748-N0BW7BHG48RSJRK5Z4VC/st-george-pools-landscaping-s5.jpg?format=2500w',
  // ];
}
