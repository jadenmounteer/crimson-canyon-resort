import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, catchError, tap, throwError } from 'rxjs';
import { ConfirmModalComponent } from 'src/app/components/confirm-modal/confirm-modal.component';
import { AuthorizedEmailsService } from 'src/app/services/authorized-emails.service';
import { IconService } from 'src/app/services/icon.service';
import { AccessRequest } from 'src/app/types/access-request';
import { AddApprovedEmailModalComponent } from '../add-approved-email-modal/add-approved-email-modal.component';
import { AuthService } from 'src/app/components/auth/auth.service';
@Component({
  selector: 'app-authorized-emails',
  templateUrl: './authorized-emails.component.html',
  styleUrls: ['./authorized-emails.component.scss'],
})
export class AuthorizedEmailsComponent implements OnInit, OnDestroy {
  protected approvedRequests: AccessRequest[] = [];
  protected contentLoaded: boolean = false;
  private requestsSub!: Subscription;
  protected emailAddedMsg: string = '';

  constructor(
    private authorizedEmailsService: AuthorizedEmailsService,
    public icon: IconService,
    private modalService: NgbModal,
    protected authService: AuthService
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
    console.log('Loading requests');
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
    const modalRef = this.modalService.open(ConfirmModalComponent);

    modalRef.componentInstance.message = `Are you sure you want to delete this authorization? Users will not be able to login or create an account with ${request.email} until you authorize it again.`;

    modalRef.result.then((result) => {
      if (result === 'Yes') {
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
    });
  }

  protected onAddEmail(): void {
    const modalRef = this.modalService.open(AddApprovedEmailModalComponent);

    modalRef.result.then((result) => {
      if (result.email) {
        this.approvedRequests.push(result);
        this.emailAddedMsg = `Successfully added ${result.email} to the list of approved emails.`;
      }
    });
  }
}
