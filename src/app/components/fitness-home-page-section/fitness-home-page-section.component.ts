import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fitness-home-page-section',
  templateUrl: './fitness-home-page-section.component.html',
  styleUrls: ['./fitness-home-page-section.component.scss'],
})
export class FitnessHomePageSectionComponent implements OnInit {
  protected loading: boolean = false;

  constructor(protected router: Router) {}

  ngOnInit(): void {}
}
