import { Component, OnInit } from '@angular/core';
import { Review } from '../review/review.type';

@Component({
  selector: 'app-reviews-section',
  templateUrl: './reviews-section.component.html',
  styleUrls: ['./reviews-section.component.scss'],
})
export class ReviewsSectionComponent implements OnInit {
  protected loading: boolean = false;
  protected reviews: Review[] = [];

  constructor() {}

  ngOnInit(): void {}
}
