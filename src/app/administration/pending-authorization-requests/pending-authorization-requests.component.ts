import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthorizedEmailsService } from 'src/app/services/authorized-emails.service';
import { IconService } from 'src/app/services/icon.service';
import { AccessRequest } from 'src/app/types/access-request';

@Component({
  selector: 'app-pending-authorization-requests',
  templateUrl: './pending-authorization-requests.component.html',
  styleUrls: ['./pending-authorization-requests.component.scss'],
})
export class PendingAuthorizationRequestsComponent implements OnInit {
  protected pendingRequests$: Observable<AccessRequest[]>;
  protected contentLoaded: boolean = false;
  constructor(
    private authorizedEmailsService: AuthorizedEmailsService,
    public icon: IconService
  ) {
    this.pendingRequests$ = this.authorizedEmailsService.fetchPendingRequests();

    this.contentLoaded = true;
  }

  ngOnInit(): void {}

  protected acceptRequest(request: AccessRequest) {
    request.approved = true;
    this.authorizedEmailsService.updateRequest(request.id, request);
  }

  protected declineRequest(request: AccessRequest) {
    request.approved = false;
    this.authorizedEmailsService.deleteRequest(request.id);
  }
}
