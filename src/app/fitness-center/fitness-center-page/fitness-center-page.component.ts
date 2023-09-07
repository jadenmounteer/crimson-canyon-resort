import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fitness-center-page',
  templateUrl: './fitness-center-page.component.html',
  styleUrls: ['./fitness-center-page.component.scss'],
})
export class FitnessCenterPageComponent implements OnInit {
  protected loading: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
