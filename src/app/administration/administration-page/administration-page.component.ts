import { Component, OnInit } from '@angular/core';
import { AdministrationService } from '../../services/administration.service';

@Component({
  selector: 'app-administration-page',
  templateUrl: './administration-page.component.html',
  styleUrls: ['./administration-page.component.scss'],
})
export class AdministrationPageComponent implements OnInit {
  protected contentLoaded: boolean = false;
  // TODO Add this array to the db
  protected administratorIds: string[] = ['NzBQdjuDQ2ZnkQZgb3sYWiDp8f82'];

  constructor(private administrationService: AdministrationService) {}

  ngOnInit(): void {
    this.contentLoaded = true;
  }
}
