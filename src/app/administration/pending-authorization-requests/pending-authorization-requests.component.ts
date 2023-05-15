import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { AuthorizedEmailsService } from 'src/app/services/authorized-emails.service';
import { IconService } from 'src/app/services/icon.service';
import { AccessRequest } from 'src/app/types/access-request';

@Component({
  selector: 'app-pending-authorization-requests',
  templateUrl: './pending-authorization-requests.component.html',
  styleUrls: ['./pending-authorization-requests.component.scss'],
})
export class PendingAuthorizationRequestsComponent implements OnInit {
  protected pendingRequests: AccessRequest[] = [];
  protected contentLoaded: boolean = false;
  protected displayApprovedMessage: boolean = false;
  protected displayDeclineMessage: boolean = false;
  constructor(
    private authorizedEmailsService: AuthorizedEmailsService,
    public icon: IconService
  ) {
    this.loadRequests();
  }

  private loadRequests() {
    this.contentLoaded = false;
    this.authorizedEmailsService
      .fetchPendingRequests()
      .subscribe((requests) => {
        this.pendingRequests = requests;
        this.contentLoaded = true;
      });
  }

  ngOnInit(): void {}

  protected acceptRequest(request: AccessRequest) {
    request.approved = true;
    this.authorizedEmailsService
      .updateRequest(request.id, request)
      .pipe(
        tap(() => {
          this.removeAllMessages();
          this.displayApprovedMessage = true;
          this.loadRequests();
        }),
        catchError((err) => {
          return throwError(err);
        })
      )
      .subscribe();
  }

  protected declineRequest(request: AccessRequest) {
    request.approved = false;
    this.authorizedEmailsService
      .deleteRequest(request.id)
      .pipe(
        tap(() => {
          this.removeAllMessages();
          this.displayDeclineMessage = true;
          this.loadRequests();
        }),
        catchError((err) => {
          return throwError(err);
        })
      )
      .subscribe();
  }

  protected removeAllMessages(): void {
    this.displayApprovedMessage = false;
    this.displayDeclineMessage = false;
  }
}
