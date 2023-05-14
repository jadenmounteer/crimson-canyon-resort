import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthorizedEmailsService } from 'src/app/services/authorized-emails.service';
import { AccessRequest } from 'src/app/types/access-request';

@Component({
  selector: 'app-pending-authorization-requests',
  templateUrl: './pending-authorization-requests.component.html',
  styleUrls: ['./pending-authorization-requests.component.scss'],
})
export class PendingAuthorizationRequestsComponent implements OnInit {
  protected pendingRequests$!: Observable<AccessRequest[]>;
  protected contentLoaded: boolean = false;
  constructor(private authorizedEmailsService: AuthorizedEmailsService) {
    this.pendingRequests$ = this.authorizedEmailsService.fetchPendingRequests();
    this.contentLoaded = true;
  }

  ngOnInit(): void {}
}
