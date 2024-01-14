import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-section',
  templateUrl: './admin-section.component.html',
  styleUrls: ['./admin-section.component.scss'],
})
export class AdminSectionComponent implements OnInit {
  protected contentLoaded: boolean = false;

  constructor(protected router: Router) {}

  ngOnInit(): void {
    this.contentLoaded = true;
  }
}
