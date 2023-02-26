import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(titleService: Title) {
    titleService.setTitle('Crimson Canyon Resort | Home');
  }

  ngOnInit(): void {}
}
