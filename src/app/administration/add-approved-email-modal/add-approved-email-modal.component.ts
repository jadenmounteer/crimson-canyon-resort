import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { AuthorizedEmailsService } from 'src/app/services/authorized-emails.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AccessRequest } from 'src/app/types/access-request';
import { catchError, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-add-approved-email-modal',
  templateUrl: './add-approved-email-modal.component.html',
  styleUrls: ['./add-approved-email-modal.component.scss'],
})
export class AddApprovedEmailModalComponent implements OnInit {
  protected displayBadEmailMsg: boolean = false;
  protected emailExistsMessage: string = '';
  protected contentLoaded: boolean = false;
  protected requests: AccessRequest[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    private authorizedEmailService: AuthorizedEmailsService,
    private angularFirestore: AngularFirestore
  ) {
    this.loadRequests();
  }

  ngOnInit(): void {}

  private loadRequests() {
    this.authorizedEmailService.fetchRequests().subscribe((requests) => {
      this.requests = requests;

      this.contentLoaded = true;
    });
  }

  protected onSubmit(form: NgForm): void {
    const validEmail: boolean = this.authorizedEmailService.checkIfValidEmail(
      form.value.email
    );
    if (!validEmail) {
      this.displayBadEmailMsg = true;
      return;
    }
    this.displayBadEmailMsg = false;

    // If so, is it approved?
    this.emailExistsMessage = this.authorizedEmailService.checkIfRequestExists(
      form.value.email,
      this.requests
    );

    if (this.emailExistsMessage === '') {
      const newRequestId = this.angularFirestore.createId();
      const newRequest: Partial<AccessRequest> = {
        email: form.value.email,
        name: 'Created by Admin',
        approved: true,
      };

      this.authorizedEmailService
        .createPendingRequest(newRequest, newRequestId)
        .pipe(
          tap((newRequest) => {
            this.activeModal.close();
          }),
          catchError((err) => {
            return throwError(err);
          })
        )
        .subscribe();
    }
  }
}
