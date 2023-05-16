import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, catchError, tap, throwError } from 'rxjs';
import { AuthorizedEmailsService } from 'src/app/services/authorized-emails.service';
import { IconService } from 'src/app/services/icon.service';
import { AccessRequest } from 'src/app/types/access-request';
@Component({
  selector: 'app-authorized-emails',
  templateUrl: './authorized-emails.component.html',
  styleUrls: ['./authorized-emails.component.scss'],
})
export class AuthorizedEmailsComponent implements OnInit, OnDestroy {
  protected approvedRequests: AccessRequest[] = [];
  protected contentLoaded: boolean = false;
  private requestsSub!: Subscription;

  constructor(
    private authorizedEmailsService: AuthorizedEmailsService,
    public icon: IconService
  ) {
    this.loadRequests();
    this.requestsSub = this.authorizedEmailsService.requestsChanged.subscribe(
      () => {
        this.loadRequests();
      }
    );
  }
  ngOnDestroy(): void {
    this.requestsSub.unsubscribe();
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

  protected onDeleteAuthorization(request: AccessRequest) {
    this.authorizedEmailsService
      .deleteRequest(request.id)
      .pipe(
        tap(() => {
          this.loadRequests();
          this.authorizedEmailsService.requestsChanged.next([request.id]);
        }),
        catchError((err) => {
          return throwError(err);
        })
      )
      .subscribe();
  }
}
