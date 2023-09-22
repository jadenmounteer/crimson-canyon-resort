import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reviews-section',
  templateUrl: './reviews-section.component.html',
  styleUrls: ['./reviews-section.component.scss'],
})
export class ReviewsSectionComponent implements OnInit {
  protected loading: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
