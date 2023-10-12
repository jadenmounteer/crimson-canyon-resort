import { Component, Input, OnInit } from '@angular/core';
import { Review } from './review.type';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent implements OnInit {
  @Input() review!: Review;

  constructor() {}

  ngOnInit(): void {}
}
