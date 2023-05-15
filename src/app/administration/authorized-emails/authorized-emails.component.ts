import { Component, OnInit } from '@angular/core';
import { AuthorizedEmailsService } from 'src/app/services/authorized-emails.service';
import { IconService } from 'src/app/services/icon.service';
import { AccessRequest } from 'src/app/types/access-request';
@Component({
  selector: 'app-authorized-emails',
  templateUrl: './authorized-emails.component.html',
  styleUrls: ['./authorized-emails.component.scss'],
})
export class AuthorizedEmailsComponent implements OnInit {
  protected approvedRequests: AccessRequest[] = [];
  protected contentLoaded: boolean = false;

  constructor(
    private authorizedEmailsService: AuthorizedEmailsService,
    public icon: IconService
  ) {
    this.loadRequests();
    this.authorizedEmailsService.requestsChanged.subscribe(() => {
      this.loadRequests();
    });
  }

  private loadRequests() {
    this.contentLoaded = false;
    this.authorizedEmailsService
      .fetchApprovedRequests()
      .subscribe((requests) => {
        this.approvedRequests = requests;

        this.contentLoaded = true;
      });
  }

  ngOnInit(): void {}
}
