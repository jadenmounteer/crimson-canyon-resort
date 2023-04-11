import { Component, OnInit } from '@angular/core';
import { AdministrationService } from '../../services/administration.service';

@Component({
  selector: 'app-administration-page',
  templateUrl: './administration-page.component.html',
  styleUrls: ['./administration-page.component.scss'],
})
export class AdministrationPageComponent implements OnInit {
  protected contentLoaded: boolean = false;

  constructor(private administrationService: AdministrationService) {}

  ngOnInit(): void {
    this.contentLoaded = true;
  }
}
